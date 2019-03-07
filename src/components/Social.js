import React from 'react';
import Icon from './Icon';

const Social = ({clazz, inst}) => (
    <footer className={clazz}>
        <a href="https://www.instagram.com/vesel.out/" rel="noopener noreferrer" target="_blank">
            <Icon dims='32' type='instagram' classes={`instagram instagram-${inst}`}/>
        </a>
        <a href="https://www.facebook.com/profile.php?id=100000450630612" rel="noopener noreferrer" target="_blank">
            <Icon dims='32' type='facebook2' classes={`facebook facebook-${inst}`}/>
        </a>
        <a href="https://github.com/veselinn16" rel="noopener noreferrer" target="_blank">
            <Icon dims='32' type='github' classes={`github github-${inst}`}/>
        </a>
        <a href="https://www.linkedin.com/in/veselin-tonev-173b09152/" rel="noopener noreferrer" target="_blank" classes={`linkedin linkedin-${inst}`}>
            <Icon dims='32' type='linkedin' classes={`github github-${inst}`}/>
        </a>
        <p className="copyright">&copy; Veselin Tonev 2019</p>
    </footer>    
)

export default Social