import React from 'react';
import { Table } from 'antd';
import propTypes from 'prop-types';
import { get } from 'lodash';

import './Table.scss';

const TableDefault = (props) => {
    const { data, loading, className } = props;

    const dataSource = data.map((item, index) => {
        return { ...item, key: get(item, 'id', index) };
    });

    return (
        <Table
            pagination={false}
            {...props}
            dataSource={dataSource}
            loading={loading}
            className={className}
        />
    );
};

TableDefault.defaultProps = {
    data: [],
};

TableDefault.propTypes = {
    data: propTypes.array.isRequired,
};

export default TableDefault;
