import React,  { Component } from "react";

class Form extends Component {
    state = {
        question: '',
        answer: ''
    }

    getData = e => {
        // prevent default behabior of submit button
        e.preventDefault();

        // extract text from HTML nodes
        let question = document.querySelector('.question').value;
        let answer = document.querySelector('.correct').value;
        let answerArr1 = [].slice.call(document.querySelectorAll('.answer')); // convert nodelist to array
        let answerArr = answerArr1.map(ans => ans.value); // extract text
        
        let questionObj = {
            question,
            answer,
            answerArr            
        }
        console.log(`Question: ${questionObj.question}`);
        console.log(`Correct: ${questionObj.answer}`);
        console.log(`Answer array: ${questionObj.answerArr[0]}`);
    }

    render() {
        return(
        <form className="form">
            <h2 className="title">?uestion-air</h2>
            <input className="question" type="text" placeholder="Enter Question Here..."/>
            <input className="answer correct" type="text" placeholder="Enter CORRECT Answer Here..."/>
            <input className="answer" type="text" placeholder="Enter Answer Here..."/>
            <input className="answer" type="text" placeholder="Enter Answer Here..."/>
            <input className="answer" type="text" placeholder="Enter Answer Here..."/>
            <input className="submit" type="submit" value="Submit" onClick={this.getData}/>
        </form>
        )
    }
}

export default Form;