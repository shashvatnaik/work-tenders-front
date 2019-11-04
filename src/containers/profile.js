import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import csc from 'country-state-city';

import Loader from '../components/loader';
import Alert from '../components/alert';
import ProfileComponent from '../components/profile';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {...props.user},
            countryData: csc.getAllCountries() || [],
            stateData: [],
            cityData: [],
            imageData: {
                username: "",
                avatar: "",
                avatarURL: ""
            }
        };
    }

    handleChange = () => {}

    handleSubmit = () => {}

    handleDropDown = () => {}

    render() {
        const { loading, user, allUserTypes } = this.props;
        const { countryData, stateData, cityData, form } = this.state;
        const userType = allUserTypes.length ? allUserTypes.find(x => x._id === user._id) : {};
        return (
            <React.Fragment>
                <Alert />
                {loading.value && <Loader />}
                <ProfileComponent
                    disabledControls
                    userType={userType}
                    user={user}
                    countryData={countryData}
                    stateData={stateData}
                    cityData={cityData}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    loading: state.loading,
    alert: state.alert,
    allUserTypes: state.auth.allUserTypes
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Profile);