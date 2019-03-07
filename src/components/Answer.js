import React from "react";

const Answer = ({i, answer}) => (
    <label htmlFor={`radio-${i + 1}`} className="btn-radio">
        <input type="radio" className="radio" id={`radio-${i + 1}`} name="radio-group"/>
        <svg width="100px" heigth="100px" viewBox="0 0 100 100" className="btn-canvas">
            <circle cx="50" cy="50" r="20" className="btn-shape"></circle>
            <path d="M50,42.5 C45.8578651,42.5 42.5,45.8578651 42.5,50 C42.5,54.1421349 45.8578651,57.5 50,57.5 C54.1421349,57.5 57.5,54.1421349 57.5,50 C57.5,45.8578651 54.1421349,42.5 50,42.5 Z" className="inner"></path>
            <path d="M50,30 C38.954305,30 30,38.954305 30,50 C30,61.045695 38.954305,70 50,70 C61.045695,70 70,61.045695 70,50 C70,38.954305 61.045695,30 50,30 Z" className="outer"></path>
        </svg>
        <span className="btn-answer-text">{answer}</span>
    </label>        
)

export default Answer;