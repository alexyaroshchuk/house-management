import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import './MainInfo.scss';
import Statistic from '@Components/Statistic/Statistic';
import Dashlet from '@Components/Dashlet/Dashlet';
import { oneHundred } from '@Utils/formatHelpers';

const dashletTemplate = (date) => {
    const dashlet = [
        {
            key: uuidv4(),
            title: '',
            render: () => moment(date).format('DD.MM.YYYY'),
        },
        {
            key: uuidv4(),
            title: '',
            render: () => moment(date).format('hh:mm A'),
        },
    ];

    return dashlet;
};

const MainInfo = (props) => {
    const { data } = props;
    const { own, credit, total, last_updated } = data;
    const dashlet = dashletTemplate(last_updated);

    return (
        <div className="dashboard-main-info">
            <div className="wrapper">
                <Statistic
                    className="own"
                    title="Own"
                    value={own / oneHundred}
                    prefix="$"
                />
                <Statistic
                    className="credit"
                    title="Credit"
                    value={credit / oneHundred}
                    prefix="$"
                />
                <Statistic
                    className="total"
                    title="Total"
                    value={total / oneHundred}
                    prefix="$"
                />
            </div>
            <Dashlet dashlet={dashlet} title="Last updated" />
        </div>
    );
};

export default MainInfo;
