import React , { Component } from 'react';
import releaseConfetti from '../utils/initiateConfetti';
import {Link} from 'react-router-dom';
import { createText } from '../utils/text';

class Results extends Component {
  componentDidMount() {
    const text = createText(`You got ${this.props.score} out of ${this.props.questions.length}`);
    
    const engine = releaseConfetti(text);

    setTimeout(() => {
      engine.remove(text);
    }, 5000);
  }

  render() {
    return (
      <div className="results-container" ref="results">
        <div className="overlay"></div>
        <main>
          <div className="frame"></div>
        </main>
        <Link to="/answers" className="btn-answers">See answers</Link>
      </div>    
    )
  }
}

export default Results;