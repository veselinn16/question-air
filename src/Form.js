import React,  { Component } from "react";
import { Link } from 'react-router-dom';

class Form extends Component {
    render() {
        const {hideWarning, getData} = this.props // props object destructuring
        return(
        <div className="index">
            <form className="form" onChange={hideWarning}>
                <h2 className="title">?uestion-air</h2>
                <input className="question" type="text" placeholder="Enter Question Here..."/>
                <input className="answer correct" type="text" placeholder="Enter CORRECT Answer Here..."/>
                <input className="answer" type="text" placeholder="Enter Answer Here..."/>
                <input className="answer" type="text" placeholder="Enter Answer Here..."/>
                <input className="answer" type="text" placeholder="Enter Answer Here..."/>
                <input className="submit" type="submit" value="Submit" onClick={getData}/>
            </form>
            <Link className="btn-question" to='/question-1'>Show Question</Link>
            <Link className="btn-question" to='/arrange-questions'>Arrange Questions</Link>
        </div>
        )
    }
}

export default Form;