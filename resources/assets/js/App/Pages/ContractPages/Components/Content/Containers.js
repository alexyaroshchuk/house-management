import React from 'react';

import {
    formatDate,
    formatCurrency,
    formatWeightMTS,
    oneHundred,
} from '@Utils/formatHelpers';

import Card from '@Components/Card/Card';
import Table from '@Components/Table/Table';
import Button from '@Components/Button/Button';

export const Containers = (props) => {
    const { data = [] } = props;

    const dataSource = data.map((item) => {
        const { total_payment } = item;
        return {
            ...item,
            total_payment: total_payment / oneHundred,
        };
    });

    const renderShipmentsActions = () => {
        return (
            <div className="actions">
                <Button type="link">Edit</Button>
                <Button type="link" danger>
                    Delete
                </Button>
            </div>
        );
    };
    const columns = [
        {
            title: 'Customer',
            dataIndex: 'buyer',
            key: 'buyer',
        },
        {
            title: 'Vessel`s name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: formatDate,
        },
        {
            title: 'B/L',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Total quantity',
            dataIndex: 'total_quantity',
            key: 'total_quantity',
            className: 'table-cell-number',
            render: formatWeightMTS,
        },
        {
            title: 'Total price',
            dataIndex: 'total_payment',
            key: 'total_payment',
            className: 'table-cell-number',
            render: formatCurrency,
        },
        // {
        //     title: 'Actions',
        //     dataIndex: 'actions',
        //     key: 'actions',
        //     className: 'column-actions',
        //     render: renderShipmentsActions,
        // },
    ];

    return (
        <Card title={'Shipments'}>
            <Table columns={columns} data={dataSource} />
        </Card>
    );
};

export default Containers;
