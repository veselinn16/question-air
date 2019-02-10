import React, { Component } from 'react';
import Icon from '../components/Icon';
import Social from '../components/Social';
import { Link } from 'react-router-dom';
import initBubbles from '../utils/bubbles';

class Answers extends Component {
    removeMessage = () => {
        this.refs.message.style.display = 'none';
    }

    componentDidMount() {
        console.log('Thank you for playing!');
        const left  = Array.prototype.slice.call(this.refs.left.children);
        const right = Array.prototype.slice.call(this.refs.right.children);

        initBubbles(left, right);

        setTimeout(() => {
            this.removeMessage();
        }, 4000);
    }    

    render() {
        return (
            <div className="answers-section">
                <Icon dims='640' type='logo' classes="logo logo-4"/>
                <div className="message-container" ref="message">
                    <h1 className="message">Thank you for playing!</h1>
                </div>
                <Link to="/" className="btn-again" ref="btn-again">
                Play Again</Link>
                <div className="bubbles-left" ref="left">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <table className="answers-table">
                    <thead className="answers-table-head">
                        <tr>
                            <th className="heading">Question</th>
                            <th className="heading">Right Answer</th>
                            <th className="heading">Your Answer</th>
                        </tr>
                    </thead>
                    <tbody className="answers-table-body">
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
                <Social inst="4" class="footer-4"/>
            </div>
        )
    }
}

export default Answers;