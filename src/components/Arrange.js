import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import animation from '../sample';
import Questions from './Questions';
import Icon from './Icon';
import Social from './Social';

class Arrange extends Component {
    constructor(props) {
        super(props);
        this.dom = {
            container: React.createRef(), // container of questions
            listQuestions: [] // Array of question elements
        }
    }

    componentDidMount() {
        if (this.dom.listQuestions.length > 0) {
            animation.container = this.dom.container; // the container of the animation
            animation.setVal(90, this.dom.listQuestions.length, this.props.questions);
            animation.setAnimation(this.dom.container); // sets Tween to animation container
            this.dom.listQuestions.map((el, i) => animation.Sortable(el, i, this.dom.container)); // converts nodes to Sortables
        }
    }

    render() {
        const { questions } = this.props // props object destructuring
        return (
            // this.props.questions.length > 0 ?
            //  <div className="q_container">
            //     <ol className='qs'>
            //         {this.props.questions.map((question, i) => {
            //           return <li key={i} className='q' draggable='true'>{i + 1} {question.question}</li>  
            //         })}
            //     </ol>                
            // </div> : <h1>Enter questions please!</h1>
            questions.length > 0 ?
            <div className="route">
                <section className="left">
                    <Icon dims='640' type='logo' classes="logo logo-2"/>
                    <div className="container-arrange" ref={container => this.dom.container = container}>
                        {questions.map((question, i) => {
                        return <div className="list-item" key={i} ref={question => this.dom.listQuestions[i] = question}>
                            <div className="item-content">
                                <span className='order'>{i + 1}</span>. {question.question}
                            </div>
                        </div>})}
                    </div>
                </section>
                <section className="right">
                    <Questions questions={questions}></Questions> 
                </section>
                <Link className="btn btn-questions" to='/question-1'>Show Questions</Link>
                <Social inst="2" class="footer-1"/>
            </div>
            : <h1>Enter questions please!</h1>
        )
    }
}

export default Arrange;