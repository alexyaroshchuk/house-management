import React from 'react';
import { Card } from 'antd';
import propTypes, { shape } from 'prop-types';

import './Card.scss';

const CardDefault = (props) => {
    const { title, children } = props;

    return (
        <Card {...props} title={title}>
            {children}
        </Card>
    );
};

CardDefault.defaultProps = {
    title: '',
};

CardDefault.propTypes = {
    title: propTypes.string.isRequired,
    extra: propTypes.element,
    bordered: propTypes.bool,
    tabList: propTypes.arrayOf(
        shape({
            key: propTypes.string.isRequired,
            tab: propTypes.string.isRequired,
        })
    ),
    activeTabKey: propTypes.string,
    onTabChange: propTypes.func,
};

export default CardDefault;
