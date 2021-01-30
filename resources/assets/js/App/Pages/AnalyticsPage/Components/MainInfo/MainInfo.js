import React from 'react';

import './MainInfo.scss';
import Descriptions from '@Components/Descriptions/Descriptions';
import { formatWeightMTS } from '@Utils/formatHelpers';

const MainInfo = (props) => {
    const { data } = props;
    const {
        active_contracts,
        active_shipments,
        shipped_weight,
        total_contracts,
        total_shipments,
    } = data;

    const info = [
        {
            label: 'Shipped',
            render: () => `${formatWeightMTS(shipped_weight)}`,
        },
        {
            label: 'Total contracts',
            render: () => `${total_contracts}`,
        },
        {
            label: 'Active contracts',
            render: () => `${active_contracts}`,
        },
        {
            label: 'Total shipments',
            render: () => `${total_shipments}`,
        },
        {
            label: 'Active Shipments',
            render: () => `${active_shipments}`,
        },
    ];

    return (
        <div className="analytics-main-info">
            <Descriptions
                itemsList={info}
                size="default"
                layout="horizontal"
                colon={true}
                column={5}
            />
        </div>
    );
};

export default MainInfo;
