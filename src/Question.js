import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Question extends Component {
    state = {
        score: 0
    }

    // componentDidMount() {
    //     // console.log(this.props.match.params.question);
    // }

    displayResults = result => {
        // checks value of radios against correct answer and updates score
        result === this.props.questions[0].answer && this.setState(prevState => {
            prevState.score ++
        })
        this.props.questions.shift();
    }

    getRadioVal = () => {
        // REFAAAAAAAAAAAAAAAACCCCCCTOOOOOOOORRR!
        let val;
        // get list of radio buttons with specified name
        let radios = document.querySelector('.answers').elements['answer'];
        
        // loop through list of radio buttons
        for (let i=0, len=radios.length; i<len; i++) {
            if ( radios[i].checked ) { // radio checked?
                val = radios[i].value; // if so, hold its value in val
                break; // and break out of for loop
            }
        }

        this.displayResults(val);
    }

    render() {
        const {questions} = this.props // unpack question from props object
        return(                
            questions.length > 0 ?
            <div className="question-container"> 
                <h1 className="question">{questions[0].question}</h1>
                <form className="answers">
                    {questions[0].answersArray.map((answer, i) => {
                    return (
                    <label>
                        <input className="ans" type="radio" key={i} name="answer" defaultValue={answer}/>
                    {answer}
                    </label>
                    )                
                })}
                </form>
                <Link className="answer-btn" onClick={this.getRadioVal} to='/question-2'>Submit Answer</Link> 
            </div> : <h1>Please Enter a Question!</h1>            
        )
        // return (
        //  <div className="question-container">
        //      <h1 className="question">Question</h1>
        //        <form className="answers" onChange={this.handleAnswer}>
        //            {['Answer1', 'Answer2', 'Answer3', 'Answer4'].map((answer, i) => {
        //                return (
        //                <label>
        //                    <input className="ans" type="radio" key={i} name="answer"/>
        //                {answer}</label>
        //                )
        //            })}
        //        </form>
        //        <button className="answer-btn" onClick={this.getRadioVal}>Submit Answer</button>        
        //    </div>
        // )
    }
}

export default Question;