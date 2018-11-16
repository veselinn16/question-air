import React,  { Component } from "react";

class Form extends Component {
    render() {
        return(
        <form className="form">
            <h2 className="title">?uestion-air</h2>
            <input className="question" type="text" placeholder="Enter Question Here..."/>
            <input className="answer correct" type="text" placeholder="Enter CORRECT Answer Here..."/>
            <input className="answer" type="text" placeholder="Enter Answer Here..."/>
            <input className="answer" type="text" placeholder="Enter Answer Here..."/>
            <input className="answer" type="text" placeholder="Enter Answer Here..."/>
            <input type="submit" value="Submit"/>
        </form>
        )
    }
}

export default Form;