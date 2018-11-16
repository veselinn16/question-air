import React, { Component } from 'react';

class Question extends Component {
    render() {
        const {question} = this.props // unpack question from props object
        return(
            <div className="contain">
                <div className="question">
                    <h1 className="question">{question.question}</h1>
                    {question.answersArray ? question.answersArray.map(answer => {
                        return (
                        <label>
                            <input className="ans" type="checkbox" key={question.answersArray.indexOf(answer)} value={answer}/>
                        {answer}</label>
                        )
                    }) : <h1>Please Enter a Question!</h1>}
                </div>
            </div>
        )
    }
}

export default Question;