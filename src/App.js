import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';

import Form from './Form';
import Question from './Question';

class App extends Component {
  state = {
    question: ''
  }

  displayWarning = () => {
    // create warning and prepend it to the form
    const warning = document.createElement('p')
    warning.className = 'warning';
    const warningText = document.createTextNode('Please make sure to fill out all the form elements');
    warning.appendChild(warningText);
    document.querySelector('.index').prepend(warning)
  }

  registerQuestion = question => {
    this.setState({question: question});
    this.displayButton(); // make question button visible
  }

  displayButton = () => {
    const questionButton = document.querySelector('.btn-question');
    questionButton.style.opacity = '1';
  }

  validateQuestion = question => {
    let result;
    const array = [question.question, ...question.answersArray];
    array.forEach(element => {
      result += (element.length > 0 ? ' 0 ' : ' -1 ');
    });
    console.log(question);

    result.includes('-1') ? this.displayWarning() : this.registerQuestion(question); // prepend warning or register question
  }

  getData = e => {
    // prevent default behabior of submit button
    e.preventDefault();

    // extract text from HTML nodes
    let question = document.querySelector('.question').value;
    let answer = document.querySelector('.correct').value;
    let answerArray = [].slice.call(document.querySelectorAll('.answer')); // convert nodelist to array
    let answersArray = answerArray.map(answer => answer.value); // extract text

    let questionObj = {
      question,
      answer,
      answersArray            
    }

    this.validateQuestion(questionObj)  
  }

  hideWarning = () => {
    // removes warning if there is any
    const warning = document.querySelector('.warning');
    warning && warning.parentElement.removeChild(warning);
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => <Form getData={this.getData} hideWarning={this.hideWarning}/>} />
        <Route path='/question' render={() => <Question question={this.state.question} />}/>
      </div>
    );
  }
}

export default App;
