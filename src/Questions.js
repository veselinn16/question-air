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
                    {/* <li className="item" key="1">Question 1</li>
                    <li className="item" key="2">Question 2</li>
                    <li className="item" key="3">Question 3</li>
                    <li className="item" key="4">Question 4</li> */}
                </ul>
            </div>
        )
    }
}

export default Questions;