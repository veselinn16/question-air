import React , { Component } from 'react';
import releaseConfetti from '../utils/initiateConfetti';
import {Link} from 'react-router-dom';
import { createText } from '../utils/text';

class Results extends Component {
  changeText() {
    this.props.engine.remove(this.props.text);

    this.props.engine.add(this.addNewText());
    console.log(this.props.engine);
  }

  addNewText() {
    this.props.updateRound();

    return createText(`You got ${this.props.score} out of ${this.props.questions.length}`);

    console.log(createText(`You got ${this.props.score} out of ${this.props.questions.length}`));
  }

  initiateConfetti() {
    const text = this.addNewText();

    
    const engine = releaseConfetti(text);
    
    // this.props.changeResultsText(text);
    this.props.setEngineAndText(engine, text);
  }

  componentDidMount() {
    console.log(this.props.engine);
    console.log(this.props.text);
    (this.props.questions.length > 0 && this.props.round === 1) && this.initiateConfetti();

    if(this.props.questions.length > 0 && this.props.round > 1) {
      this.props.engine.dom.hidden = true;
      this.initiateConfetti();
    }
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