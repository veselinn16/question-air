import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';

import Form from './Form';
import Question from './Question';
import Arrange from './Arrange';
import Results from './Results';

class App extends Component {
  state = {
    questions: [],
    score: 0
  }

  displayWarning = () => {
    // create warning and prepend it to the form
    const warning = document.createElement('p'); // CHANGE WITH REACT.CREATEELEMENT() !!!!!!!!
    warning.className = 'warning';
    const warningText = document.createTextNode('Please make sure to fill out all the form elements');
    warning.appendChild(warningText);
    document.querySelector('.index').prepend(warning)
  }

  registerQuestion = question => {
    this.setState( prevState => ({
      questions: [...prevState.questions, question]
    }));

    this.displayButton(); // make question button visible
  }

  arrangeQuestions = questions => {
    this.setState({questions})
  }

  displayButton = () => {
    const questionButton = [].slice.call(document.querySelectorAll('.btn-question'));
    questionButton.forEach(el => el.style.opacity = '1');

    this.emptyFormFields();
  }

  validateQuestion = question => {
    let result;
    const array = [question.question, ...question.answersArray]; // add question to array of questions
    array.forEach(element => {
      result += (element.length > 0 ? ' 0 ' : ' -1 '); // if there is an empty form field return -1 and display warning later
    });

    result.includes('-1') ? this.displayWarning() : this.registerQuestion(question); // prepend warning or register question
  }

  shuffleAnswers = array => {
    // shuffles the order of the elements of the answers array using the Durstenfeld shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  emptyFormFields = () => {
    // deletes text from form fields
    let question = document.querySelector('.question');
    let answerArray = [].slice.call(document.querySelectorAll('.answer'));
    [question, ...answerArray].forEach(el => el.value = '');

    question.focus(); // set focus on question field after emptying text
  }

  getData = e => {
    // prevent default behabior of submit button
    e.preventDefault();

    // extract text from HTML nodes
    let question = document.querySelector('.question').value;
    let answer = document.querySelector('.correct').value;
    let answerArray = [].slice.call(document.querySelectorAll('.answer')); // convert nodelist to array
    let answersArr = answerArray.map(answer => answer.value); // extract text
    let answersArray = this.shuffleAnswers(answersArr); // randomize order of answers

    let questionObj = {
      question,
      answer,
      answersArray,
      response: null // user's answer
    }

    this.validateQuestion(questionObj)  
  }

  submitAnswer = (index, answer) => {
    let questionsCopy = this.state.questions;
    questionsCopy[index].response = answer;

    this.setState({ questions: questionsCopy});
  }

  // removeQuestion = () => {
  //   console.log('Removing first question from questions array');
  //   let newQuestions = [...this.state.questions];
  //   newQuestions.splice(0,1);
  //   this.setState({ questions: newQuestions });
  // }

  increaseScore = () => {
    console.log('Adding score');
    let newScore = this.state.score
    newScore++
    this.setState({ score: newScore });
  }

  hideWarning = () => {
    // removes warning if there is any
    const warning = document.querySelector('.warning');
    warning && warning.parentElement.removeChild(warning); // if there is a warning, remove it
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => <Form getData={this.getData} hideWarning={this.hideWarning}/>} />
        <Route path='/arrange-questions' render={() => <Arrange questions={this.state.questions} arrangeQuestions={this.arrangeQuestions}/>}/>
        <Route path='/question-1' render={() => <Question questions={this.state.questions} score={this.state.score} increaseScore={this.increaseScore} submitAnswer={this.submitAnswer}/>}/>
        <Route path='/results' render={() => <Results score={this.state.score} questions={this.state.questions}/>}/>
      </div>
    );
  }
}

export default App;
