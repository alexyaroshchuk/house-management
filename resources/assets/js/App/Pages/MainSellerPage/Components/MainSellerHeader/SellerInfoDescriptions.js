import React from 'react';

import Descriptions from '@Components/Descriptions/Descriptions';
import { formatDate } from '@Utils/formatHelpers';

export const SellerInfoDescriptions = (props) => {
    const { contract } = props;
    const { date_start, date_end, commodity_titles } = contract;

    const info = [
        {
            label: 'Date start',
            render: () => formatDate(date_start),
        },
        {
            label: 'Commodity',
            render: () => commodity_titles,
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
