import React from 'react';
import { PlusCircleTwoTone, ApiTwoTone } from '@ant-design/icons';

import {
    formatDate,
    formatCurrency,
    formatWeightMTS,
    oneHundred,
    oneThousand,
} from '@Utils/formatHelpers';

import Accordion from '@Components/Accordion/Accordion';
import Button from '@Components/Button/Button';
import Dropdown from '@Components/Dropdown/Dropdown';
import Table from '@Components/Table/Table';
import Card from '@Components/Card/Card';
import {
    PAYMENT_TYPE_TEXT,
    PAYMENT_TYPE_VALUE,
    active,
    inactive,
} from './constants';

import './Shipments.scss';

export const AccountantAccordion = (props) => {
    const {
        shipments,
        onSelectDropdown,
        isFinishedContract,
        onEdit,
        onDelete,
        onChangeStatus,
    } = props;

    const renderShipmentsActions = (text, record) => {
        return (
            <div className="actions">
                <Button type="link" onClick={() => onEdit(record)}>
                    Edit
                </Button>
                <Button type="link" danger onClick={() => onDelete(record)}>
                    Delete
                </Button>
            </div>
        );
    };

    const dropdownHandler = (e, shipment) => {
        const { key } = e;
        onSelectDropdown(key, shipment);
        e.domEvent.stopPropagation();
    };

    const renderShipmentsAccordionBody = (data) => {
        const { payments_selling, payments_purchase } = data;

        const dataSourceSelling = payments_selling.map((item) => {
            const { payment_type, amount } = item;

            return {
                ...item,
                amount: amount / oneHundred,
                payment_type:
                    payment_type === PAYMENT_TYPE_VALUE.DOWN
                        ? PAYMENT_TYPE_TEXT.DOWN
                        : PAYMENT_TYPE_TEXT.POST,
            };
        });

        const dataSourcePurchase = payments_purchase.map((item) => {
            const { payment_type, amount } = item;

            return {
                ...item,
                amount: amount / oneHundred,
                payment_type:
                    payment_type === PAYMENT_TYPE_VALUE.DOWN
                        ? PAYMENT_TYPE_TEXT.DOWN
                        : PAYMENT_TYPE_TEXT.POST,
            };
        });

        const shipmentsActions = () => {
            if (!isFinishedContract) {
                return {
                    title: 'Actions',
                    dataIndex: 'actions',
                    key: 'actions',
                    className: 'column-actions',
                    render: renderShipmentsActions,
                };
            }

            return {};
        };

        const columns = [
            {
                title: 'Type',
                dataIndex: 'payment_type',
                key: 'payment_type',
            },
            {
                title: 'Payment',
                dataIndex: 'amount',
                key: 'amount',
                className: 'table-cell-number',
                render: formatCurrency,
            },
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                render: formatDate,
            },
            shipmentsActions(),
        ];

        return (
            <div className="wrapper">
                <Card title="Selling" bordered={false}>
                    <Table
                        columns={columns}
                        data={dataSourceSelling}
                        pagination={false}
                    />
                </Card>
                <Card title="Purchase" bordered={false}>
                    <Table
                        columns={columns}
                        data={dataSourcePurchase}
                        pagination={false}
                    />
                </Card>
            </div>
        );
    };

    const changeStatusHandler = (id, status) => {
        onChangeStatus(id, status);
    };

    const renderShipmentsAccordionHeader = (shipment) => {
        const {
            name,
            number,
            total_quantity,
            total_payment,
            status,
            date,
            from_buyer_amount,
            for_seller_amount,
        } = shipment;
        const twoToneColor = '#1890FF';

        const menuItems = [
            {
                icon: <PlusCircleTwoTone twoToneColor={twoToneColor} />,
                className: 'add-income',
                action: 'Add income',
            },
            {
                icon: <PlusCircleTwoTone twoToneColor={twoToneColor} />,
                className: 'add-payment',
                action: 'Add payment',
            },
            {
                icon: <ApiTwoTone twoToneColor={twoToneColor} />,
                className: 'merge',
                action: 'Merge',
            },
        ];

        const renderActions = () => {
            return (
                <div className="actions">
                    <Button
                        type="link"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (status === active) {
                                changeStatusHandler(shipment, inactive);
                            } else {
                                changeStatusHandler(shipment, active);
                            }
                        }}
                        className={status === 'active' ? 'finish' : 'finished'}
                    >
                        {status === 'active' ? 'Finish' : 'Finished'}
                    </Button>
                    <span onClick={(e) => e.stopPropagation()}>
                        <Dropdown
                            title="More"
                            menuItems={menuItems}
                            onClick={(e) => dropdownHandler(e, shipment)}
                            disabled={status === inactive ? true : false}
                        />
                    </span>
                </div>
            );
        };

        const setFromBuyerClassName = (amount) => {
            return amount > 0 ? 'positive' : amount == 0 ? '' : 'negative';
        };

        const setForSellerClassName = (amount) => {
            return amount > 0 ? 'negative' : amount == 0 ? '' : 'positive';
        };

        return (
            <div className="shipments-header accountant">
                <div className="shipments-left">
                    <div className="shipment-name text-left">
                        <span className="title">Vessel`s name</span>
                        <span>{name}</span>
                    </div>
                    <div className="shipment-date text-left">
                        <span className="title">Date</span>
                        <span>{formatDate(date)}</span>
                    </div>
                    <div className="shipment-number text-left">
                        <span className="title">B/L</span>
                        <span>{number}</span>
                    </div>
                </div>
                <div className="shipments-right">
                    <div className="quantity text-right">
                        <p className="title">Quantity</p>
                        <p className="total">
                            {formatWeightMTS(total_quantity)}
                        </p>
                    </div>
                    <div className="payment text-right">
                        <p className="title">Payment</p>
                        <p className="total">
                            {formatCurrency(total_payment / oneHundred)}
                        </p>
                    </div>
                    <div className="from-buyer text-right">
                        <p className="title">From buyer</p>
                        <p
                            className={`total ${setFromBuyerClassName(
                                from_buyer_amount / oneHundred
                            )}`}
                        >
                            {formatCurrency(from_buyer_amount / oneHundred)}
                        </p>
                    </div>
                    <div className="for-seller text-right">
                        <p className="title">For seller</p>
                        <p
                            className={`total ${setForSellerClassName(
                                for_seller_amount / oneHundred
                            )}`}
                        >
                            {formatCurrency(for_seller_amount / oneHundred)}
                        </p>
                    </div>
                    {!isFinishedContract ? renderActions() : null}
                </div>
            </div>
        );
    };

    const shipmentsData = shipments.map((shipment) => {
        const { id, payments_selling, payments_purchase } = shipment;

        const data = { payments_selling, payments_purchase };

        return {
            id,
            header: renderShipmentsAccordionHeader(shipment),
            render: renderShipmentsAccordionBody(data),
        };
    });

    return <Accordion panels={shipmentsData} />;
};

export default AccountantAccordion;
