import React from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import Social from "../components/Social";

const Form = ({ hideFeedback, getData }) => (
  <div className="form-container">
    <Icon dims="640" type="logo" classes="logo logo-1" />
    <p className="feedback">d</p>
    <form className="form" onChange={hideFeedback} onSubmit={getData}>
      <h2 className="title">Question Form</h2>
      <input
        className="question"
        type="text"
        spellCheck="false"
        placeholder="Enter Question Here..."
      />
      <input
        className="answer correct"
        type="text"
        spellCheck="false"
        placeholder="Enter CORRECT Answer Here..."
      />
      <input
        className="answer"
        type="text"
        spellCheck="false"
        placeholder="Enter Answer Here..."
      />
      <input
        className="answer"
        type="text"
        spellCheck="false"
        placeholder="Enter Answer Here..."
      />
      <input
        className="answer"
        type="text"
        spellCheck="false"
        placeholder="Enter Answer Here..."
      />
      <button className="submit">Submit</button>
    </form>
    <Link className="btn btn-question" to="/question">
      Show Questions
    </Link>
    <Link className="btn btn-arrange" to="/arrange-questions">
      Arrange Questions
    </Link>
    <Social inst="1" clazz="footer-1" />
  </div>
);

export default Form;
