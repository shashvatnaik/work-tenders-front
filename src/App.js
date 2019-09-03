import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './App.css';
import Navbar from './components/navbar';
import Sidebar from './containers/sidebar';
import Login from './components/login';
import Register from './containers/register';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const PublicRoute = ({ component: Component, ...rest }) => {
      return (
        <Route {...rest} render={(routeProps) => (
          !this.props.user ? <React.Fragment><Sidebar /><Navbar /><Component {...routeProps} /></React.Fragment> :
            <Redirect to='/' />)} />
      )
    }

    const PrivateRoute = ({ component: Component, ...rest }) => {
      return (
        <Route {...rest} render={(routeProps) => (
          !this.props.user ? <React.Fragment><Sidebar /> <div><Navbar /><Component {...routeProps} /></div></React.Fragment> :
            <Redirect to='/' />)} />
      )
    }
    return (
      <Switch>
        <PublicRoute exact path='/' component={Login} />
        <PublicRoute exact path='/register' component={Register} />
        <PrivateRoute exact path='/home' component={Login} />
      </Switch>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
