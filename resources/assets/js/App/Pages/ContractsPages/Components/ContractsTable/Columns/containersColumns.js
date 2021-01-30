import React from 'react';
import { Link } from 'react-router-dom';
import { uniq } from 'lodash';

import {
    formatCurrency,
    formatWeightMTS,
    oneHundred,
} from '@Utils/formatHelpers';

const renderContractNumberColumn = (text, record) => {
    return <Link to={`/contracts/${record.id}`}>{text}</Link>;
};

const renderBuyerColumn = (textObj, record) => {
    return (
        <Link to={`/contracts/buyers/${record.buyer_id}`}>{textObj.name}</Link>
    );
};

const renderExportersColumn = (textList) => {
    return textList.map((exporter) => exporter.name).join(', ');
};

const renderCommodityColumn = (textObj, record) => {
    return record.commodities
        .map((commodity) => `${commodity.title} (${commodity.logo.title})`)
        .join(', ');
};

const renderBalanceColumn = (data) => {
    return (
        <span className={data / oneHundred < 0 ? 'table-cell-red' : ''}>
            {`${formatCurrency(data / oneHundred)}`}
        </span>
    );
};

const renderSellerContractsColumn = (textList) => {
    const sellers = textList.map(
        (sellerContract) => sellerContract.seller.name
    );
    return uniq(sellers).join(', ');
};

const containersColumns = [
    {
        title: 'Buyer name',
        dataIndex: 'buyer',
        key: 'buyer',
        render: renderBuyerColumn,
    },
    {
        title: 'Contract number',
        dataIndex: 'number',
        key: 'number',
        render: renderContractNumberColumn,
    },
    {
        title: 'Seller',
        dataIndex: 'seller_contracts',
        key: 'seller_contracts',
        className: 'table-cell-wrap',
        render: renderSellerContractsColumn,
    },
    // {
    //     title: 'Exporter',
    //     dataIndex: 'exporters',
    //     key: 'exporters',
    //     className: 'table-cell-wrap',
    //     render: renderExportersColumn,
    // },
    {
        title: 'Quantity',
        dataIndex: 'weight',
        key: 'weight',
        className: 'table-cell-number',
        render: formatWeightMTS,
    },
    {
        title: 'Commodity',
        dataIndex: 'commodity',
        key: 'commodity',
        className: 'table-cell-wrap commodities',
        render: renderCommodityColumn,
    },
    {
        title: 'Shipped',
        dataIndex: 'shipped_weight',
        className: 'table-cell-number',
        key: 'shipped_weight',
        render: formatWeightMTS,
    },
    {
        title: 'Balance',
        dataIndex: 'balance',
        key: 'balance',
        className: 'table-cell-number',
        render: renderBalanceColumn,
    },
];

export default containersColumns;
