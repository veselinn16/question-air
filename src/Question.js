import React, { Component } from 'react';

class Question extends Component {
    render() {
        const {question} = this.props // unpack question from props object
        return(                
            question.answersArray ?
            <div className="question-container"> 
                <h1 className="question">{question.question}</h1>
                <div className="answers">
                    {question.answersArray.map((answer, i) => {
                    return (
                    <label>
                        <input className="ans" type="radio" key={i} name="answer"/>
                    {answer}
                    </label>
                    )                
                })}
                </div>
                <button className="answer-btn">Submit Answer</button> 
            </div> : <h1>Please Enter a Question!</h1>            
        )
        // return (
        //  <div className="question-container">
        //      <h1 className="question">{question.question}</h1>
        //        <div className="answers">
        //            {question.answersArray.map((answer, i) => {
        //                return (
        //                <label>
        //                    <input className="ans" type="radio" key={i} name="answer"/>
        //                {answer}</label>
        //                )
        //            })}
        //        </div>
        //        <button className="answer-btn">Submit Answer</button>
        //
        //    </div>
        // ) */}
    }
}

export default Question;