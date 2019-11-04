import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import csc from 'country-state-city';
import firebase from 'firebase';

import Loader from '../components/loader';
import Alert from '../components/alert';
import { enableLoading, disableLoading } from '../actionMethods/loadingMethods';
import { showAlertMethod } from '../actionMethods/alertMethods';
import CreateTenderComponent from '../components/createTender';
import { getCategoriesMethod } from '../actionMethods/getDataMethods';
import { addTenderMethod } from '../actionMethods/tenderMethods';

class CreateTender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {},
            countries: []
        };
    }

    componentDidMount() {
        const { getCategoriesMethod } = this.props;
        getCategoriesMethod();
        this.setState({ countries: csc.getAllCountries() });
    }

    changeHandler = name => event => {
        let { form, states, cities } = this.state;
        if (name === 'country') {
            const parsedCountry = JSON.parse(event.target.value);
            form[name] = parsedCountry.name;
            states = csc.getStatesOfCountry(parsedCountry.id);
        } else if (name === 'state') {
            const parsedState = JSON.parse(event.target.value);
            form[name] = parsedState.name;
            cities = csc.getCitiesOfState(parsedState.id);
        } else {
            form[name] = event.target.value;
        }
        this.setState({ form, states, cities });
    }

    uploadSuccess = (fileName) => {
        let { imageData, form } = this.state;
        imageData = {
            ...imageData,
            avtar: fileName,
        }
        this.setState({ imageData });
        firebase.storage().ref("TenderImages").child(fileName).getDownloadURL().then(url => {
            console.log({ url });
            this.setState({ imageData: { ...imageData, avatarURL: url }, form: { ...form, picture: fileName } });
            this.props.disableLoading();
        });

    };

    handleUploadError = error => {
        this.props.disableLoading();
        console.error(error);
    };

    handleUploadStart = () => {
        this.props.enableLoading();
    }

    handleSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        console.log(this.state.form);
        this.props.addTenderMethod(this.state.form, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { form, countries, states, cities, imageData } = this.state;
        const { formData, loading } = this.props;
        return (<React.Fragment>
            <Alert />
            {loading.value && <Loader />}
            <CreateTenderComponent
                changeHandler={this.changeHandler}
                form={form}
                formData={formData}
                countries={countries}
                states={states}
                cities={cities}
                imageHandler={this.imageHandler}
                imageData={imageData}
                handleSubmit={this.handleSubmit}
                fileUploaderProps={
                    {
                        onProgress: this.handleProgress,
                        onUploadError: this.handleUploadError,
                        onUploadStart: this.handleUploadStart,
                        onUploadSuccess: this.uploadSuccess,
                        accept: "image/*",
                        name: "avatar",
                        randomizeFilename: true,
                        storageRef: firebase.app().storage().ref('TenderImages')
                    }
                }
            />
        </React.Fragment>)
    }
}

const mapStateToProps = state => ({
    formData: state.formData,
    loading: state.loading,
    alert: state.alert
});
const mapDispatchToProps = dispatch => bindActionCreators({
    getCategoriesMethod,
    enableLoading,
    disableLoading,
    showAlertMethod,
    addTenderMethod
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CreateTender);