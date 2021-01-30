import React from 'react';
import { size } from 'lodash';

import './Charts.scss';
import Card from '@Components/Card/Card';
import Empty from '@Components/Empty/Empty';
import PieChart from '../../../../Components/Charts/PieChart/PieChart';

import { weightMTS, oneThousand, oneHundred } from '@Utils/formatHelpers';

const Charts = (props) => {
    const { finance, shipments } = props;

    const financeChart = {
        title: 'Near',
        items: finance.map((item) => {
            const { name, count } = item;
            return {
                item: name,
                count: +count / oneHundred,
            };
        }),
        colors: [
            'rgba(229,115,115,0.85)',
            'rgba(100,181,246,0.85)',
            'rgba(240,98,146,0.85)',
            'rgba(186,104,200,0.85)',
            '#7986CB',
            'rgba(91,143,249,0.85)',
            'rgba(247,199,57,0.85)',
            'rgba(232,104,74,0.85)',
            'rgba(90,216,166,0.85)',
            'rgba(93,112,146,0.85)',
        ],
        symbol: '$',
    };

    const shipmentsChart = {
        title: 'Total',
        items: [
            {
                item: 'Awaiting at seller',
                count: shipments ? +shipments.awaiting / oneThousand : 0,
            },
            {
                item: 'Domestic export',
                count: shipments ? +shipments.domestic_export / oneThousand : 0,
            },
            {
                item: 'Shipped',
                count: shipments ? +shipments.shipped / oneThousand : 0,
            },
        ],
        colors: [
            '#4DD0E1',
            '#FFD54F',
            '#29B6F6',
            '#BAE7FF',
            '#006D75',
            '#5CDBD3',
            '#7585A2',
        ],
        symbol: weightMTS,
    };

    return (
        <div className="dashboard-charts">
            <Card title="Finance">
                {finance.length ? (
                    <PieChart data={financeChart} />
                ) : (
                    <div className="empty">
                        <Empty description="No data available" />
                    </div>
                )}
            </Card>
            <Card title="Shipments">
                {size(shipments) ? (
                    <PieChart data={shipmentsChart} />
                ) : (
                    <div className="empty">
                        <Empty description="No data available" />
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Charts;
