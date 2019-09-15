import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logoutMethod } from '../actionMethods/authMethods';

import './sidebar.css';

const sidebarComponent = (props) => {
    const { user, logoutMethod } = props;
    return (
        <React.Fragment>
            <ul className="nav flex-column">
                <li name="Home" className={props.active === 'Home' ? "nav-item active" : "nav-item active"}>
                    <Link className="nav-link" onClick={props.activeLink} name="Home" to="/"><i className="fa fa-home" />
                        {' '}<span> Home </span>
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" onClick={(e) => { props.activeLink(e); logoutMethod() }} name="Home" to="/"><i className="fa fa-sign-out" />
                        {' '}<span> Log Out </span>
                    </Link>
                </li>
            </ul>
        </React.Fragment>
    )
};

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({ logoutMethod }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(sidebarComponent);