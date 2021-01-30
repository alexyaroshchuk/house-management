import React from 'react';
import { Timeline as TimelineAnt } from 'antd';
import propTypes, { shape } from 'prop-types';

import './Timeline.scss';

const Timeline = (props) => {
    const { items } = props;

    return (
        <TimelineAnt>
            {items.map((item) => {
                const { key, render } = item;

                return (
                    <TimelineAnt.Item key={key}>{render()}</TimelineAnt.Item>
                );
            })}
        </TimelineAnt>
    );
};

Timeline.defaultProps = {
    items: [],
};

Timeline.propTypes = {
    items: propTypes.arrayOf(
        shape({
            key: propTypes.string.isRequired,
            render: propTypes.func.isRequired,
        })
    ),
};

export default Timeline;
