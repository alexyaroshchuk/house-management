import React from 'react';
import { Alert as AlertAnt } from 'antd';
import propTypes from 'prop-types';

import './Alert.scss';

const Alert = (props) => {
    return <AlertAnt {...props} />;
};

Alert.defaultProps = {
    message: '',
    type: '',
    showIcon: true,
};

Alert.propTypes = {
    message: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    showIcon: propTypes.bool.isRequired,
};

export default Alert;
