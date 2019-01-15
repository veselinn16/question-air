import React from 'react';
import Icon from './Icon';

const Social = () => {
    return (
        <footer className="footer">
            <a href="https://www.instagram.com/vesel.out/" rel="nopener noreferrer" target="_blank">
                <Icon dims='32' type='instagram' class="instagram"/>
            </a>
            <a href="https://www.facebook.com/profile.php?id=100000450630612" target="_blank">
                <Icon dims='32' type='facebook2' class="facebook"/>
            </a>
            <a href="https://github.com/veselinn16" target="_blank">
                <Icon dims='32' type='github' class="github"/>
            </a>
            <a href="https://www.linkedin.com/in/veselin-tonev-173b09152/" rel="nopener noreferrer" target="_blank">
                <Icon dims='32' type='linkedin' class="linkedin"/>
            </a>
            <p className="copyright">&copy; Veselin Tonev 2019</p>
        </footer>
        
    )
}

export default Social