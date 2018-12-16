import React , { Component } from 'react';

class Results extends Component {
    render() {
        return (
            <div>
                <p>Your score is {this.props.score}</p>
                {this.props.questions.map(el => {
                    return(
                    <div>
                        <p>Question: {el.question}</p>
                        <p>Your response was: {el.response}</p>
                        <p>The correct answer was: {el.answer}</p>
                    </div>)
                })}
            </div>
            )
    }
}

export default Results;