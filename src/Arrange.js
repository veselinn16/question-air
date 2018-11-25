import React, { Component } from 'react';

class Arrange extends Component {
    componentWillMount() {
        console.log(this.props.questions[0].question);
    }
    render() {
        return (
            <div>
                <ul className='qs'>
                    {this.props.questions.map((question, i) => {
                      return <li key={i} className='q'>{question.question}</li>  
                    })}
                </ul>
                
            </div>
        )
    }
}

export default Arrange;