import React from 'react';
import { Input, Form, Label, FormGroup, Button } from 'reactstrap';

export default (props) => {
    const { changeHandler, handleSubmit, handleCancel } = props;
    return (<div className="paper margin-20 paper-height">
        <Form className="padding-20" onSubmit={handleSubmit}>
            <h3 className="primary-text"><Label>Create A Bid</Label></h3>
            <FormGroup>
                <Label>Title</Label>
                <Input name="title" onChange={changeHandler} />
            </FormGroup>
            <FormGroup>
                <Label>Description</Label>
                <Input type="textarea" rows="12" cols="4" name="description" onChange={changeHandler} />
            </FormGroup>
            <FormGroup>
                <Label>Estimated Amount</Label>
                <Input type="number" name="estimatedAmount" onChange={changeHandler} />
            </FormGroup>
            <Button color="success" type="submit" value="submit">Submit</Button>
            <Button color="danger" className="floatRight" onClick={handleCancel}>Cancel</Button>
        </Form>
    </div>);
}