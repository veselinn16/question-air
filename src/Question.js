import React, { Component } from 'react';

class Question extends Component {
    render() {
        const {question} = this.props // unpack question from props object
        return(
            <div className="container">
                {/* <div className="question">
                    <h1 className="question">{question.question}</h1>
                    {question.answersArray ? question.answersArray.map((answer, i) => {
                        return (
                        <label>
                            <input className="ans" type="checkbox" key={i} value={answer}/>
                        {answer}</label>
                        )
                    }) : <h1>Please Enter a Question!</h1>}
                </div> */}
                <div className="question-container">
                    <h1 className="question">Which year was Bulgaria established?</h1>
                    <div className="answers">
                        {[682, 681, 732, 1362].map((answer, i) => {
                            return (
                            <label>
                                <input className="ans" type="radio" key={i} name="answer"/>
                            {answer}</label>
                            )
                        })}
                    </div>
                    <button className="answer-btn">Submit Answer</button>
                </div>
            </div>
        )
    }
}

export default Question;