import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Social from '../components/Social';
import Answer from '../components/Answer';
import initBtn from '../utils/AnswerBtn';

class Question extends Component {
    state = {
        numberOfQuestion: 0
    }

    initiateButton = () => {
        // sets up tween on results button
        const btn = document.querySelector('.btn-gooey');

        initBtn(btn);
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

    applyAnimation = (type) => {
        const elements = document.querySelectorAll('.question-text, .btn-answer-text, .answers');

        // if there are more questions(type = 1), hide all elements
        elements.forEach((el, i) => {
            type === 1 ? el.style.opacity = '0' :
            i !== 0 ? el.style.opacity = '0' : el.style.animation = 'moveDown .6s ease-out'
        })

        // if there are no more questions, change the text of the question-text element
        type !== 1 && (elements[0].innerText = 'That\'s all !')

        // if there are more questions(type = 1), show all elements again
        type === 1  && setTimeout(() => {
            elements.forEach(el => {
                el.style.opacity = '1';
            })
        }, 450);
    }

    changeQuestion = (timeout, type) => {
        // add timeout to change of question if it is the last question, so animation of button can finish
        setTimeout(() => {
                this.setState( prevState => ({
                    numberOfQuestion: prevState.numberOfQuestion + 1
                }))
            }, timeout);

        this.applyAnimation(type)
    }

    checkAnswer = answer => {
        // checks value of radios against correct answer and updates score and submits answer
        (answer === this.props.questions[this.state.numberOfQuestion].answer) && this.props.increaseScore();

        // submits answer into state object's questions array
        this.props.submitAnswer(this.state.numberOfQuestion, answer) 
        
        // if this is the last question add timeout to the changeQuestion function
        this.props.questions.length - 1 === this.state.numberOfQuestion ? this.changeQuestion(1200) : this.changeQuestion(0, 1);
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
             : <div className="results-section">
                <Icon dims='640' type='logo' classes="logo logo-4"/>
                <Link to="/results" className="btn-results"></Link>
               </div> 
             : <h1>Please Enter a Question!</h1>            
        )
    }
}

export default Question;