import React from 'react';
import { Layout, Menu } from 'antd';
import propTypes from 'prop-types';

import './Sider.scss';

const Sider = (props) => {
    const { menu, selectMenuItem, selectedMenuItem } = props;

    return (
        <Layout.Sider>
            <Menu
                defaultSelectedKeys={[selectedMenuItem.key]}
                mode="inline"
                onSelect={selectMenuItem}
            >
                {menu.map((menuItem) => {
                    const { key, value } = menuItem;

                    return <Menu.Item key={key}>{value}</Menu.Item>;
                })}
            </Menu>
        </Layout.Sider>
    );
};

Sider.defaultProps = {
    menu: [],
};

Sider.propTypes = {
    menu: propTypes.array.isRequired,
};

export default Sider;
