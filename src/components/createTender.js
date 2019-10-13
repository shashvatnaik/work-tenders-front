import React from 'react';
import { Form, Input, FormGroup, Label, Row, Col, Button } from 'reactstrap';
import FileUploader from 'react-firebase-file-uploader';

import defaultImage from '../images/default.png';

const CreateTender = (props) => {
    const { changeHandler, form, formData, countries, states, cities, fileUploaderProps, imageData, handleSubmit } = props;
    return (<React.Fragment>
        <div className="paper fixedHeight primary-text">
            <h4>Create A Tender</h4>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label>Enter Title of Tender</Label>
                            <Input required onChange={changeHandler('title')} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Enter Details of Tender</Label>
                            <Input required onChange={changeHandler('description')} type="textarea" rows="5" cols="6" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Enter Category of Tender</Label>
                            <Input required type="select" onChange={changeHandler('category')} >
                                <option value="">Please select a category</option>
                                {formData.allCategories && formData.allCategories.map(x => <option value={x._id}>{x.name}</option>)}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Enter Country of Tender</Label>
                            <Input required type="select" onChange={changeHandler('country')}>
                                <option value="">please select a country</option>
                                {countries && countries.length && countries.map(x => <option value={JSON.stringify(x)}>{x.name}</option>)}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Enter State</Label>
                            <Input required disabled={!form.country} type="select" onChange={changeHandler('state')}>
                                <option value="">please select state</option>
                                {states && states.length && states.map(x => <option value={JSON.stringify(x)}>{x.name}</option>)}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Enter City</Label>
                            <Input required disabled={!form.state} type="select" onChange={changeHandler('city')}>
                                <option value="">please select city</option>
                                {cities && cities.length && cities.map(x => <option value={x.name}>{x.name}</option>)}
                            </Input>
                        </FormGroup>
                        <Button outline type="submit" color="success" value="submit">
                            Submit Tender
                        </Button>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Please select an appropriate image for tender</Label>
                            <img src={imageData && imageData.avatarURL ? imageData.avatarURL : defaultImage} className="tenderImage" alt="tender" />
                            <FileUploader {...fileUploaderProps} />
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </div>
    </React.Fragment>)
}

export default CreateTender;