import React from 'react';
import { Checkbox as CheckboxAnt } from 'antd';
import propTypes from 'prop-types';

import './Checkbox.scss';

const Checkbox = (props) => {
    const { children } = props;

    return <CheckboxAnt {...props}>{children}</CheckboxAnt>;
};

Checkbox.defaultProps = {
    onChange: () => {},
};

Checkbox.propTypes = {
    autoFocus: propTypes.bool,
    checked: propTypes.bool,
    defaultChecked: propTypes.bool,
    disabled: propTypes.bool,
    indeterminate: propTypes.bool,
    onChange: propTypes.func.isRequired,
};

export default Checkbox;
