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

const config = {
    "type": "service_account",
    "project_id": "work-tenders",
    "private_key_id": "e6b14844179b8d11671babd955ac3a7ba014cc04",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDyJTLcuspXGK8q\nUHps/QJgyuU77Gh4O/1LtcY6vUqxLHHTwgDj9yEf2k2xbmsasaCXh52mOMH9fDVw\n5KE0xVHGJX/ARznuLd3GdgXz+vLTzMDTPaULb69KVoAk8e3AuHZ/+VwloZrgCSgk\n3ecJ8lWO18dYxLEj6J4lT05doP/BZLDgpdUS1M23nO/CHIAS1cSCyAChfz8+IDJO\n3wRmAILB5gIeOtnPG/xTTAlzCL+6bJX9xQ4zUXSt3QcdkO4lHz2qc7CgSkUvXzvu\nOZ5egCmDtCANQhS7GesuRKlLCp5/xmwAFmNIdDBaf5UJiQ4JYX0XP1JbxyTOKqG+\njigkP5rNAgMBAAECggEAF9H++eXKJ90+xgvar0QIatsqx8VO1Z0ZIsyD7p1Wbq1v\nmSQ5kDNsZ8TC5dR15s9Ye++UW5izxKrmWu+yyA0tKS/hLFoVYc/TREWx+jlSj/FR\nerZSuRhIhyiRPJEsEUxUI+y02uLV6HoeH9pQcxMKxZ2Gd74Jqv2kKQlvLRi8cBq1\nq2PnS/03SiWkM2DSdPoZ7G94NAoxXkuCB9GEtymweVOim9p/LOAuO8i4x8TFm6aB\n8HGMRrRxMNqQyoLbjugrQT+K0dStlzb9Yd28BYKiiZgPv66Eww+o1ygKv8mmy82V\nx/bLjv0DsCOsDF/Yv3hJIsFPyiEf/b1wtc1nz++cpQKBgQD52BpIClg+tNiqe9tE\nZ+tJT1SE1jY+KBiDwjwO6aMQ85QQSl3T9XDTb18gs6t3gc1swEn2ftYw4Tr83Ozh\naJiwdlWlObK3dSW19qGXNIZ4+qUkOCYe0J6q39i9qlE+Bz4H+bUZguoDmyC5lqiV\nxg0ZFFVkl8ozTrNIqHdh21kLPwKBgQD4HIkPzBHZ4uxcvcazFCklIa+To3tMbub9\nKLVcx6z+sM/7TGnyYNyNeRyTl99P6Gf7k9PFxsxagDQ4gn3EoqWEh9SpJbp68xqR\nF1seqV+ef6nfXyoombzQS9heJ1HVeTFTpKysdKGJQxGoGpv3yzXe3hYaQtwZh4KH\nI20n1bCS8wKBgQDXRkoW6rrwhPjvpLrgrT4Bs9Yag0zHr9q3pOQE4XE9CPP6OWmx\nWZl2xU7NKaLD3Vc4rlLMjqtWAKvH90AwVOTDn6LaM+X2x3zP1guT8pEvqqAinjLS\neGVOzIO/oQJRlQHw80sFCVVD+CVxZAwsyTK9+lQ90cBLBzPZljcPXWXTFwKBgQCo\nkzrM8OpwEC5oFMkcg2YxRGH2/eyYUgG/oBkZoNF5esjVBWY2uHkh5lf0MAwaTt3X\noOkSR7AxDUpt2rt5DslG8sMa6fd58hLq4eOXQZ0mI7dXfWE3lL0lCWNJFY4UbPOG\n0SxBQD1A9cDZZrrx8a/4bQy3axYAgoG9L+TKW/ZM4QKBgQCt91PPZT8D2rW8LksJ\nUG7UfVKeCgp9hkbBmhx3nTfmc2a2yGhErP7FxpZAzklbfgmpqyQUeHNdIXWR9utm\nvr6M/pC6TrY2eaupXvgYEXQ4GyNy0BiXUrMXnT4DbkndJ4f5Wea2bwb1tewPjiDO\nAQA4atX7plc0J9isbDzCi7ngFQ==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-kylrh@work-tenders.iam.gserviceaccount.com",
    "client_id": "103467270193502428241",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-kylrh%40work-tenders.iam.gserviceaccount.com",
    "storageBucket": "work-tenders.appspot.com"
};
firebase.initializeApp(config);

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