import React from 'react';
import {
    DashboardOutlined,
    LineChartOutlined,
    SnippetsOutlined,
} from '@ant-design/icons';

const basedMenuItems = [
    {
        key: 'directory',
        name: 'Directory',
        icon: <SnippetsOutlined />,
    },
];

const adminMenuItems = [
    {
        key: 'dashboard',
        name: 'Dashboard',
        icon: <DashboardOutlined />,
    },
    {
        key: 'analytics',
        name: 'Analytics',
        icon: <LineChartOutlined />,
    },
    {
        key: 'contracts',
        name: 'Contracts',
        icon: <SnippetsOutlined />,
    },
    {
        key: 'seller-contracts',
        name: 'Seller Contracts',
        icon: <SnippetsOutlined />,
    },
    ...basedMenuItems,
];

const userMenuItems = [
    {
        key: 'contracts',
        name: 'Contracts',
        icon: <SnippetsOutlined />,
    },
    {
        key: 'analytics',
        name: 'Analytics',
        icon: <LineChartOutlined />,
    },
    ...basedMenuItems,
];

const logisticMenuItems = [
    {
        key: 'contracts',
        name: 'Contracts',
        icon: <SnippetsOutlined />,
    },
    {
        key: 'seller-contracts',
        name: 'Seller Contracts',
        icon: <SnippetsOutlined />,
    },
    ...basedMenuItems,
];

const salesMenuItems = [
    {
        key: 'seller-contracts',
        name: 'Contracts',
        icon: <SnippetsOutlined />,
    },
    {
        key: 'analytics',
        name: 'Analytics',
        icon: <LineChartOutlined />,
    },
    ...basedMenuItems,
];

const accountantMenuItems = [
    {
        key: 'contracts',
        name: 'Contracts',
        icon: <SnippetsOutlined />,
    },
    {
        key: 'seller-contracts',
        name: 'Seller Contracts',
        icon: <SnippetsOutlined />,
    },
    {
        key: 'analytics',
        name: 'Analytics',
        icon: <LineChartOutlined />,
    },
    ...basedMenuItems,
];

export const menuItemsMap = {
    admin: [...adminMenuItems],
    logisticManager: [...logisticMenuItems],
    // logisticManager: [...userMenuItems],
    // salesManager: [...salesMenuItems],
    accountant: [...accountantMenuItems],
};
