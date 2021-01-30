import React from 'react';
import { Pagination } from 'antd';
import propTypes from 'prop-types';

import './Pagination.scss';

const PaginationDefault = (props) => {
    return <Pagination {...props} />;
};

PaginationDefault.defaultProps = {
    defaultCurrent: 1,
    total: 50,
};

PaginationDefault.propTypes = {
    defaultCurrent: propTypes.number.isRequired,
    total: propTypes.number.isRequired,
};

export default PaginationDefault;
