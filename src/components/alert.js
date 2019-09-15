import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { removeAlertMethod } from '../actionMethods/alertMethods';

const Alert = (props) => {
    const { alert, removeAlertMethod } = props;
    return (
        <Modal isOpen={alert.message.length}>
            <ModalHeader>
                {alert.header}
            </ModalHeader>
            <ModalBody>
                {alert.message.length && alert.message.map(x => <React.Fragment>{x}<br/></React.Fragment>)}
            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={removeAlertMethod}>OK</Button>
            </ModalFooter>
        </Modal>
    );
}

const mapStateToProps = state => {
    return {
        alert: state.alert
    }
}
const mapDispatchToProps = dispatch => bindActionCreators({ removeAlertMethod }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Alert);