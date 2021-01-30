import React from 'react';
import { Tag } from 'antd';
import propTypes from 'prop-types';

import './Tag.scss';

const { CheckableTag } = Tag;

const changeHandler = (checked) => {
    console.log(checked);
};

const TagDefault = (props) => {
    const { checked } = props;

    return (
        <CheckableTag {...props} checked={checked} onChange={changeHandler} />
    );
};

TagDefault.defaultProps = {
    checked: true,
};

TagDefault.propTypes = {
    checked: propTypes.bool.isRequired,
};

export default TagDefault;
