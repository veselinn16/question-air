import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import TweenLite from "gsap/TweenLite";
import animation from './sample';
import Questions from './Questions';

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
            animation.container = this.dom.container;
            animation.setVal(100, this.dom.listQuestions.length, this.props.questions);
            animation.setAnimation(this.dom.container); // sets Tween to animation container
            this.dom.listQuestions.map((el, i) => animation.Sortable(el, i, this.dom.container));
        }
    }

    render() {
        return (
            // this.props.questions.length > 0 ?
            //  <div className="q_container">
            //     <ol className='qs'>
            //         {this.props.questions.map((question, i) => {
            //           return <li key={i} className='q' draggable='true'>{i + 1} {question.question}</li>  
            //         })}
            //     </ol>                
            // </div> : <h1>Enter questions please!</h1>
            this.props.questions.length > 0 ?
            <div className="route">
                <div className="container-arrange" ref={container => this.dom.container = container}>
                    {this.props.questions.map((question, i) => {
                    return <div className="list-item" key={i} ref={question => this.dom.listQuestions[i] = question}>
                                <div className="item-content">
                                    <span className='order'>{i + 1}</span>. {question.question}
                                </div>
                            </div>})}
                </div>
                <Questions questions={this.props.questions}></Questions>
                <Link className="btn-questio" to='/question-1'>Show Question</Link>            
            </div>
            : <h1>Enter questions please!</h1>
        )
    }
}

export default Arrange;