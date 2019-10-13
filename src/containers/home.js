import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getAllTenders } from '../actionMethods/tenderMethods';
import TenderCard from '../components/tenderCard';
import Loader from '../components/loader';
import Alert from '../components/alert';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { getAllTenders } = this.props;
        getAllTenders();
    }

    render() {
        const { tenders, loading } = this.props;
        return (<React.Fragment>
            <Alert />
            {loading.value && <Loader />}
            <h3 className="primary-text page-title">Tenders:</h3>
            {tenders.map(x => <TenderCard
                title={x.title}
                description={x.description}
            />)}
        </React.Fragment>)
    }
}

const mapStateToProps = state => ({
    tenders: state.tenders,
    loading: state.loading,
    alert: state.alert
});
const mapDispatchToProps = dispatch => bindActionCreators({ getAllTenders }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);