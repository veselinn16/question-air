import React , { Component } from 'react';

class Results extends Component {
    render() {
        const {questions, score} = this.props// props object destructuring

        return (
            questions.length > 0 ?
            <div>
                <p>Your score is {score}</p>
                {questions.map(el => {
                    return(
                    <div>
                        <p>Question: {el.question}</p>
                        <p>Your response was: {el.response}</p>
                        <p>The correct answer was: {el.answer}</p>
                    </div>)
                })}
            </div>
            : <h1>Please answer questions first!</h1>
            )
    }
}

export default Results;