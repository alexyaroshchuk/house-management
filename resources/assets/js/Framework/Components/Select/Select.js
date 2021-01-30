import React from 'react';
import { Select as SelectAnt } from 'antd';
import propTypes, { shape, number, string } from 'prop-types';

import './Select.scss';

const { Option, OptGroup } = SelectAnt;

const renderOptions = (options) => {
    return options.map((option) => {
        const { id, value, text, disabled } = option;

        return (
            <Option key={id} value={value} disabled={disabled}>
                {text}
            </Option>
        );
    });
};

const Select = (props) => {
    const { options, group, groups, ...antProps } = props;

    if (group) {
        return (
            <SelectAnt {...antProps}>
                {groups.map((group) => {
                    const { id, groupLabel, options } = group;
                    return (
                        <OptGroup key={id} label={groupLabel}>
                            {renderOptions(options)}
                        </OptGroup>
                    );
                })}
            </SelectAnt>
        );
    }

    return <SelectAnt {...antProps}>{renderOptions(options)}</SelectAnt>;
};

Select.defaultProps = {
    options: [],
};

Select.propTypes = {
    options: propTypes.arrayOf(
        shape({
            id: number.isRequired,
            value: string.isRequired,
            text: string.isRequired,
        })
    ).isRequired,
    placeholder: propTypes.string,
};

export default Select;
