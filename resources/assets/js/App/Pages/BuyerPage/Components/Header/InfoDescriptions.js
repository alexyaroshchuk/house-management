import React from 'react';

import { get } from 'lodash';

import Descriptions from '@Components/Descriptions/Descriptions';
import { formatDate, formatNumber } from '@Utils/formatHelpers';

export const InfoDescriptions = (props) => {
    const { buyer } = props;

    const { commodity_titles, active_contracts_count } = buyer;

    const info = [
        {
            label: 'Commodities',
            render: () => commodity_titles,
        },
        {
            label: 'Active contracts',
            render: () => formatNumber(active_contracts_count),
        },
    ];

    return (
        <Descriptions
            itemsList={info}
            size="default"
            layout="horizontal"
            colon={true}
            column={1}
        />
    );
};

export default InfoDescriptions;
