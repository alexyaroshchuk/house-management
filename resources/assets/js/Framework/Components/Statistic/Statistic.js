import React from 'react';
import { Statistic as StatisticAnt } from 'antd';
import propTypes from 'prop-types';

import './Statistic.scss';

const Statistic = (props) => {
    return <StatisticAnt {...props} />;
};

Statistic.defaultProps = {
    title: '',
    value: 0,
    groupSeparator: ' ',
    prefix: '',
    suffix: '',
};

Statistic.propTypes = {
    title: propTypes.string.isRequired,
    value: propTypes.number.isRequired,
    groupSeparator: propTypes.string.isRequired,
    prefix: propTypes.string.isRequired,
    suffix: propTypes.string.isRequired,
};

export default Statistic;
