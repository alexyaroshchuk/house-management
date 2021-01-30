import React from 'react';
import { Link } from 'react-router-dom';

import './MainContractsTable.scss';
import Table from '@Components/Table/Table';
import { formatWeightMTS } from '@Utils/formatHelpers';

const renderContractNumberColumn = (text, record) => {
    return (
        <Link to={`/main-seller-contracts/${record.id}`}>{record.number}</Link>
    );
};

const MainContractsTable = (props) => {
    const { contracts } = props;

    const columns = [
        {
            title: 'Contract number',
            dataIndex: 'number',
            key: 'number',
            render: renderContractNumberColumn,
        },
        {
            title: 'Commodity',
            dataIndex: 'commodity',
            key: 'commodity',
            className: 'table-cell-wrap',
            width: 300,
        },
        {
            title: 'Free commodities',
            dataIndex: 'free',
            key: 'free',
            render: (text) => formatWeightMTS(text),
        },
        {
            title: 'Shipped',
            dataIndex: 'shipped_weight',
            key: 'shipped_weight',
            render: (text) => formatWeightMTS(text),
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (text) => formatWeightMTS(text),
        },
    ];

    return (
        <Table
            data={contracts}
            columns={columns}
            pagination={{ pageSize: 10 }}
        />
    );
};

export default MainContractsTable;
