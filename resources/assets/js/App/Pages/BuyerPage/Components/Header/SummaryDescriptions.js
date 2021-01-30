import React from 'react';
import classNames from 'classnames';

import { formatCurrency, oneHundred } from '@Utils/formatHelpers';
import Descriptions from '@Components/Descriptions/Descriptions';

export const SummaryDescriptions = (props) => {
    const { buyer } = props;
    const { sum_invest, sum_profit } = buyer;

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

    const summary = [
        {
            label: 'TTL invest',
            render: () => renderInvestTemplate(sum_invest / oneHundred),
        },
        {
            label: 'TTL Profit',
            render: () => renderProfitTemplate(sum_profit / oneHundred),
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
