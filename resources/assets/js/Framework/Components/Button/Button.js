import React from 'react';
import { Button as ButtonAnt } from 'antd';
import propTypes from 'prop-types';

import './Button.scss';

const Button = (props) => {
    const { children } = props;

    return <ButtonAnt {...props}>{children}</ButtonAnt>;
};

Button.propTypes = {
    type: propTypes.string,
    htmlType: propTypes.string,
    className: propTypes.string,
    children: propTypes.string,
    onClick: propTypes.func,
    icon: propTypes.element,
};

export default Button;
