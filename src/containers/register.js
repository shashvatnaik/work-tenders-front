import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import RegisterComponent from '../components/register';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return(
            <div>
                <RegisterComponent />
            </div>
        )
    }
}

const mapStateMapToProps = (state) => {
    return {

    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateMapToProps, mapDispatchToProps)(Register);