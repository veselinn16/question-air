import React, { Component } from 'react';
import Icon from '../components/Icon';
import Social from '../components/Social';

class Answers extends Component {
    componentDidMount() {
        const left  = Array.prototype.slice.call(this.refs.left.children);
        const right = Array.prototype.slice.call(this.refs.right.children);

        left.forEach((el, i) => {
            el.classList.add(`bubble-${i + 1}`);
        });

        right.forEach((el, i) => {
            el.classList.add(`bubble-${i + 6}`);
        });
    }    

    render() {
        return (
            <div className="answers-section">
                <Icon dims='640' type='logo' classes="logo logo-4"/>
                <div className="bubbles-left" ref="left">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
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
                <div className="bubbles-right" ref="right">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <Social inst="4" class="footer-1"/>
            </div>
        )
    }
}

export default Answers