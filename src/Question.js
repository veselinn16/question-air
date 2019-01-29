import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import Social from './Social';
import Answer from './Answer';
import initBt2 from './resultsBtn';

class Question extends Component {
    state = {
        numberOfQuestion: 0,
        questions: [],
        hidden: false
    }

    initiateButton = () => {
        // sets up tween on results button
        let btn = document.querySelector('.btn-gooey');

        initBt2(btn);
    }

    componentDidMount() {
        // checks if there is a results button and call the initiate button if there is
        document.querySelector('.btn-gooey') && this.initiateButton();
    }

    emptyOutRadios = radios => {
        // unchecks all radio buttons
        radios.forEach(el => el.checked = false);
    }

    getRadioVal = () => {
        let answer;
        // get list of radio buttons with specified name
        let radios = this.refs.answers.elements.namedItem('radio-group'); //RadioNodeList

        radios.forEach(el => {
            (el.checked) && (answer = el.nextSibling.nextSibling.innerText) // sets the answer variable equal to the value of the checked by the user radio
        });
        
        (!answer) ? this.props.showWarning('Please select an answer!', '.question-container') : this.checkAnswer(answer); // show warning or check answer submitted by the user (string)
        
        this.emptyOutRadios(radios); // removes checked radio buttons
    }

    applyAnimation = () => {
        let elements = document.querySelectorAll('.question-text, .btn-answer-text, .answers');

        elements.forEach(el => {
            el.style.opacity = '0'
        })

        setTimeout(() => {
            elements.forEach(el => {
                el.style.opacity = '1';
            })
        }, 450);
    }

    changeQuestion = () => {
        this.setState( prevState => ({
            numberOfQuestion: prevState.numberOfQuestion + 1
        }));

        this.applyAnimation()
    }

    checkAnswer = answer => {
        // checks value of radios against correct answer and updates score and submits answer
        (answer === this.props.questions[this.state.numberOfQuestion].answer) && this.props.increaseScore();

        this.props.submitAnswer(this.state.numberOfQuestion, answer) // submits answer into state object's questions array
        
        this.changeQuestion();
    } 

    render() {
        const {questions} = this.props // props object destructuring
        const {numberOfQuestion} = this.state; // state object destructuring
        return(                
            questions.length > 0 ? questions[numberOfQuestion] ?
            <div className="questions-route">
                <Icon dims='640' type='logo' classes="logo logo-3"/> 
                <div className="question-container" ref='question'>
                    {/* <p>{this.props.score}</p>  */}
                    <h1 className="question-text">{questions[numberOfQuestion].question}</h1>
                </div>
                <div className="answers-container">
                    <form className="answers" ref="answers" onClick={this.props.hideWarning}>
                        {questions[numberOfQuestion].answersArray.map((answer, i) => {
                        return (
                            <Answer i={i} answer={answer} key={i}/>
                        )                
                    })}
                    </form>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="svg-filters">
                        <defs>
                            <filter id="filter-goo">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                                <feComposite in="SourceGraphic" in2="goo" />
                            </filter>
                        </defs>
                    </svg>
                    <button onClick={this.getRadioVal} className="btn-gooey" style={{
                        filter: 'url(\'#filter-goo\')'}}>
                            Submit Answer
                        <span className="btn-bg"></span>
                    </button>
                    <Social inst="3" class="footer-2"/>
                </div>
            </div>            
             :  <Link to="/results" className="btn btn-results">See Results</Link> : <h1>Please Enter a Question!</h1>            
        )
    }
}

export default Question;