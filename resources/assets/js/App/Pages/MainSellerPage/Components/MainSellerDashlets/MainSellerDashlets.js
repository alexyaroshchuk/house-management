import React from 'react';

import { formatWeightMTS } from '@Utils/formatHelpers';

import Dashlet from '@Components/Dashlet/Dashlet';

import './MainSellerDashlets.scss';

export const MainSellerDashlets = (props) => {
    const { contract } = props;
    const { weight, planned_weight, shipped_weight, free } = contract;

    const renderFreeCommodities = (data) => (
        <span className="commodities blue">{`${formatWeightMTS(data)}`}</span>
    );

    const weights = [
        {
            title: 'Total',
            render: () => formatWeightMTS(weight),
        },
        {
            title: 'Planned',
            render: () => formatWeightMTS(planned_weight),
        },
        {
            title: 'Shipped',
            render: () => formatWeightMTS(shipped_weight),
        },
        {
            title: 'Free commodities',
            render: () => renderFreeCommodities(free),
        },
    ];

    return (
        <div className="contract-page-content main-seller-dashlets">
            <Dashlet dashlet={weights} />
        </div>
    );
};

export default MainSellerDashlets;
