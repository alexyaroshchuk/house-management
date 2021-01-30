import React from 'react';
import { Switch as SwitchAnt } from 'antd';
import propTypes from 'prop-types';

import './Switch.scss';

const Switch = (props) => {
    return (
        <SwitchAnt checkedChildren="On" unCheckedChildren="Off" {...props} />
    );
};

Switch.defaultProps = {
    checked: false,
    onChange: () => {},
};

Switch.propTypes = {
    checked: propTypes.bool.isRequired,
    onChange: propTypes.func.isRequired,
};

export default Switch;
