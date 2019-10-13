import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, ModalBody, ModalHeader, Button, Row, Col } from 'reactstrap';
import csc from 'country-state-city';
import firebase from 'firebase';

import RegisterComponent from '../components/register';
import Loader from '../components/loader';
import Alert from '../components/alert';
import { SignupMethod, setUser } from '../actionMethods/authMethods';
import { enableLoading, disableLoading } from '../actionMethods/loadingMethods';
import { showAlertMethod } from '../actionMethods/alertMethods';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: '',
                name: '',
                password: '',
                cpassword: '',
                personal_info: '',
                profile: '',
                preferences: {}
            },
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

    handleChange = (e) => {
        const { name, value } = e.target;
        let { form, stateData, cityData } = this.state;
        if (name === 'country') {
            const parsedValue = JSON.parse(value);
            stateData = csc.getStatesOfCountry(parsedValue.id);
            form.preferences[name] = parsedValue.name
        } else if(name === 'state') {
            const parsedValue = JSON.parse(value);
            cityData = csc.getCitiesOfState(parsedValue.id);
            form.preferences[name] = parsedValue.name;
        } else if(name === 'city') {
            const parsedValue = JSON.parse(value);
            form.preferences[name] = parsedValue.name;
        } else {
            form[name] = value;
        }
        this.setState({ form, stateData, cityData });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { form } = this.state;
        const { showAlertMethod, SignupMethod, selectedType, allUserTypes } = this.props;
        let message = [];
        Object.keys(form).forEach(x => {
            if (!form[x] && x !== 'personal_info') {
                message.push(`${x} is required`);
            }
        });
        if(form.password !== form.cpassword){
            message.push('Password and Confirm Password are not same');
        }
        if(allUserTypes.find(x => x._id === selectedType).name === 'contractor') {
            if(Object.keys(form.preferences).length !== 3) {
                message.push('Please enter country, state and city.');
            }
        }
        form.type = selectedType;
        message.length ? showAlertMethod({header: 'registration validation', message}) : 
        SignupMethod(form);
    }

    uploadSuccess = (fileName) => {
        let { imageData, form } = this.state;
        imageData = {
            ...imageData,
            avtar: fileName,
        }
        this.setState({ imageData });
        firebase.storage().ref("Images").child(fileName).getDownloadURL().then(url => {
            this.setState({ imageData: { ...imageData, avatarURL: url }, form: { ...form, profile: fileName } });
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

    render() {
        const { form, countryData, stateData, cityData, imageData } = this.state;
        const { selectedType, loading, allUserTypes, setUser } = this.props;
        return (
            <div>
                <Modal isOpen={!selectedType}>
                    <ModalHeader>Please select a User type:</ModalHeader>
                    <ModalBody>
                        <div>
                            <Row>
                                {allUserTypes.map(x => <Col>
                                    <Button onClick={() => setUser(x._id)} outline color="primary">
                                        {x.name}
                                    </Button>
                                </Col>)}
                            </Row>
                        </div>
                    </ModalBody>
                </Modal>
                <Alert />
                {loading.value && <Loader />}
                <RegisterComponent
                    form={form}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    handleDropDown={this.handleDropDown}
                    countryData={countryData}
                    stateData={stateData}
                    cityData={cityData}
                    firebase={firebase}
                    handleProgress={this.handleProgress}
                    handleUploadSuccess={this.uploadSuccess}
                    handleUploadError={this.handleUploadError}
                    handleUploadStart={this.handleUploadStart}
                    avatarURL={imageData.avatarURL}
                    selectedType={selectedType && allUserTypes.find(x => x._id === selectedType).name}
                />
            </div>
        )
    }
}

const mapStateMapToProps = (state) => {
    return {
        selectedType: state.auth.selectedType,
        allUserTypes: state.auth.allUserTypes,
        loading: state.loading,
        alert: state.alert
    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
    SignupMethod,
    setUser,
    enableLoading,
    disableLoading,
    showAlertMethod
}, dispatch);
export default connect(mapStateMapToProps, mapDispatchToProps)(Register);