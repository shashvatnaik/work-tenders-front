import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './App.css';
import Navbar from './components/navbar';
import Sidebar from './containers/sidebar';
import Login from './components/login';
import Register from './containers/register';
import Home from './containers/home';

import {getTypes} from './actionMethods/authMethods';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.getTypes();
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
              <Navbar />  
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
      </Switch>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({getTypes}, dispatch);
const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
