import React from 'react';
import { Spin } from 'antd';
import propTypes from 'prop-types';

import './Loader.scss';

const Loader = (props) => {
    const { size, fullscreen, style } = props;

    return (
        <div
            className={`loader ${
                fullscreen ? 'loader-fullscreen' : ''
            } ${style}`}
        >
            <Spin size={size} />
        </div>
    );
};

Loader.defaultProps = {
    size: 'default',
    fullscreen: false,
};

Loader.propTypes = {
    size: propTypes.oneOf(['small', 'default', 'large']),
    fullscreen: propTypes.bool,
};

export default Loader;
