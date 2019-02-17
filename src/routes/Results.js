import React , { Component } from 'react';
import releaseConfetti from '../utils/initiateConfetti';
import {Link} from 'react-router-dom';
import { createText } from '../utils/text';

class Results extends Component {
  addNewText() {
    this.props.updateRound();

    return createText(`You got ${this.props.score} out of ${this.props.questions.length}`);
  }

  initiateConfetti() {    
    const engine = releaseConfetti(this.addNewText());
    
    this.props.setEngine(engine);
  }

  hidePreviousEngine() {
    this.props.engine.dom.hidden = true;

    this.initiateConfetti();
  }

  componentDidMount() {
    this.props.questions.length > 0 ? this.props.round === 1 ? this.initiateConfetti() : this.hidePreviousEngine() : console.log('No questions submitted!');
  }

  render() {
    return (
    this.props.questions.length > 0 ?      
      <div className="results-container" ref="results">
        <div className="overlay"></div>
        <main>
          <div className="frame"></div>
        </main>
        <Link to="/answers" className="btn-answers">See answers</Link>
      </div>
      : <h1>Please Enter Questions and answer them!</h1>
    )
  }
}

export default Results;