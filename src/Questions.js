import React, { Component } from "react";

class Questions extends Component {
    render() {
        const {questions} = this.props// props object destructuring
        return (
            <div className="menu">
                <h2 className="questions_heading">Original Question Order</h2>
                <ul className="questions">
                    {questions.map((q, i) => {
                        return <li className="item" key={i}>{i + 1}. {q.question}</li>
                    })}
                </ul>
            </div>
        )
    }
}

export default Questions;