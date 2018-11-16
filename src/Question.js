import React, { Component } from 'react';

class Question extends Component {
    componentWillMount() {
        console.log(this.props);
        console.log(this.props);
    }

    render() {
        const {question} = this.props
        return(
            <div className="contain">
                <div className="question">
                    <h1 className="question">{question.question}</h1>
                    {question.answerArr.map(answer => {
                        return <p className="answer" key={answer.indexOf(question.answerArr)}>{answer}</p>
                    })}
                </div>
            </div>
        )
    }
}

export default Question;