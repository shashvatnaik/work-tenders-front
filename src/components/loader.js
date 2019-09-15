import React from 'react';
import {Spinner} from 'reactstrap';

export default () => {
    return <div className="loader">
            {/* <Spinner type="grow" color="primary" />
            <Spinner type="grow" color="secondary" />
            <Spinner type="grow" color="success" />
            <Spinner type="grow" color="danger" />
            <Spinner type="grow" color="warning" />
            <Spinner type="grow" color="info" /> */}
            <Spinner style={{ width: '3rem', height: '3rem' }} color="success" />{' '}
        </div>
}