import React,  { Component } from "react";
import { Link } from 'react-router-dom';

class Form extends Component {
    render() {
        // const {props} = this.props
        return(
        <div className="index">
            <form className="form" onChange={this.props.hideWarning}>
                <h2 className="title">?uestion-air</h2>
                <input className="question" type="text" placeholder="Enter Question Here..."/>
                <input className="answer correct" type="text" placeholder="Enter CORRECT Answer Here..."/>
                <input className="answer" type="text" placeholder="Enter Answer Here..."/>
                <input className="answer" type="text" placeholder="Enter Answer Here..."/>
                <input className="answer" type="text" placeholder="Enter Answer Here..."/>
                <input className="submit" type="submit" value="Submit" onClick={this.props.getData}/>
            </form>
            <Link className="btn-question" to='/question-1'>Show Question</Link>
        </div>
        )
    }
}

export default Form;