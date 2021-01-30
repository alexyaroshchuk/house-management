import React from 'react';
import moment from 'moment';

import './Balance.scss';
import Card from '@Components/Card/Card';
import Empty from '@Components/Empty/Empty';
import LineChart from '../../../../Components/Charts/LineChart/LineChart';
import { oneHundred } from '@Utils/formatHelpers';

const Balance = (props) => {
    const { data } = props;

    const sortedData = data
        .sort((a, b) => moment(a.date) - moment(b.date))
        .map((item) => {
            const { date, value } = item;

            return {
                ...item,
                date: moment(date).format('YYYY-MM-DD'),
                value: +value / oneHundred,
            };
        });

    return (
        <div className="analytics-balance">
            <Card title="Operational balance" bordered={false}>
                {data.length ? (
                    <LineChart data={sortedData} />
                ) : (
                    <div className="empty">
                        <Empty description="No data available" />
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Balance;
