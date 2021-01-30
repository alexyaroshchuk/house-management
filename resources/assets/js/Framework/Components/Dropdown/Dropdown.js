import React from 'react';
import { Menu, Dropdown as DropdownAnt } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import './Dropdown.scss';

const Dropdown = (props) => {
    const { title, menuItems, onClick, overlayClassName } = props;
    const menu = (
        <Menu onClick={onClick}>
            {menuItems.map((item, index) => {
                const { action, className, icon } = item;
                return (
                    <Menu.Item key={index} icon={icon}>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className={className}
                        >
                            {action}
                        </a>
                    </Menu.Item>
                );
            })}
        </Menu>
    );

    return (
        <DropdownAnt overlay={menu} overlayClassName={overlayClassName}>
            <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
            >
                {title} <DownOutlined />
            </a>
        </DropdownAnt>
    );
};

export default Dropdown;
