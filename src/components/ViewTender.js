import React from 'react';
import { Row, Col, Label, Button } from 'reactstrap';
import {Link} from 'react-router-dom';

import defaultImage from '../images/default.png';

export default (props) => {
    const { tender, toggleMode, contractor, deleteTender, goBack } = props;
    return tender ? (
        <div className="paper fixedHeight primary-text">
            <h3>Tender Details:</h3>
            <Row>
                <Col sm={{ size: 'auto', offset: 6 }} md={{ size: 'auto', offset: 10 }}>
                    {contractor ? <Button color="success"><Link className="link-black" to={`/${tender._id}/createBid`}>Place a Bid</Link></Button> : <React.Fragment>
                    <Button color="info" onClick={toggleMode}>Edit</Button>{" "}
                    <Button color="danger" onClick={() => {deleteTender(tender._id, goBack)}}>Delete</Button> {" "}
                    </React.Fragment>}
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5>Tender Name : </h5>
                    <Label>{tender.title}</Label>
                    <h5>Tender Description : </h5>
                    <Label>{tender.description}</Label>
                    <h5>Tender Category : </h5>
                    <Label>{tender.category.name}</Label>
                    <h5>Tender Country : </h5>
                    <Label>{tender.location.country}</Label>
                    <h5>Tender State : </h5>
                    <Label>{tender.location.state}</Label>
                    <h5>Tender City : </h5>
                    <Label>{tender.location.city}</Label>
                    <br />
                </Col>
                <Col>
                    <h5>Tender Image : </h5>
                    <img src={tender && tender.imageUrl ? tender.imageUrl : defaultImage} className="tenderImage" alt="tender" />
                </Col>
                <Col>
                    <h3>Tender Created By : </h3>
                    <h5>Name:</h5>
                    <Label>{tender.createdBy.name}</Label>
                    <h5>Email:</h5>
                    <Label>{tender.createdBy.email}</Label>
                    <h5>About:</h5>
                    <Label>{tender.createdBy.about}</Label>
                </Col>
            </Row>
        </div>
    ) : ("")
}