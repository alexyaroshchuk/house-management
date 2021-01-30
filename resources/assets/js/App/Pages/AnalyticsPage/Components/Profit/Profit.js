import React from 'react';
import moment from 'moment';

import './Profit.scss';
import Card from '@Components/Card/Card';
import Empty from '@Components/Empty/Empty';
import ColumnChart from '../../../../Components/Charts/ColumnChart/ColumnChart';
import { oneHundred } from '@Utils/formatHelpers';

const Profit = (props) => {
    const { data } = props;

    const sortedData = data
        .sort((a, b) => moment(a.date) - moment(b.date))
        .map((item) => {
            const { date, value } = item;

            return {
                date: moment(date).format('YYYY-MM'),
                value: +value / oneHundred,
            };
        });

    return (
        <div className="analytics-profit">
            <Card title="Profit" bordered={false}>
                {data.length ? (
                    <ColumnChart data={sortedData} />
                ) : (
                    <div className="empty">
                        <Empty description="No data available" />
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Profit;
