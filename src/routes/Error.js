import React from 'react';
import { Link } from 'react-router-dom';

const Error = ({text, recommendation}) => (
    <div className="error-container">
        <div className="content-container">
            <div className="error-illustration-container">
                <img className="error-illustration" src="../undraw_questions_75e0.svg" alt="No Questions Illustration"/>
            </div>
            <div className="error-text-container">
                <h1 className="error-heading">{text}</h1>
                <p className="error-recommendation">{recommendation}</p>
                <Link to='/' className="error-link">Back home <span className="arrow">&rarr;</span></Link>
            </div>
        </div>
    </div>
)

export default Error;