import React from 'react';
import { Link } from 'react-router-dom';

import './SellerTable.scss';
import Table from '@Components/Table/Table';
import {
    formatWeightMTS,
    formatCurrency,
    oneHundred,
} from '@Utils/formatHelpers';

const renderContractNumberColumn = (text, record) => {
    return <Link to={`/seller-contracts/${record.id}`}>{record.number}</Link>;
};

const renderCommodityColumn = (textObj, record) => {
    return record.commodities.map((commodity) => commodity.title).join(', ');
};

const SellerTable = (props) => {
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
            width: 200,
            render: renderCommodityColumn,
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
            dataIndex: 'weight',
            key: 'weight',
            render: (text) => formatWeightMTS(text),
        },
        {
            title: 'Rate',
            dataIndex: 'pmt',
            key: 'pmt',
            render: (text) => `${formatCurrency(text / oneHundred)} PMT`,
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

export default SellerTable;
