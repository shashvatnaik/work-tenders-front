import React from 'react';
import {Link} from 'react-router-dom';

import './sidebar.css';

const sidebarComponent = (props) => {
    const {user} = props;
    return (
        <React.Fragment>
            <ul className="nav flex-column">
                <li name="Home" className={props.active === 'Home' ? "nav-item active" : "nav-item active"}>
                    <Link className="nav-link" onClick={props.activeLink} name="Home" to="/"><i className="fa fa-home"/>
                        <span> Home </span>
                    </Link>
                </li>
            </ul>
        </React.Fragment>
    )
};

export default sidebarComponent;