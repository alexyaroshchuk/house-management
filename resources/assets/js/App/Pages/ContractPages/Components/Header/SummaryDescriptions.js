import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import Descriptions from '@Components/Descriptions/Descriptions';

import { formatCurrency, oneHundred } from '@Utils/formatHelpers';
import { isLogisticRole } from '@Utils/rolesHelper';

import './ContractHeader.scss';

export const SummaryDescriptions = (props) => {
    const { contract, currentRole } = props;
    const { invest, profit, manager_profit } = contract;

    const renderInvestTemplate = (data) => (
        <span className="invest">{formatCurrency(data)}</span>
    );

    const renderProfitTemplate = (data) => {
        var profitClass = classNames({
            profit: true,
            positive: data > 0,
            negative: data < 0,
        });

        return <span className={profitClass}>{formatCurrency(data)}</span>;
    };

    const isLogistic = isLogisticRole(currentRole);
    const roleProfit = isLogistic ? manager_profit : profit;

    const summary = [
        {
            key: uuidv4(),
            label: 'TTL invest',
            render: () => renderInvestTemplate(invest / oneHundred),
        },
        {
            key: uuidv4(),
            label: 'TTL Profit',
            render: () => renderProfitTemplate(roleProfit / oneHundred),
        },
    ];

    return (
        <Descriptions
            itemsList={summary}
            size="default"
            layout="vertical"
            colon={false}
            column={2}
        />
    );
};

export default SummaryDescriptions;
