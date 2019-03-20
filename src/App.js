import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Form from './routes/Form';
import Question from './routes/Question';
import Arrange from './routes/Arrange';
import Results from './routes/Results';
import Answers from './routes/Answers';
import { FourOhFour } from './routes/FourOhFour';

class App extends Component {
  state = {
    questions: [],
    score: 0,
    round: 0,
    engine: null
  }

  setEngine(engine) {
    // sets engine
    this.setState({
      engine
    })
  }

  updateRound() {
    // updates round
    this.setState( prevState => ({
      ...prevState,
      round: prevState.round + 1
    }))
  }

  emptyStateObject() {
    // resets user data
    this.setState({
      questions: [],
      score: 0
    });
  }

  createWarning = (text, el) => {
    const warning = document.createElement('p'); // CHANGE WITH REACT.CREATEELEMENT() !!!!!!!!

    warning.className = 'warning';

    const warningText = document.createTextNode(text);
    warning.appendChild(warningText);

    document.querySelector(el).prepend(warning);
  }

  showWarning = (text, el) => {
    (!document.querySelector('.warning')) && this.createWarning(text, el); // If there is no warning on the page, create and display warning
  }

  registerQuestion = question => {
    this.setState( prevState => ({
      questions: [...prevState.questions, question]
    }));

    this.displayButton(); // make question button visible
  }

  displayButton = () => {
    let buttons = [];
    const questionButton = document.querySelector('.btn-question');
    const arrangeButton = document.querySelector('.btn-arrange');
    buttons.push(questionButton, arrangeButton);

    buttons.forEach(el => {
      el.style.pointerEvents = 'auto'
      el.style.opacity = '1';
    });

    this.emptyFormFields();
  }

  validateQuestion = question => {
    let result = 0;
    const array = [question.question, ...question.answersArray]; // add question to array of questions
    array.forEach(element => {
      result += (element.length > 0 ? ' 0 ' : ' -1 '); // if there is an empty form field return -1 and display warning later
    });
 
    result.includes('-1') ? this.showWarning('Please make sure to fill out all the form elements', '.form-container') : this.registerQuestion(question); // prepend warning or register question     
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

  checkForCommonAnswers = array => {
    let answerCount = [];
    array.forEach(el => {
      // returns new array with number of times answer is found in array
      let s = array.filter(element => el === element).length;
      // push the number of times it is found
      answerCount.push(s);
    });

    // for every method
    function checkForSameAnswer(val) {
      return val === 1;
    }

    // returns true if answers are unique and false if there are duplicate answers
    return answerCount.every(checkForSameAnswer);
  }

  getData = e => {
    // prevent default behavior of submit button
    e.preventDefault();

    // extract text from HTML nodes
    let question = document.querySelector('.question').value.trim();
    let answer = document.querySelector('.correct').value.trim();
    let answerArray = [].slice.call(document.querySelectorAll('.answer')); // convert nodelist to array
    let answersArr = answerArray.map(answer => answer.value.trim()); // extract text
    let answersArray = this.shuffleAnswers(answersArr); // randomize order of answers
    let answerCheck = this.checkForCommonAnswers(answersArray);

    let questionObj = {
      question,
      answer,
      answersArray,
      response: null // user's answer
    }

    // if there all answers are unique, validate questions. If not, show warning 
    answerCheck ? this.validateQuestion(questionObj) : this.showWarning('There are answers, which are the same!', '.form-container');
  }

  submitAnswer = (index, answer) => {
    let questionsCopy = this.state.questions;
    questionsCopy[index].response = answer;

    this.setState({ questions: questionsCopy});
  }

  increaseScore = () => {
    let newScore = this.state.score
    newScore++
    this.setState({ score: newScore });
  }

  hideWarning = () => {
    // removes warning if there is any
    const warning = document.querySelector('.warning');
    warning && (warning.style.opacity = '0'); // animate opacity
    warning && warning.parentElement.removeChild(warning); // if there is a warning, remove it
  }

  componentDidMount() {
    this.updateRound();
  }

  render() {
    const {questions, score} = this.state // state object destructuring
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Form getData={this.getData} hideWarning={this.hideWarning}/>} />
          <Route path='/arrange-questions' render={() => <Arrange questions={questions}/>}/>
          <Route path='/question' render={() => <Question questions={questions} score={score} increaseScore={this.increaseScore} submitAnswer={this.submitAnswer} showWarning={this.showWarning} hideWarning={this.hideWarning}/>}/>
          <Route path='/results' render={() => <Results score={score} questions={questions} round={this.state.round} updateRound={this.updateRound.bind(this)} setEngine={this.setEngine.bind(this)} engine={this.state.engine}/>}/>
          <Route path='/answers' render={() => <Answers score={score} questions={questions} emptyStateObject={this.emptyStateObject}/>}/>
          <Route component={FourOhFour} />
        </Switch>
      </div>
    );
  }
}

export default App;
