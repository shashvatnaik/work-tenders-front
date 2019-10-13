import React from 'react';
import { Row, Col } from 'reactstrap';

import defaultImage from '../images/default.png';

export default (props) => {
    const { title, description, imageSrc } = props;
    return (<div className="tenderCard">
        <Row>
            <Col md={2} sm={2}>
                <img src={imageSrc || defaultImage} alt={title} />
            </Col>
            <Col md={10} sm={10}>
                <h4>{title}</h4>
                <p>{description}</p>
            </Col>
        </Row>
    </div>)
}