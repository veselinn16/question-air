import React , { Component } from 'react';
import releaseConfetti from '../utils/initiateConfetti';
import {Link} from 'react-router-dom';
import { createText } from '../utils/text';
import Error from './Error';

class Results extends Component {
  addNewText() {
    // creates the text
    return createText(`You got ${this.props.score} out of ${this.props.questions.length}`);
  }

  initiateConfetti() {
    // creates the scene and unleashes confetti
    const engine = releaseConfetti(this.addNewText());
    
    // sets the state engine variable, so it can be removed on later rounds
    this.props.setEngine(engine);
  }

  hidePreviousEngine() {
    // hide the previous engine and initiate confetti
    this.props.engine.dom.hidden = true;

    this.initiateConfetti();
  }

  componentDidMount() {
    // if there are questions submitted and the round is 1, initiate confetti. If there are questions submitted and the round is not 1, remove previous text and intitiate confetti. If there are no questions submitted, log this to the console
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
      : <Error text='No Questions Found!' recommendation='Enter questions and answer them, please!' />
    )
  }
}

export default Results;