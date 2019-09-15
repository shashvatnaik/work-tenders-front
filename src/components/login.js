import React from 'react';
import { Input, Label, Button, Form, FormGroup, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loader from '../components/loader';
import Alert from '../components/alert';
import { signInMethod } from '../actionMethods/authMethods';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: '',
                password: ''
            }
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        const { form } = this.state;
        form[name] = value;
        this.setState({ form });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { form } = this.state;
        this.props.signInMethod(form);
    }

    typeHandler = (type) => () => {
        const { form } = this.state;
        form.type = type
        this.setState({ form });
    }

    render() {
        const { form, userType } = this.state;
        const { allUserTypes, loading } = this.props;
        return (<React.Fragment>
            <Alert />
            {loading.value && <Loader />}
            <div className="login-paper">
                <h4 className="primary-text">Login</h4>
                <Label>Select Type:</Label> {' '}
                <ButtonGroup>
                    {allUserTypes.map(x => <Button color="success" onClick={this.typeHandler(x._id)} active={form.type === x._id}>{x.name}</Button>)}
                </ButtonGroup>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label>Email:</Label>
                        <Input required type="email" name="email" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Password:</Label>
                        <Input required type="password" name="password" onChange={this.handleChange} />
                    </FormGroup>
                    <br />
                    <Button type="submit" value="submit" outline color="success">Sign In</Button>
                    <Link to="/register"><Button className="floatRight" outline color="danger">Register</Button></Link>
                </Form>
            </div>
        </React.Fragment>)
    }
}

const mapStateToProps = state => ({
    allUserTypes: state.auth.allUserTypes,
    loading: state.loading,
    alert: state.alert
});
const mapDispatchToProps = dispatch => bindActionCreators({
    signInMethod
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Login);