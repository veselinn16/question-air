import React, { Component } from 'react';

class Question extends Component {
    state = {
        answer: ''
    }

    getRadioVal = () => {
        // REFAAAAAAAAAAAAAAAACCCCCCTOOOOOOOORRR!
        let val;
        // get list of radio buttons with specified name
        let radios = document.querySelector('.answers').elements['answer'];
        
        // loop through list of radio buttons
        for (let i=0, len=radios.length; i<len; i++) {
            if ( radios[i].checked ) { // radio checked?
                val = radios[i].value; // if so, hold its value in val
                break; // and break out of for loop
            }
        }
        console.log(val === this.props.question.answer ? true : false); // checks value of radios against correct answer
    }

    render() {
        const {question} = this.props // unpack question from props object
        return(                
            question.answersArray ?
            <div className="question-container"> 
                <h1 className="question">{question.question}</h1>
                <form className="answers">
                    {question.answersArray.map((answer, i) => {
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