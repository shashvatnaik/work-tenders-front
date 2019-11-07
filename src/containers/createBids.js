import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loader from '../components/loader';
import Alert from '../components/alert';
import BidForm from '../components/bidForm';
import { addBid } from '../actionMethods/bidsMethods';

class CreateBids extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                tenderId: props.match.params.tenderId.trim()
            }
        }
    }

    handleCancel = () => {
        const { history } = this.props;
        history.goBack();
    }

    changeHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const { form } = this.state;
        form[event.target.name] = event.target.value;
        this.setState({ form });
    }

    handleSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        const { form } = this.state;
        const { addBid, history: { goBack } } = this.props;
        addBid(form, goBack);
    }

    render() {
        const { loading } = this.props;
        return (<React.Fragment>
            <Alert />
            {loading.value && <Loader />}
            <BidForm
                handleCancel={this.handleCancel}
                changeHandler={this.changeHandler}
                handleSubmit={this.handleSubmit}
            />
        </React.Fragment>)
    }
}

const mapStateMapToProps = (state) => {
    return {
        loading: state.loading,
        alert: state.alert
    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
    addBid
}, dispatch);
export default connect(mapStateMapToProps, mapDispatchToProps)(CreateBids);