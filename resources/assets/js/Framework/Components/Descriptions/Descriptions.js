import React from 'react';
import { Descriptions as DescriptionsAnt } from 'antd';
import propTypes, { shape } from 'prop-types';
import { isEmpty } from 'lodash';

import './Descriptions.scss';

const Descriptions = (props) => {
    const { itemsList, ...antProps } = props;

    return (
        <DescriptionsAnt {...antProps}>
            {itemsList.map((item, index) => {
                const { label, render, className } = item;

                return !isEmpty(item) ? (
                    <DescriptionsAnt.Item
                        key={index}
                        label={label}
                        className={className}
                    >
                        {render()}
                    </DescriptionsAnt.Item>
                ) : null;
            })}
        </DescriptionsAnt>
    );
};

Descriptions.defaultProps = {
    itemsList: [],
    size: '',
    layout: '',
    colon: false,
};

Descriptions.propTypes = {
    itemsList: propTypes.array.isRequired,
    size: propTypes.string.isRequired,
    layout: propTypes.string.isRequired,
    colon: propTypes.bool.isRequired,
    column: propTypes.number,
};

export default Descriptions;
