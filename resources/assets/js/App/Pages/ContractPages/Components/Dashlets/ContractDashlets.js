import React, { Fragment } from 'react';

import {
    formatWeightMTS,
    formatCurrency,
    oneHundred,
} from '@Utils/formatHelpers';

import Dashlet from '@Components/Dashlet/Dashlet';

import './ContractDashlets.scss';

export const ContractDashlets = (props) => {
    const { contract } = props;

    const renderPerMetricTon = (title, weight, price) => {
        return (
            <Fragment>
                <p className="title">{title}</p>
                <p className={`${title.toLowerCase()}`}>
                    <span className="weight">{formatCurrency(weight)} PMT</span>
                    <span className="price">{formatCurrency(price)}</span>
                </p>
            </Fragment>
        );
    };

    const renderExpenses = (title, data) => {
        return (
            <Fragment>
                <p className="title">{title}</p>
                <p className={`${title.toLowerCase()}`}>
                    {formatCurrency(data)}
                </p>
            </Fragment>
        );
    };

    const metricTons = [
        {
            title: 'Quantity',
            render: () => formatWeightMTS(contract.weight),
        },
        {
            title: 'Shipped',
            render: () => formatWeightMTS(contract.shipped_weight),
        },
        {
            title: 'Purchased',
            render: () => formatWeightMTS(contract.purchased_weight),
        },
        {
            title: 'To be shipped',
            render: () => formatWeightMTS(contract.to_be_shipped),
        },
    ];

    const perMetricTon = [
        {
            render: () =>
                renderPerMetricTon(
                    'Sale',
                    contract.pmt / oneHundred,
                    contract.sale / oneHundred
                ),
        },
        {
            render: () =>
                renderPerMetricTon(
                    'Purchase',
                    contract.purchase_pmt,
                    contract.purchase_amount / oneHundred
                ),
        },
        {
            render: () =>
                renderExpenses(
                    'Expenses',
                    contract.expense_amount / oneHundred
                ),
        },
    ];

    return (
        <div className="contract-page-content">
            <div className="metric-tons">
                <Dashlet dashlet={metricTons} />
            </div>
            <div className="per-metric-ton">
                <Dashlet dashlet={perMetricTon} />
            </div>
        </div>
    );
};

export default ContractDashlets;
