import React , { Component } from 'react';
import releaseConfetti from '../utils/initiateConfetti';
import {Link} from 'react-router-dom';

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
        <Link to="/answers" className="btn-answers" onClick={e => e.preventDefault()}>See answers</Link>
      </div>    
    )
  }
}

export default Results;