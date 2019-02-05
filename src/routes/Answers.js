import React, { Component } from 'react';
import Icon from '../components/Icon';
import Social from '../components/Social';

class Answers extends Component {
    render() {
        return (
            <div className="answers-section">
                <Icon dims='640' type='logo' classes="logo logo-4"/>
                <table className="answers-table">
                    <thead>
                        <tr>
                            <th className="heading">Question</th>
                            <th className="heading">Right Answer</th>
                            <th className="heading">Your Answer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.questions.map((question, i) => {
                            return <tr key={i}>
                                        <td className="cell">{question.question}</td>
                                        <td className="cell">{question.answer}</td>
                                        <td className="cell">{question.response}</td>
                                    </tr>
                        })}
                    </tbody>
                </table>
                <Social inst="4" class="footer-1"/>
            </div>
        )
    }
}

export default Answers