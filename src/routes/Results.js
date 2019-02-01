import React , { Component } from 'react';
import releaseConfetti from '../utils/initiateConfetti';

class Results extends Component {
  componentDidMount() {
    releaseConfetti(`You got ${this.props.score} out of ${this.props.questions.length}`);
  }

  render() {
    return (
      <div className="results-container">
        <div className="overlay"></div>
        <main>
            <div className="frame"></div>
        </main>
      </div>    
    )
  }
}

export default Results;