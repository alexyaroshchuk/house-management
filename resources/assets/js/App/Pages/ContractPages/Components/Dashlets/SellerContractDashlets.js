import React from 'react';

import { formatWeightMTS, formatNumber } from '@Utils/formatHelpers';

import Dashlet from '@Components/Dashlet/Dashlet';

import './ContractDashlets.scss';

export const SellerContractDashlets = (props) => {
    const { contract } = props;
    const {
        weight,
        shipped_weight,
        purchased_weight,
        free,
        planned_weight,
        shipments,
        pmt,
    } = contract;

    const shipmentsTotal = shipments.reduce(
        (acc, val) => acc + +val.total_payment,
        0
    );

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
        // {
        //     title: 'Purchased',
        //     render: () => `${formatNumber(shipmentsTotal / pmt)} MTS`,
        //     // render: () => formatWeightMTS(purchased_weight),
        // },
        {
            title: 'Free commodities',
            render: () => renderFreeCommodities(free),
        },
    ];

    // const freeCommodities = [
    //     {
    //         title: 'Free commodities',
    //         render: () => renderFreeCommodities(free),
    //     },
    // ];

    return (
        <div className="contract-page-content dashlets">
            {/* <div className="weights"> */}
            <Dashlet dashlet={weights} />
            {/* </div> */}
            {/* <div className="free-commodities">
                <Dashlet dashlet={freeCommodities} />
            </div> */}
        </div>
    );
};

export default SellerContractDashlets;
