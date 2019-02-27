import React from 'react';
import { Link } from 'react-router-dom';

export const FourOhFour = () => {
    return(
        <div className="four-oh-four-container">
            <h1 className="four-oh-four-status">404</h1>
            <h2 className="four-oh-four-message">The page you requested is not yet built by the developer!</h2>
            <Link to="/" className="link-404"><span className="link-404-text">Go Home</span></Link>
        </div>
    )
}