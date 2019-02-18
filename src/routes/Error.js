import React from 'react';
import { Link } from 'react-router-dom';

const Error = ({text, recommendation}) => {
    return(
        <div className="error-container">
            <div className="content-container">
                <div className="error-illustration">
                
                </div>
                <div className="error-heading">
                    <h1>{text}</h1>
                </div>
                <div className="error-recommendation">
                    <p>{recommendation}</p>
                </div>
            </div>
            <Link to='/' className="error-link">Back home</Link>
        </div>
    )
}

export default Error;