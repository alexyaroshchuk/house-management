import React from 'react';
import { Input } from 'antd';
import propTypes from 'prop-types';

import { INPUT_TYPES } from './constants';
import './Input.scss';

const { Search } = Input;
const { Password } = Input;
const { TextArea } = Input;

const InputDefault = (props) => {
    const { inputType, ...args } = props;

    if (inputType === INPUT_TYPES.SEARCH) {
        return <Search {...args} />;
    } else if (inputType === INPUT_TYPES.PASSWORD) {
        return <Password {...args} />;
    } else if (inputType === INPUT_TYPES.TEXTAREA) {
        return <TextArea {...args} />;
    }

    return <Input {...args} />;
};

InputDefault.defaultProps = {
    placeholder: '',
};

InputDefault.propTypes = {
    placeholder: propTypes.string.isRequired,
    inputType: propTypes.string,
    maxLength: propTypes.number,
};

export default InputDefault;
