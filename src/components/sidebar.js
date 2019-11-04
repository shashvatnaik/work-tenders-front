import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logoutMethod } from '../actionMethods/authMethods';

import './sidebar.css';

const ClientOptions = (props) => {
    return <React.Fragment>
        <li name="Home" className={props.active === 'Home' ? "nav-item active" : "nav-item active"}>
            <Link className="nav-link" onClick={props.activeLink} name="Home" to="/createtender"><i className="fa fa-edit" />
                {' '}<span> Create Tender </span>
            </Link>
        </li>
        <li name="Bids" className={props.active === 'Bids' ? "nav-item active" : "nav-item active"}>
            <Link className="nav-link" onClick={props.activeLink} name="Bids" to="/bids"><i className="fas fa-file-contract" />
                {' '}<span> Bids </span>
            </Link>
        </li>
    </React.Fragment>
}

const ContractorOptions = (props) => {
    return <React.Fragment>
        <li name="Bids" className={props.active === 'Bids' ? "nav-item active" : "nav-item active"}>
            <Link className="nav-link" onClick={props.activeLink} name="Bids" to="/bids"><i className="fas fa-file-contract" />
                {' '}<span> My Bids </span>
            </Link>
        </li>
    </React.Fragment>
}

const sidebarComponent = (props) => {
    const { user, logoutMethod, allUserTypes } = props;
    return (
        <React.Fragment>
            <ul className="nav flex-column">
                <li name="Home" className={props.active === 'Home' ? "nav-item active" : "nav-item active"}>
                    <Link className="nav-link" onClick={props.activeLink} name="Home" to="/"><i className="fa fa-home" />
                        {' '}<span> Home </span>
                    </Link>
                </li>
                {allUserTypes.length && allUserTypes.find(x => x._id === user.type).name === 'customer' ? <ClientOptions props={props} /> : <ContractorOptions />}
                {/* <li name="Messages" className={props.active === 'Messages' ? "nav-item active" : "nav-item active"}>
                    <Link className="nav-link" onClick={props.activeLink} name="Messages" to="/messages"><i className="fas fa-envelope" />
                        {' '}<span> Messages </span>
                    </Link>
                </li> */}
                <li name="Profile" className={props.active === 'Profile' ? "nav-item active" : "nav-item active"}>
                    <Link className="nav-link" onClick={props.activeLink} name="Profile" to="/profile"><i className="fas fa-user" />
                        {' '}<span> Profile </span>
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

const mapStateToProps = state => ({ user: state.auth.user, allUserTypes: state.auth.allUserTypes });
const mapDispatchToProps = dispatch => bindActionCreators({ logoutMethod }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(sidebarComponent);