import React from 'react';
import { List as ListAnt } from 'antd';
import propTypes from 'prop-types';

import './List.scss';

const List = (props) => {
    const { renderItem, ...antProps } = props;
    return (
        <ListAnt
            {...antProps}
            renderItem={(item) => {
                const { key, avatar, title, description, extra } = renderItem(
                    item
                );

                return (
                    <ListAnt.Item key={key} extra={extra}>
                        <ListAnt.Item.Meta
                            avatar={avatar}
                            title={title}
                            description={description}
                        />
                    </ListAnt.Item>
                );
            }}
        />
    );
};

List.defaultProps = {
    itemLayout: 'vertical',
    pagination: {},
    dataSource: [],
    renderItem: () => {},
};

List.propTypes = {
    header: propTypes.string,
    itemLayout: propTypes.string.isRequired,
    pagination: propTypes.oneOfType([
        propTypes.shape({
            onChange: propTypes.func,
            pageSize: propTypes.number,
        }).isRequired,
        propTypes.bool,
    ]),
    dataSource: propTypes.array.isRequired,
    renderItem: propTypes.func.isRequired,
};

export default List;
