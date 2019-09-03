import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import SidebarComponent from '../components/sidebar';

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarShow: true,
            activeLink: '',
            activeclass: `nav-item active`,
            expanded: false
        };
    }

    activeLink = (e) => {
        let target = e.target.name;
        this.setState({
            activeLink: target
        });
    };

    render() {
        return (
            <div className={"col-md-2 col-xs-12 sidebar bg-white hide"} id="sidebar-wrapper">
                <a className="pull-left show-menu" onClick={this.props.toggleSidebar}>
                  <i className="fa fa-bars fa-2x"/>
                </a>
                {/* <Link className="" to="/">
                    <img className="logo-sidebar img-responsive"
                         src="https://s3.ap-south-1.amazonaws.com/tenderwatch/logo3%401024.png" alt="Tender watch"
                         width="150"/>
                </Link> */}
                <div className="sidebar-sticky">
                    <SidebarComponent
                        {...this.props}
                        activeLink={this.activeLink}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
};

export default connect(mapStateToProps, null)(SideBar);