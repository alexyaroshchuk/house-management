import React from 'react';

import './PieCharts.scss';
import Card from '@Components/Card/Card';
import PieChart from '../../../../Components/Charts/PieChart/PieChart';
import Empty from '@Components/Empty/Empty';

import { weightMTS, oneThousand } from '@Utils/formatHelpers';

const PieCharts = (props) => {
    const { customers, commodities } = props;

    const customersChart = {
        title: 'Contracts',
        items: customers.map((item) => {
            const { name, count } = item;
            return {
                item: name,
                count: +count,
            };
        }),
        colors: [
            '#E57373',
            'rgba(100,181,246,0.85)',
            '#F06292',
            '#BB65CA',
            '#7884CD',
            '#45D0E2',
            '#18B5F9',
            '#FFD63F',
            '#FFB840',
            '#7FBEC8',
        ],
    };

    const commoditiesChart = {
        title: 'Total',
        items: commodities.map((item) => {
            const { name, count } = item;
            return {
                item: name,
                count: +count / oneThousand,
            };
        }),
        colors: [
            '#E57373',
            'rgba(100,181,246,0.85)',
            '#F06292',
            '#BB65CA',
            '#7884CD',
            '#45D0E2',
            '#18B5F9',
            '#FFD63F',
            '#FFB840',
            '#7FBEC8',
        ],
        symbol: weightMTS,
    };

    return (
        <div className="analytics-charts">
            <Card title="Customers">
                {customers.length ? (
                    <PieChart data={customersChart} />
                ) : (
                    <div className="empty">
                        <Empty description="No data available" />
                    </div>
                )}
            </Card>
            <Card title="Commodities">
                {commodities.length ? (
                    <PieChart data={commoditiesChart} />
                ) : (
                    <div className="empty">
                        <Empty description="No data available" />
                    </div>
                )}
            </Card>
        </div>
    );
};

export default PieCharts;
