import React from 'react';
import { Radio } from 'antd';
import propTypes, { shape, number, string } from 'prop-types';

import './RadioGroup.scss';

const RadioGroup = (props) => {
    const { radio, group, defaultGroupValue, value, onChange } = props;

    if (radio) {
        return (
            <Radio.Group
                {...props}
                defaultValue={defaultGroupValue}
                onChange={onChange}
            >
                {group.map((radio) => {
                    const { key, value } = radio;

                    return (
                        <Radio key={key} value={value}>
                            {value}
                        </Radio>
                    );
                })}
            </Radio.Group>
        );
    }

    return (
        <Radio.Group
            {...props}
            defaultValue={defaultGroupValue}
            onChange={onChange}
            value={value}
        >
            {group.map((button, index) => {
                const { value, text } = button;
                return (
                    <Radio.Button key={index} value={value}>
                        {text}
                    </Radio.Button>
                );
            })}
        </Radio.Group>
    );
};

RadioGroup.defaultProps = {
    group: [],
    onChange: () => {},
};

RadioGroup.propTypes = {
    group: propTypes.arrayOf(
        shape({
            value: string,
            text: string,
        })
    ).isRequired,
    onChange: propTypes.func.isRequired,
};

export default RadioGroup;
