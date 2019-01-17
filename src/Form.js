import React,  { Component } from "react";
import { Link } from 'react-router-dom';
import Icon from './Icon';
import Social from './Social';

class Form extends Component {
    render() {
        const {hideWarning, getData} = this.props // props object destructuring
        return(
        <div className="index" ref="index">
            <Icon dims='640' type='logo' class="logo"/>
            <form className="form" onChange={hideWarning}>
                <h2 className="title">Question Form</h2>
                <input className="question" type="text" placeholder="Enter Question Here..."/>
                <input className="answer correct" type="text" placeholder="Enter CORRECT Answer Here..."/>
                <input className="answer" type="text" placeholder="Enter Answer Here..."/>
                <input className="answer" type="text" placeholder="Enter Answer Here..."/>
                <input className="answer" type="text" placeholder="Enter Answer Here..."/>
                <button className="submit" onClick={getData}>Submit</button>
            </form>
            <Link className="btn btn-question" to='/question-1'>Show Question</Link>
            <Link className="btn btn-arrange" to='/arrange-questions'>Arrange Questions</Link>
            <Social/>
        </div>
        )
    }
}

export default Form;