import React from 'react';
import { Badge } from 'antd';
import propTypes from 'prop-types';
import { BellOutlined } from '@ant-design/icons';

import './Badge.scss';

export const BadgeDefault = (props) => {
    const { toggleDrawer, badgeDot } = props;

    return (
        <div className="badge" onClick={toggleDrawer}>
            <Badge dot={badgeDot}>
                <BellOutlined />
            </Badge>
        </div>
    );
};

BadgeDefault.defaultProps = {
    badgeDot: false,
};

BadgeDefault.propTypes = {
    badgeDot: propTypes.bool.isRequired,
};

export default BadgeDefault;
