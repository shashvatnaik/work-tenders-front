import React from 'react';
import { Input, Form, Label, FormGroup, Button, Row, Col } from 'reactstrap';
import FileUploader from 'react-firebase-file-uploader';

const Register = (props) => {
    const { handleChange,
        handleSubmit,
        form: { country },
        countryData,
        stateData,
        cityData,
        firebase,
        handleProgress,
        handleUploadSuccess,
        handleUploadError,
        handleUploadStart,
        avatarURL
    } = props;
    console.log('avtarurl in component:',avatarURL);
    return (<div className="paper margin-20">
        <h3 className="primary-text center-text"><Label>Register</Label></h3>
        <Form className="padding-20">
            <Row>
                <Col>
                    <FormGroup>
                        <Label className="primary-text">Email*</Label>
                        <Input name="email" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label className="primary-text">Name*</Label>
                        <Input name="name" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label className="primary-text">Password*</Label>
                        <Input name="password" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label className="primary-text">Confirm Password*</Label>
                        <Input name="cpassword" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label className="primary-text">Personal Info</Label>
                        <Input type="textarea" name="personal_info" onChange={handleChange} />
                    </FormGroup>
                </Col>
                <Col>
                    <Label className="primary-text">Upload Profile Picture</Label>
                    <img className="profileImage" src={avatarURL} />
                    <div />
                    <FileUploader
                        accept="image/*"
                        name="avatar"
                        randomizeFilename
                        storageRef={firebase.app().storage().ref('Images')}
                        onUploadStart={handleUploadStart}
                        onUploadError={handleUploadError}
                        onUploadSuccess={handleUploadSuccess}
                        onProgress={handleProgress}
                    />
                    <FormGroup>
                        <Label className="primary-text">Select Country</Label>
                        <Input onChange={handleChange} type="select" name="country" id="country">
                            <option default value={""}>Please Select A country</option>
                            {countryData.map(x => <option key={x.id} value={x}>{x.name}  </option>)}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label className="primary-text">Select State</Label>
                        <Input onChange={handleChange} type="select" name="state" id="state">
                            <option default value={""}>Please Select A State</option>
                            {stateData.map(x => <option  key={x.id} value={x}>{x.name}  </option>)}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label className="primary-text">Select City</Label>
                        <Input onChange={handleChange} type="select" name="city" id="city"  >
                            <option default value={""}>Please Select A City</option>
                            {cityData.map(x => <option  key={x.id} value={x}>{x.name}  </option>)}
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            <Button outline onClick={handleSubmit} color="success">Signup</Button> {' '}
            <Button outline color="danger">Back</Button>
        </Form>
    </div>);
}

export default Register;