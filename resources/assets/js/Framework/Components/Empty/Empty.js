import React from 'react';
import { Empty as EmptyAnt } from 'antd';
import propTypes from 'prop-types';

import './Empty.scss';

const Empty = (props) => {
    const { children, ...args } = props;

    return <EmptyAnt {...args}>{children}</EmptyAnt>;
};

Empty.defaultProps = {
    description: '',
};

Empty.propTypes = {
    description: propTypes.oneOfType([propTypes.string, propTypes.element]),
};

export default Empty;
