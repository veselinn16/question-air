import React , { Component } from 'react';

class Results extends Component {
    render() {
        return (
            <div>
                <p>Your score is {this.props.score}</p>
            </div>
            )
    }
}

export default Results;