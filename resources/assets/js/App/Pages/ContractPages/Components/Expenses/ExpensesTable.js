import React from 'react';
import Table from '@Components/Table/Table';
import Button from '@Components/Button/Button';
import { formatDate, formatCurrency, oneHundred } from '@Utils/formatHelpers';

export const ExpensesTable = (props) => {
    const {
        data,
        loading,
        expense_type,
        banks,
        onEdit,
        onDelete,
        isFinishedContract,
    } = props;

    const expense = data.map((item) => {
        const { amount } = item;
        return {
            ...item,
            amount: amount / oneHundred,
        };
    });

    const renderExpensesActions = (text, record) => {
        return (
            <div className="actions">
                <Button
                    type="link"
                    onClick={() => onEdit(record, expense_type)}
                >
                    Edit
                </Button>
                <Button
                    type="link"
                    danger
                    onClick={() => onDelete(record, expense_type)}
                >
                    Delete
                </Button>
            </div>
        );
    };

    const renderDate = (text, record) => (text ? formatDate(text) : '');

    const renderExpensePaymentType = (text, record) => {
        const bank = banks.find((bank) => bank.id === record.bank_id);

        return bank ? bank.title : '';
    };

    const shipmentsActions = () => {
        if (!isFinishedContract) {
            return {
                title: 'Actions',
                dataIndex: 'actions',
                key: 'actions',
                className: 'column-actions',
                render: renderExpensesActions,
            };
        }

        return {};
    };

    const columns = [
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'B/L',
            dataIndex: 'shipment',
            key: 'shipment',
            render: (textObj, record) =>
                record.shipment ? record.shipment.number : '',
        },
        {
            title: 'Payment, $',
            dataIndex: 'amount',
            key: 'amount',
            className: 'table-cell-number',
            render: formatCurrency,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: renderDate,
        },
        {
            title: 'Bank',
            dataIndex: 'bank_id',
            key: 'bank_id',
            render: renderExpensePaymentType,
        },
        shipmentsActions(),
    ];

    return (
        <Table
            columns={columns}
            data={expense}
            pagination={false}
            loading={loading}
        />
    );
};
