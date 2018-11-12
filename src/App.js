import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <form className="form">
          <input className="question" type="text" placeholder="Enter Question Here..."/>
          <input className="answer correct" type="text" placeholder="Enter CORRECT Answer Here..."/>
          <input className="answer" type="text" placeholder="Enter Answer Here..."/>
          <input className="answer" type="text" placeholder="Enter Answer Here..."/>
          <input className="answer" type="text" placeholder="Enter Answer Here..."/>
        </form>
      </div>
    );
  }
}

export default App;
