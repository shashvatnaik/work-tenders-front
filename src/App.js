import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import firebase from 'firebase';

import './App.css';
import Navbar from './components/navbar';
import Sidebar from './containers/sidebar';
import Login from './components/login';
import Register from './containers/register';
import Home from './containers/home';
import CreateTender from './containers/createTender';
import Profile from './containers/profile';
import Tender from './containers/tender';

import { getTypes, editUserLocalMethod } from './actionMethods/authMethods';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.getTypes();
  }

  componentDidUpdate() {
    const { user, editUserLocalMethod } = this.props;
    if (user && user.profile && !user.profileUrl) {
      console.log(user.profile);
      firebase.storage().ref("Images").child(user.profile).getDownloadURL().then(url => {
        user.profileUrl = url;
        editUserLocalMethod(user);
      }).catch(error => {
        console.log(error);
      });
    }
  }

  render() {
    const PublicRoute = ({ component: Component, ...rest }) => {
      return (
        <Route {...rest} render={(routeProps) => (
          !this.props.user ? <div className="app-wrapper">
            <Navbar />
            <Component {...routeProps} />
          </div > :
            <Redirect to='/' />)
        } />
      )
    }

    const PrivateRoute = ({ component: Component, ...rest }) => {
      return (
        <Route {...rest} render={(routeProps) => (
          this.props.user ? <div className="app-wrapper">
            <Sidebar />
            <div className="sidebar-open-body">
              <Navbar user={this.props.user} />
              <Component {...routeProps} />
            </div>
          </div> :
            <Redirect to='/login' />)} />
      )
    }
    return (
      <Switch>
        <PublicRoute exact path='/login' component={Login} />
        <PublicRoute exact path='/register' component={Register} />
        <PrivateRoute exact path='/' component={Home} />
        <PrivateRoute exact path='/createtender' component={CreateTender} />
        <PrivateRoute exact path='/profile' component={Profile} />
        <PrivateRoute exact path="/tender/:tenderId" component={Tender} />
      </Switch>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ getTypes, editUserLocalMethod }, dispatch);
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    allUserTypes: state.auth.allUserTypes
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
