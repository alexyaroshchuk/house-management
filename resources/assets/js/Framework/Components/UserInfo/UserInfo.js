import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import { Menu, Dropdown } from 'antd';
import {
    LogoutOutlined,
    SettingOutlined,
    UsergroupAddOutlined,
} from '@ant-design/icons';
import { get } from 'lodash';

import useCheckAuth from '@Context/Auth/Hooks/useCheckAuth';
import useLogout from '@Context/Auth/Hooks/useLogout';
import { redirectToLogin } from '@Utils/redirectsHelper';
import { isAdminRole } from '@Utils/rolesHelper';

import './UserInfo.scss';

export const UserInfo = (props) => {
    const { email } = props;
    const [user] = useCheckAuth();
    const userRole = get(user, 'role', '');
    const isAdmin = isAdminRole(userRole);

    const [isLoading, logout] = useLogout();

    const [isVisible, setIsVisible] = useState(false);

    const handleVisibleChange = (flag) => {
        setIsVisible(flag);
    };

    const handleMenuClick = (e) => {
        if (e.key === 'logout') {
            setIsVisible(false);
            logout(redirectToLogin);
        }
    };

    const menu = (
        <Menu onClick={handleMenuClick} className="user-info-dropdown">
            <Menu.Item key="settings">
                <SettingOutlined />
                <Link className="user-info-link" to="/notifications">
                    Actions log
                </Link>
            </Menu.Item>
            {isAdmin && (
                <Menu.Item key="role-settings">
                    <UsergroupAddOutlined />
                    <Link className="user-info-link" to="/role-settings">
                        Role settings
                    </Link>
                </Menu.Item>
            )}
            <Menu.Item key="logout">
                <LogoutOutlined />
                <span className="user-info-link">Sign out</span>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="user-info">
            <Dropdown
                overlay={menu}
                onVisibleChange={handleVisibleChange}
                visible={isVisible}
            >
                <div className="user-email">{email}</div>
            </Dropdown>
        </div>
    );
};

UserInfo.defaultProps = {
    email: '',
};

UserInfo.propTypes = {
    email: propTypes.string.isRequired,
};

export default UserInfo;
