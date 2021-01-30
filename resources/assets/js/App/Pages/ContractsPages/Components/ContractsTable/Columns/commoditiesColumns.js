import React from 'react';
import { Link } from 'react-router-dom';

import {
    formatWeightMTS,
    formatCurrency,
    oneHundred,
} from '@Utils/formatHelpers';

const renderSellerColumn = (textObj, record) => {
    return <Link to={`/seller/${record.seller_id}`}>{record.seller_name}</Link>;
};

const renderContractNumberColumn = (textObj, record) => {
    return (
        <Link to={`/main-seller-contracts/${record.id}`}>{record.number}</Link>
    );
};

const renderCommodity = (text, record) => {
    return text;
};

const commoditiesColumns = [
    {
        title: 'Seller name',
        dataIndex: 'seller',
        key: 'seller',
        render: renderSellerColumn,
    },
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
        className: 'table-cell-wrap commodities',
        render: renderCommodity,
    },
    {
        title: 'Free commodities',
        dataIndex: 'free',
        key: 'free',
        className: 'table-cell-number',
        render: (text) => formatWeightMTS(text),
    },
    {
        title: 'Shipped',
        dataIndex: 'shipped_weight',
        key: 'shipped',
        className: 'table-cell-number',
        render: (text) => formatWeightMTS(text),
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        className: 'table-cell-number',
        render: (text) => formatWeightMTS(text),
    },
];

export default commoditiesColumns;
