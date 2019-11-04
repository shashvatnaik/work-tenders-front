import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import csc from 'country-state-city';
import firebase from 'firebase';

import { getOneTender } from '../actionMethods/tenderMethods';
import { getCategoriesMethod } from '../actionMethods/getDataMethods';
import { enableLoading, disableLoading } from '../actionMethods/loadingMethods';
import Loader from '../components/loader';
import Alert from '../components/alert';
import ViewTender from '../components/ViewTender';
import EditTender from '../components/createTender';

class Tender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tenderId: props.match.params.tenderId.trim(),
            mode: false,
            form: {},
            countries: []
        }
    }

    componentDidMount() {
        const { allTenders, getOneTender, getCategoriesMethod } = this.props;
        getCategoriesMethod();
        if (!allTenders.length) {
            getOneTender(this.state.tenderId, (tender) => {
                this.setState({ form: { ...tender }, imageData: {avatarURL: tender.imageUrl}, countries: csc.getAllCountries() });
            });
        }
    }
    handleUploadError = error => {
        this.props.disableLoading();
        console.error(error);
    };

    handleUploadStart = () => {
        this.props.enableLoading();
    }

    toggleMode = () => {
        let tender = {};
        debugger;
        if (!this.state.mode) {
            tender = this.props.allTenders.find(tender => tender._id === this.state.tenderId);
        }
        debugger;
        this.setState({ mode: !this.state.mode, form: tender, imageData: {avatarURL: tender.imageUrl} });
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

    handleSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        console.log(this.state.form);
        this.props.addTenderMethod(this.state.form, () => {
            this.toggleMode();
        });
    }

    render() {
        const { tenderId, mode, form, countries, states, cities, imageData } = this.state;
        const { loading, allTenders, allCategories } = this.props;
        const tender = allTenders.find(tender => tender._id === tenderId);
        return (
            <React.Fragment>
                <Alert />
                {loading.value && <Loader />}
                {mode ? <EditTender
                    toggleMode={this.toggleMode}
                    changeHandler={this.changeHandler}
                    formData={{ allCategories }}
                    form={form}
                    edit
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
                /> :
                    <ViewTender
                        tender={tender}
                        toggleMode={this.toggleMode}
                    />
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.loading,
    alert: state.alert,
    allTenders: state.tenders,
    allCategories: state.formData.allCategories
});
const mapDispatchToProps = dispatch => bindActionCreators({
    getOneTender,
    getCategoriesMethod,
    enableLoading,
    disableLoading,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Tender);