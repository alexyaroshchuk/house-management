import React from 'react';

import Descriptions from '@Components/Descriptions/Descriptions';
import { formatDate } from '@Utils/formatHelpers';

const renderCommodityColumn = (commodities) => {
    return commodities
        .map((commodity) => `${commodity.title} (${commodity.logo.title})`)
        .join(', ');
};

export const SellerInfoDescriptions = (props) => {
    const { contract } = props;
    const { date_start, date_end, commodities } = contract;

    const info = [
        {
            label: 'Date start',
            render: () => formatDate(date_start),
        },
        {
            label: 'Commodity',
            render: () => renderCommodityColumn(commodities),
        },
        {
            label: 'Date end',
            render: () => (date_end ? formatDate(date_end) : '-'),
        },
    ];

    return (
        <Descriptions
            itemsList={info}
            size="default"
            layout="horizontal"
            colon={true}
            column={2}
        />
    );
};

export default SellerInfoDescriptions;
