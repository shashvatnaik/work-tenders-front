import React from 'react';
import { Row, Col, Label, Input, FormGroup } from 'reactstrap';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';

import userDefault from '../images/user-default.png';

export default (props) => {
    const { user: { name, email, about, profileUrl, preferences }, disabledControls, changeHandler, countryData, stateData, cityData } = props;
    return (
        <div className="paper paper-height">
            <form>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label >Name</Label>
                            <Input value={name} disabled={disabledControls} name="name" onChange={changeHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label >Email</Label>
                            <Input disabled={disabledControls} value={email} name="email" onChange={changeHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label className="primary-text">Personal Info</Label>
                            <Input disabled={disabledControls} type="textarea" name="personal_info" rows={5} value={about} onChange={changeHandler} />
                        </FormGroup>
                        {/* {preferences && preferences.length && Object.keys(preferences[0]).length ? <React.Fragment>
                            <FormGroup>
                                <Label className="primary-text">Select Country</Label>
                                <Input value={preferences[0].country} onChange={changeHandler} type="select" name="country" id="country">
                                    <option default value={""}>Please Select A country</option>
                                    {countryData.map(x => <option key={x.id} value={JSON.stringify(x)}>{x.name}  </option>)}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label className="primary-text">Select State</Label>
                                <Input value={preferences[0].state} onChange={changeHandler} type="select" name="state" id="state">
                                    <option default value={""}>Please Select A State</option>
                                    {stateData.map(x => <option key={x.id} value={JSON.stringify(x)}>{x.name}  </option>)}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label className="primary-text">Select City</Label>
                                <Input onChange={changeHandler} value={preferences[0].city} type="select" name="city" id="city"  >
                                    <option default value={""}>Please Select A City</option>
                                    {cityData.map(x => <option key={x.id} value={JSON.stringify(x)}>{x.name}  </option>)}
                                </Input>
                            </FormGroup>
                        </React.Fragment> : ''} */}
                    </Col>
                    <Col>
                        <img className="profile-picture" src={profileUrl || userDefault} alt={name} />
                        {/* <FileUploader /> */}
                    </Col>
                </Row>
            </form>
        </div>
    )
}