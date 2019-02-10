import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';

import Form from './routes/Form';
import Question from './routes/Question';
import Arrange from './routes/Arrange';
import Results from './routes/Results';
import Answers from './routes/Answers';

class App extends Component {
  state = {
    questions: [],
    score: 0
  }

  emptyStateObject = () => {
    this.setState({
      questions: [],
      score: 0
    });
  }

  createWarning = (text, el) => {
    const warning = document.createElement('p'); // CHANGE WITH REACT.CREATEELEMENT() !!!!!!!!
    warning.className = 'warning'

    const warningText = document.createTextNode(text)
    warning.appendChild(warningText)

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
 
    result.includes('-1') ? this.showWarning('Please make sure to fill out all the form elements', '.index') : this.registerQuestion(question); // prepend warning or register question     
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
    // prevent default behavior of submit button
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

    this.validateQuestion(questionObj);  
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
    // setTimeout(() => {
      warning && warning.parentElement.removeChild(warning); // if there is a warning, remove it
    // }, 600);
  }

  // q = () => {
  //   return [
  //     {
  //       answer: 'Real Madrid',
  //       answersArray: ['Manchester United', 'Chelsea', 'Real Madrid', 'Liverpool'],
  //       question: 'Who won the 2018 Champions League final?',
  //       response: null
  //     },
  //     {
  //       answer: '681',
  //       answersArray: ['681', '43', '921', '1500'],
  //       question: 'When was Bulgaria established?',
  //       response: null
  //     },
  //     {
  //       answer: '4',
  //       answersArray: ['2', '5', '1', '4'],
  //       question: 'How many tires does a car have?',
  //       response: null
  //     },
  //     {
  //       answer: 'Real Madrid',
  //       answersArray: ['Manchester United', 'Chelsea', 'Real Madrid', 'Liverpool'],
  //       question: 'Who won the 2018 Champions League final?',
  //       response: null
  //     },
  //     {
  //       answer: 'Kim Kardashian',
  //       answersArray: ['Amber Rose', 'Dua Lipa', 'Kim Kardashian', 'Beyonce'],
  //       question: 'Who is Kanye West\'s wife?',
  //       response: null
  //     },
  //     {
  //       answer: '2017',
  //       answersArray: ['2016', '2017', '2015', '2018'],
  //       question: 'When was Frank Ocean\'s Blonde released?',
  //       response: null
  //     }
  //   ]
  // }

  render() {
    const {questions, score} = this.state // state object destructuring
    return (
      <div className="App">
        <Route exact path="/" render={() => <Form getData={this.getData} hideWarning={this.hideWarning}/>} />
        <Route path='/arrange-questions' render={() => <Arrange questions={questions}/>}/>
        <Route path='/question-1' render={() => <Question questions={questions} score={score} increaseScore={this.increaseScore} submitAnswer={this.submitAnswer} showWarning={this.showWarning} hideWarning={this.hideWarning}/>}/>
        <Route path='/results' render={() => <Results score={score} questions={questions}/>}/>
        <Route path='/answers' render={() => <Answers score={score} questions={questions} emptyStateObject={this.emptyStateObject}/>}/>
      </div>
    );
  }
}

export default App;
