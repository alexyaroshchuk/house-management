import React from 'react';
import { Link } from 'react-router-dom';

import {
    formatCurrency,
    formatWeightMTS,
    oneHundred,
} from '@Utils/formatHelpers';

import './Contracts.scss';
import Card from '@Components/Card/Card';
import Table from '@Components/Table/Table';

const renderContractNumber = (text, record) => {
    return <Link to={`/seller-contracts/${record.id}`}>{text}</Link>;
};

const renderCommodityColumn = (textObj, record) => {
    const name = record.commodities
        .map((commodity) => `${commodity.title}(${commodity.logo.title})`)
        .join(', ');

    return <Link to={`/seller-contracts/${record.id}`}>{name}</Link>;
};

const Contracts = (props) => {
    const { data } = props;

    const columns = [
        // {
        //     title: 'Contract number',
        //     dataIndex: 'number',
        //     key: 'number',
        //     render: renderContractNumber,
        // },
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
            render: formatWeightMTS,
        },
        {
            title: 'Shipped',
            dataIndex: 'shipped_weight',
            key: 'shipped_weight',
            render: formatWeightMTS,
        },
        {
            title: 'Total',
            dataIndex: 'weight',
            key: 'weight',
            render: formatWeightMTS,
        },
        {
            title: 'Price',
            dataIndex: 'pmt',
            key: 'pmt',
            render: (text) => `${formatCurrency(text / oneHundred)} PMT`,
        },
    ];

    return (
        <Card title={'Commodities'} className="commodities">
            <Table columns={columns} data={data} />
        </Card>
    );
};

export default Contracts;
