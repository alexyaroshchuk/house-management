import React from 'react';
import { PageHeader as PageHeaderAnt } from 'antd';
import propTypes from 'prop-types';

import './PageHeader.scss';

const PageHeader = (props) => {
    const { children, ...antProps } = props;

    return <PageHeaderAnt {...antProps}>{children}</PageHeaderAnt>;
};

PageHeader.defaultProps = {
    title: '',
    onBack: () => {},
    extra: [],
};

PageHeader.propTypes = {
    title: propTypes.string.isRequired,
    onBack: propTypes.oneOfType([propTypes.func, propTypes.bool]),
    extra: propTypes.arrayOf(propTypes.element),
};

export default PageHeader;
