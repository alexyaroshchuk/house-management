import React from 'react';

import './Debts.scss';
import Descriptions from '@Components/Descriptions/Descriptions';
import { formatCurrency, oneHundred } from '@Utils/formatHelpers';

const Debts = (props) => {
    const { data } = props;
    const { cargo_purchased, debit_of_our_favor, debt } = data;

    const info = [
        {
            label: 'Cargo purchased',
            render: () => formatCurrency(cargo_purchased / oneHundred),
            className: 'purchased',
        },
        {
            label: 'Debt in our favor',
            render: () => formatCurrency(debit_of_our_favor / oneHundred),
            className: 'debt',
        },
        {
            label: 'Due to pay',
            render: () => formatCurrency(debt / oneHundred),
            className: 'debt',
        },
    ];

    return (
        <div className="dashboard-debts">
            <Descriptions
                itemsList={info}
                size="default"
                layout="horizontal"
                colon={true}
            />
        </div>
    );
};

export default Debts;
