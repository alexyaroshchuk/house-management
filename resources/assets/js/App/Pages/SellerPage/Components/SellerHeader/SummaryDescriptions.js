import React from 'react';

import { formatCurrency, oneHundred } from '@Utils/formatHelpers';
import Descriptions from '@Components/Descriptions/Descriptions';

export const SummaryDescriptions = (props) => {
    const { seller } = props;
    const { credit } = seller;

    const renderCredit = () => {
        const className = credit > 0 ? 'positive' : 'negative';
        return (
            <span className={`credit ${className}`}>
                {formatCurrency(credit / oneHundred)}
            </span>
        );
    };

    const summary = [
        {
            label: 'Credit',
            render: () => renderCredit(),
        },
    ];

    return (
        <Descriptions
            itemsList={summary}
            size="default"
            layout="vertical"
            colon={false}
        />
    );
};

export default SummaryDescriptions;
