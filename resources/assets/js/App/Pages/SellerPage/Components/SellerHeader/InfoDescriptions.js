import React from 'react';

import Descriptions from '@Components/Descriptions/Descriptions';

export const InfoDescriptions = (props) => {
    const { seller } = props;
    const { active_contracts_count, commodity_titles } = seller;

    const info = [
        {
            label: 'Active contracts',
            render: () => active_contracts_count,
        },
        {
            label: 'Commodities',
            render: () => commodity_titles,
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
