import React from 'react';
import { Popconfirm as PopconfirmAnt } from 'antd';
import propTypes from 'prop-types';

import './Popconfirm.scss';

const Popconfirm = (props) => {
    const { children, ...args } = props;

    return <PopconfirmAnt {...args}>{children}</PopconfirmAnt>;
};

Popconfirm.defaultProps = {
    title: '',
    onConfirm: () => {},
};

Popconfirm.propTypes = {
    title: propTypes.string.isRequired,
    onConfirm: propTypes.func.isRequired,
};

export default Popconfirm;
