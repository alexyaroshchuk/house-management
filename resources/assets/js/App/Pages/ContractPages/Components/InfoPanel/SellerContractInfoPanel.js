import React from 'react';

import './SellerContractInfoPanel.scss';
import { formatWeightMTS } from '@Utils/formatHelpers';

const SellerContractInfoPanel = (props) => {
    const { contract } = props;

    const infoPanel = [
        {
            title: 'Commodity',
            className: 'commodity',
            render: () => contract.commodity.title,
        },
        {
            title: 'Total',
            className: 'total',
            render: () => formatWeightMTS(contract.weight),
        },
        {
            title: 'Shipped',
            className: 'shipped',
            render: () => formatWeightMTS(contract.shipped),
        },
        {
            title: 'Purchased',
            className: 'purchased',
            render: () => formatWeightMTS(contract.purchased),
        },
        {
            title: 'Free commodities',
            className: 'free',
            render: () => formatWeightMTS(contract.free),
        },
    ];

    return (
        <ul className="seller-contract-info-panel">
            {infoPanel.map((item) => {
                const { title, className, render } = item;

                return (
                    <li key={title} className={`${className} item`}>
                        <p className="title">{title}:</p>
                        <p className="value">{render()}</p>
                    </li>
                );
            })}
        </ul>
    );
};

export default SellerContractInfoPanel;
