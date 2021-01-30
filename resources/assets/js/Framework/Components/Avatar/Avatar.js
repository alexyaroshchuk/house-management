import React from 'react';
import { Avatar as AvatarAnt } from 'antd';
import propTypes from 'prop-types';

const Avatar = (props) => <AvatarAnt {...props} />;

Avatar.defaultProps = {
    src: '',
};

Avatar.propTypes = {
    src: propTypes.string.isRequired,
    icon: propTypes.element,
};

export default Avatar;
