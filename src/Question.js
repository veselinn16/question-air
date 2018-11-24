import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Question extends Component {
    componentDidMount() {
        console.log(this.props.questions);
    }

    getRadioVal = () => {
        // REFAAAAAAAAAAAAAAAACCCCCCTOOOOOOOORRR!
        let answer;
        // get list of radio buttons with specified name
        let radios = document.querySelector('.answers').elements['answer'];
        
        // loop through list of radio buttons
        for (let i=0, len=radios.length; i<len; i++) {
            if ( radios[i].checked ) { // radio checked?
                answer = radios[i].value; // if so, hold its value in answer
                break; // and break out of for loop
            }
        }

        this.checkAnswer(answer); // the aswer submitted by the user (string)
    }

    checkAnswer = answer => {
        // checks value of radios against correct answer and updates score
        answer === this.props.questions[0].answer && this.props.increaseScore()
    } 

    render() {
        const {questions} = this.props // unpack question from props object
        return(                
            questions.length > 0 ?
            <div className="question-container"> 
                <h1 className="question">{questions[0].question}</h1>
                <form className="answers">
                    {questions[0].answersArray.map((answer, i) => {
                    return (
                    <label>
                        <input className="ans" type="radio" key={i} name="answer" defaultValue={answer}/>
                    {answer}
                    </label>
                    )                
                })}
                </form>
                <button className="answer-btn" onClick={this.getRadioVal}>Submit Answer</button> 
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