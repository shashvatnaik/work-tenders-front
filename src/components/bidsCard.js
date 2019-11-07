import React from 'react';
import { Label, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default (props) => {
    const { bid, deleteHandler, userType } = props;
    return (<div className="paper paper-height">
        <Label><b>Title:</b> {bid.title}</Label><br />
        <Label><b>Description:</b> {bid.description}</Label><br />
        <Label><b>Estimated Amount:</b> {bid.estimatedAmount}</Label><br />
        <Link to={`/tender/${bid.tenderId}`}><Button color="success">Show Tender</Button></Link>
        {userType === 'contractor' && <Button color="danger" className="floatRight" onClick={deleteHandler(bid._id)}>Delete Tender</Button>}
    </div>)
}