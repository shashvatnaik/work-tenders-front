import React from 'react';
import { Input, Form, Label, FormGroup, Button, Row, Col } from 'reactstrap';
import FileUploader from 'react-firebase-file-uploader';
import {Link} from 'react-router-dom';

import userDefault from '../images/user-default.png';

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
        avatarURL,
        selectedType
    } = props;
    return (<div className="paper margin-20">
        <Form className="padding-20" onSubmit={handleSubmit}>
        <h3 className="primary-text"><Label>Register</Label></h3>
            <Row>
                <Col>
                    <FormGroup>
                        <Label className="primary-text" color="text-success">Email*</Label>
                        <Input type="email" name="email" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label className="primary-text">Name*</Label>
                        <Input name="name" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label className="primary-text">Password*</Label>
                        <Input type="password" name="password" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label className="primary-text">Confirm Password*</Label>
                        <Input type="password" name="cpassword" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label className="primary-text">Personal Info</Label>
                        <Input type="textarea" name="personal_info" onChange={handleChange} />
                    </FormGroup>
                </Col>
                <Col>
                    <Label className="primary-text">Upload Profile Picture</Label>
                    <div />
                    <img alt="profile" className="profileImage" src={avatarURL || userDefault} />
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
                    {selectedType === 'contractor' &&
                        <React.Fragment>
                            <FormGroup>
                                <Label className="primary-text">Select Country</Label>
                                <Input onChange={handleChange} type="select" name="country" id="country">
                                    <option default value={""}>Please Select A country</option>
                                    {countryData.map(x => <option key={x.id} value={JSON.stringify(x)}>{x.name}  </option>)}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label className="primary-text">Select State</Label>
                                <Input onChange={handleChange} type="select" name="state" id="state">
                                    <option default value={""}>Please Select A State</option>
                                    {stateData.map(x => <option key={x.id} value={JSON.stringify(x)}>{x.name}  </option>)}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label className="primary-text">Select City</Label>
                                <Input onChange={handleChange} type="select" name="city" id="city">
                                    <option default value={""}>Please Select A City</option>
                                    {cityData.map(x => <option key={x.id} value={JSON.stringify(x)}>{x.name}  </option>)}
                                </Input>
                            </FormGroup>
                        </React.Fragment>
                    }
                </Col>
            </Row>
            <Button type="submit" value="submit" outline color="success">Signup</Button> {' '}
            <Link to="/"><Button outline color="danger">Back</Button></Link>
        </Form>
    </div>);
}

export default Register;