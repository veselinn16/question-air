import React, { Component } from 'react';

class Answers extends Component {
    render() {
        return (
            <div className="answers-section">
                
                <table className="answers-table">
                    <thead>
                        <tr>
                            <th className="heading">Question</th>
                            <th className="heading">Right Answer</th>
                            <th className="heading">Your Answer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.questions.map(question => {
                            return <tr>
                                        <td className="cell">{question.question}</td>
                                        <td className="cell">{question.answer}</td>
                                        <td className="cell">{question.response}</td>
                                    </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Answers