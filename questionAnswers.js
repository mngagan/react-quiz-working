import React from 'react'
import quizQuestionsAnswers from './quizQuestionsAnswers.json'
import _ from 'underscore'
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';

export class QuestionAnswers extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            totalQuestions: quizQuestionsAnswers.length,
            questionsConfig: this.getConfig(),
            currentQuestionId: 1,
            answers: {},
        }
    }
    getConfig = () => {
        let result = [], count = 1
        result = quizQuestionsAnswers.map((val, index) => {
            val.id = count
            count++
            return val
        })
        return result
    }
    handleCheckBox = (val) => {
        let answers = this.state.answers
        answers[this.state.currentQuestionId] = val.value
        this.setState({ answers })
    }
    renderQuestion = () => {
        let quesObj = _.filter(this.state.questionsConfig, val => { return val.id === this.state.currentQuestionId })[0]
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='radiobutton-control'>
                        <h4>{quesObj.question}</h4>
                        {quesObj.options.map((option, index) => {
                            return (
                                <div className='row' key={index + option}>
                                    <RadioButtonComponent 
                                        label={option}
                                        ref = {ref => this['ref_' + index] = ref}
                                        checked={this.state.answers[quesObj.id] == index + 1 ? false : false}
                                        name={'question' + quesObj.id}
                                        value={index + 1}
                                        change={val => { this.handleCheckBox(val) }}
                                    >

                                    </RadioButtonComponent>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
    nextQuesClicked = () => {
        let currentQuestionId = this.state.currentQuestionId + 1
        this.setState({
            currentQuestionId
        })
    }
    handleFinishClicked = () => {
        let answers = this.state.answers
        let correctAnsCount = 0
        let questionsConfig = this.state.questionsConfig

        Object.keys(answers).map((key, index) => {
            if (answers[key] === _.filter(questionsConfig, ques => { return ques.id == key })[0].answer) {
                correctAnsCount = correctAnsCount + 1
            }
        })
    }

    render() {
        window.state = this.state
        return (
            <div>
                <button onClick={() => this.nextQuesClicked()} disabled={this.state.currentQuestionId === this.state.totalQuestions}>next</button>
                <button onClick={() => this.handleFinishClicked()} >finish</button>
                {this.renderQuestion()}
            </div>
        )
    }
}