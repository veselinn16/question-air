import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import Social from './Social';
import Answer from './Answer';

class Question extends Component {
    state = {
        numberOfQuestion: 0,
        questions: []
    }

    emptyOutRadios = radios => {
        // unchecks all radio buttons
        radios.forEach(el => el.checked = false);
    }

    getRadioVal = () => {
        let answer;
        // get list of radio buttons with specified name
        let radios = this.refs.answers.elements.namedItem('radio-group'); //RadioNodeList

        radios.forEach(el => {
            (el.checked) && (answer = el.nextSibling.nextSibling.innerText) // sets the answer variable equal to the value of the checked by the user radio
        });
        
        (!answer) ? this.props.showWarning('Please select an answer!', '.question-container') : this.checkAnswer(answer); // show warning or check answer submitted by the user (string)
        
        this.emptyOutRadios(radios); // removes checked radio buttons
    }

    changeQuestion = () => {
        this.setState( prevState => ({
            numberOfQuestion: prevState.numberOfQuestion + 1
        }));
    }

    checkAnswer = answer => {
        // checks value of radios against correct answer and updates score and submits answer
        (answer === this.props.questions[this.state.numberOfQuestion].answer) && this.props.increaseScore();

        this.props.submitAnswer(this.state.numberOfQuestion, answer) // submits answer into state object's questions array
        
        this.changeQuestion();
    } 

    render() {
        const {questions} = this.props // props object destructuring
        const {numberOfQuestion} = this.state; // state object destructuring
        return(                
            questions.length > 0 ? questions[numberOfQuestion] ?
            <div className="questions-route">
                <Icon dims='640' type='logo' classes="logo logo-3"/> 
                <div className="question-container" ref='question'>
                    {/* <p>{this.props.score}</p>  */}
                    <h1 className="question-text">{questions[numberOfQuestion].question}</h1>
                </div>
                <div className="answers-container">
                    <form className="answers" ref="answers" onClick={this.props.hideWarning}>
                        {questions[numberOfQuestion].answersArray.map((answer, i) => {
                        return (
                            <Answer i={i} answer={answer} key={i}/>
                        )                
                    })}
                    </form>
                    <button className="btn btn-answer" onClick={this.getRadioVal}>Submit Answer</button>
                    <Social inst="3" class="footer-2"/>
                </div>
            </div>            
             : <Link to="/results" className="answer-btn2">See Results</Link> : <h1>Please Enter a Question!</h1>            
        )
        // return (
        //  <div className="question-container">
        //      <h1 className="question">Question</h1>
        //        <form className="answers" onChange={this.handleAnswer}>
        //            {['Answer1', 'Answer2', 'Answer3', 'Answer4'].map((answer, i) => {
        //                return (
        //                <label>
        //                    <input className="ans" type="radio" key={i} name="answer"/>
        //                {answer}</label>
        //                )
        //            })}
        //        </form>
        //        <button className="answer-btn" onClick={this.getRadioVal}>Submit Answer</button>        
        //    </div>
        // )
    }
}

export default Question;