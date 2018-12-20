import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Question extends Component {
    state = {
        numberOfQuestion: 0,
        questions: []
    }

    emptyOutRadios = radios => {
        // unchecks all radio buttons
        radios.forEach(el => el.checked = false);
    }

    createWarning = () => {
        const warning = document.createElement('p'); // CHANGE WITH REACT.CREATEELEMENT() !!!!!!!!
        warning.className = 'warning'

        const warningText = document.createTextNode('Please select an answer!')
        warning.appendChild(warningText)

        return warning;
    }

    showWarning = () => {
        (!document.querySelector('.warning')) && this.refs.question.prepend(this.createWarning()); // if there is a warning do nothing. If not, create and display warning
    }

    getRadioVal = () => {
        let answer;
        // get list of radio buttons with specified name
        let radios = this.refs.answers.elements['answer']; //RadioNodeList
        radios.forEach(el => {
            (el.checked) && (answer = el.value) // sets the answer variable equal to the value of the checked by the user radio
        });
        
        (!answer) ? this.showWarning() : this.checkAnswer(answer); // the answer submitted by the user (string)
        
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
            questions.length > 0 ?
            <div className="question-container" ref='question'>
                <p>{this.props.score}</p> 
                <h1 className="question">{questions[numberOfQuestion].question}</h1>
                <form className="answers" ref="answers" onClick={this.props.hideWarning}>
                    {questions[numberOfQuestion].answersArray.map((answer, i) => {
                    return (
                    <label>
                        <input className="ans" type="radio" key={i} name="answer" defaultValue={answer}/>
                    {answer}
                    </label>
                    )                
                })}
                </form>
                {questions.length === numberOfQuestion + 1 ? <Link className="answer-btn2" onClick={this.getRadioVal} to="/results">Submit Answer and See Results</Link> : <button className="answer-btn" onClick={this.getRadioVal}>Submit Answer</button>}
            </div> : <h1>Please Enter a Question!</h1>            
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