import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loader from '../components/loader';
import Alert from '../components/alert';
import BidCard from '../components/bidsCard';
import { getBids, deleteBid } from '../actionMethods/bidsMethods';

class Bids extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
        const { getBids, allUserTypes, user } = this.props;
        getBids(allUserTypes.length && allUserTypes.find(x => x._id === user.type).name);
    }

    deleteHandler = (bidId) => () => {
        const { deleteBid } = this.props;
        deleteBid(bidId);
    }

    render() {
        const { loading, bids, user, allUserTypes } = this.props;
        const userType = allUserTypes && allUserTypes.find(x => x._id === user.type);
        return (<React.Fragment>
            <Alert />
            {loading.value && <Loader />}
            {bids && bids.length ? bids.map((bid) => {
                return (<BidCard bid={bid} deleteHandler={this.deleteHandler} userType={userType && userType.name} />)
            }) : ''}
        </React.Fragment>)
    }
}

const mapStateMapToProps = (state) => {
    return {
        loading: state.loading,
        alert: state.alert,
        bids: state.bids,
        allUserTypes: state.auth.allUserTypes,
        user: state.auth.user
    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getBids,
    deleteBid
}, dispatch);
export default connect(mapStateMapToProps, mapDispatchToProps)(Bids);