import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './App.css';
import Navbar from './components/navbar';
import Sidebar from './containers/sidebar';
import Login from './components/login';
import Register from './containers/register';
import Loader from './components/loader';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {loading} = this.props;
    const PublicRoute = ({ component: Component, ...rest }) => {
      return (
        <Route {...rest} render={(routeProps) => (
          !this.props.user ? <div className="app-wrapper">
              <Navbar />
              {/* {loading.value && <Loader />} */}
              <Component {...routeProps} />
          </div > :
            <Redirect to='/' />)
        } />
      )
    }

    const PrivateRoute = ({ component: Component, ...rest }) => {
      return (
        <Route {...rest} render={(routeProps) => (
          !this.props.user ? <div className="app-wrapper">
            <Sidebar />
            <div className="sidebar-open-body">
              <Navbar />
              {loading.value && <Loader />}
              <Component {...routeProps} />
            </div>
          </div> :
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
    user: state.auth.user,
    loading: state.loading
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
