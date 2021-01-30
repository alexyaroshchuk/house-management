import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Descriptions from '@Components/Descriptions/Descriptions';
import { formatCurrency, oneHundred } from '@Utils/formatHelpers';

export const SellerSummaryDescriptions = (props) => {
    const { contract } = props;
    const { pmt } = contract;

    const renderPriceTemplate = (data) => {
        return (
            <span className="price">
                {formatCurrency(data / oneHundred)} PMT
            </span>
        );
    };

    const summary = [
        {
            key: uuidv4(),
            label: 'Price',
            render: () => renderPriceTemplate(pmt),
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

export default SellerSummaryDescriptions;
