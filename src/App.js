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

  validateForm = array => {
    let result;
    array.forEach(element => {
      result += (element.length > 0 ? ' 0 ' : ' -1 ');
    });
    console.log(result);
    console.log(result.includes('-1') ? 'Please make sure to fill out all the form elements' : 'All set to go!');
  }

  getData = e => {
    // prevent default behabior of submit button
    e.preventDefault();

    // extract text from HTML nodes
    let question = document.querySelector('.question').value;
    let answer = document.querySelector('.correct').value;
    let answerArray = [].slice.call(document.querySelectorAll('.answer')); // convert nodelist to array
    let answersArray = answerArray.map(answer => answer.value); // extract text

    this.validateForm([question, ...answersArray])
    
    // let questionObj = {
    //   question,
    //   answer,
    //   answersArray            
    // }

    // this.setState({question: questionObj});
    
    // console.log(`Question: ${questionObj.question}`);
    // console.log(`Correct: ${questionObj.answer}`);
    // console.log(`Answer array: ${questionObj.answerArr[0]}`);
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => <Form getData={this.getData} />} />
        <Route path='/question' render={() => <Question question={this.state.question} />}/>
      </div>
    );
  }
}

export default App;
