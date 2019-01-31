import React from 'react';
import Icon from './Icon';

const Social = (props) => {
    return (
        <footer className={props.class}>
            <a href="https://www.instagram.com/vesel.out/" rel="noopener noreferrer" target="_blank">
                <Icon dims='32' type='instagram' classes={`instagram instagram-${props.inst}`}/>
            </a>
            <a href="https://www.facebook.com/profile.php?id=100000450630612" rel="noopener noreferrer" target="_blank">
                <Icon dims='32' type='facebook2' classes={`facebook facebook-${props.inst}`}/>
            </a>
            <a href="https://github.com/veselinn16" rel="noopener noreferrer" target="_blank">
                <Icon dims='32' type='github' classes={`github github-${props.inst}`}/>
            </a>
            <a href="https://www.linkedin.com/in/veselin-tonev-173b09152/" rel="noopener noreferrer" target="_blank" classes={`linkedin linkedin-${props.inst}`}>
                <Icon dims='32' type='linkedin' classes={`github github-${props.inst}`}/>
            </a>
            <p className="copyright">&copy; Veselin Tonev 2019</p>
        </footer>
        
    )
}

export default Social