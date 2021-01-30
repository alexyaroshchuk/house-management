import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ManagementContext } from '@Context/Management';
import Table from '@Components/Table/Table';
import useGetManagementInfo from '@Context/Management/Hooks/useGetManagementInfo';
import { formatDate, formatCurrency, oneHundred } from '@Utils/formatHelpers';

const ManagementTable = () => {
    const { id } = useParams();
    const {
        managementInfo,
        isLoading,
        getManagementInfo,
    } = useGetManagementInfo();

    useEffect(() => {
        getManagementInfo(id);
    }, [id]);

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: formatDate,
        },
        {
            title: 'Down payment from Buyer',
            dataIndex: 'down_buyer',
            key: 'down_buyer',
            className: 'table-cell-number',
            render: formatCurrency,
        },
        {
            title: 'Post payment from Buyer',
            dataIndex: 'post_buyer',
            key: 'post_buyer',
            className: 'table-cell-number',
            render: formatCurrency,
        },
        {
            title: 'Due to pay by Buyer',
            dataIndex: 'due_to_buyer',
            key: 'due_to_buyer',
            className: 'table-cell-number',
            render: formatCurrency,
        },
        {
            title: 'Down payment to Seller',
            dataIndex: 'down_seller',
            key: 'down_seller',
            className: 'table-cell-number',
            render: formatCurrency,
        },
        {
            title: 'Post payment to Seller',
            dataIndex: 'post_seller',
            key: 'post_seller',
            className: 'table-cell-number',
            render: formatCurrency,
        },
        {
            title: 'Due to pay to Seller',
            dataIndex: 'due_to_seller',
            key: 'due_to_seller',
            className: 'table-cell-number',
            render: formatCurrency,
        },
        {
            title: 'Goods shipped',
            dataIndex: 'goods_shipped',
            key: 'goods_shipped',
            className: 'table-cell-number',
            render: formatCurrency,
        },
        {
            title: 'Logistic exp.',
            dataIndex: 'logistics',
            key: 'logistics',
            className: 'table-cell-number',
            render: formatCurrency,
        },
        {
            title: 'Misc exp.',
            dataIndex: 'misc',
            key: 'misc',
            className: 'table-cell-number',
            render: formatCurrency,
        },
        {
            title: 'Other exp.',
            dataIndex: 'other',
            key: 'other',
            className: 'table-cell-number',
            render: formatCurrency,
        },
    ];

    const dataSource = managementInfo.map((row) => {
        const {
            down_buyer,
            down_seller,
            due_to_buyer,
            due_to_seller,
            goods_shipped,
            logistics,
            misc,
            other,
            post_buyer,
            post_seller,
            purchase,
            sale,
        } = row;

        return {
            ...row,
            down_buyer: down_buyer / oneHundred,
            down_seller: down_seller / oneHundred,
            due_to_buyer: due_to_buyer / oneHundred,
            due_to_seller: due_to_seller / oneHundred,
            goods_shipped: goods_shipped / oneHundred,
            logistics: logistics / oneHundred,
            misc: misc / oneHundred,
            other: other / oneHundred,
            post_buyer: post_buyer / oneHundred,
            post_seller: post_seller / oneHundred,
            purchase: purchase / oneHundred,
            sale: sale / oneHundred,
        };
    });

    return (
        <Table
            columns={columns}
            data={dataSource}
            loading={isLoading}
            bordered={true}
            pagination={false}
            className="management-table"
        />
    );
};

const ManagementTableWithContext = () => () => {
    return (
        <ManagementContext>
            <ManagementTable />
        </ManagementContext>
    );
};

export default ManagementTableWithContext();
