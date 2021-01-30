import React from 'react';
import { PlusCircleTwoTone, EditTwoTone, ApiTwoTone } from '@ant-design/icons';

import {
    formatDate,
    formatCurrency,
    formatWeightMTS,
    oneHundred,
} from '@Utils/formatHelpers';

import Accordion from '@Components/Accordion/Accordion';
import Button from '@Components/Button/Button';
import Dropdown from '@Components/Dropdown/Dropdown';
import Table from '@Components/Table/Table';
import { active, inactive } from './constants';

import './Shipments.scss';

export const CommonAccordion = (props) => {
    const {
        shipments,
        onSelectDropdown,
        onEdit,
        onDelete,
        onChangeStatus,
        isFinishedContract,
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

    const dropdownHandler = (e, shipment) => {
        const { key } = e;
        onSelectDropdown(key, shipment);
        e.domEvent.stopPropagation();
    };

    const changeStatusHandler = (id, status) => {
        onChangeStatus(id, status);
    };

    const shipmentsData = shipments.map((shipment) => {
        const renderShipmentsAccordionBody = (data) => {
            const dataSource = data.map((container) => {
                const { price, quantity } = container;
                const zero = 0;

                return {
                    ...container,
                    price: price ? price / oneHundred : zero,
                    quantity: quantity ? quantity : zero,
                };
            });

            const columns = [
                {
                    title: 'Containers',
                    dataIndex: 'number',
                    key: 'number',
                    className: 'containers',
                },
                {
                    title: 'Commodity',
                    dataIndex: 'label',
                    key: 'label',
                },
                {
                    title: 'Quantity',
                    dataIndex: 'quantity',
                    key: 'quantity',
                    className: 'table-cell-number',
                    render: formatWeightMTS,
                },
                {
                    title: 'Price',
                    dataIndex: 'price',
                    key: 'price',
                    className: 'table-cell-number',
                    render: formatCurrency,
                },
                shipmentsActions(),
            ];

            return (
                <Table columns={columns} data={dataSource} pagination={false} />
            );
        };

        const renderShipmentsAccordionHeader = (shipment) => {
            const {
                name,
                date,
                number,
                total_quantity,
                total_payment,
                status,
            } = shipment;
            const twoToneColor = '#1890FF';

            const menuItems = [
                {
                    icon: <PlusCircleTwoTone twoToneColor={twoToneColor} />,
                    className: 'add-containers',
                    action: 'Add containers',
                },
                {
                    icon: <EditTwoTone twoToneColor={twoToneColor} />,
                    className: 'edit-shipment',
                    action: 'Edit',
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
                            className={
                                status === active ? 'finish' : 'finished'
                            }
                        >
                            {status === active ? 'Finish' : 'Finished'}
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

            return (
                <div className="shipments-header">
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
                        <div className="total-quantity text-right">
                            <p className="title">Total quantity</p>
                            <p className="total">
                                {formatWeightMTS(total_quantity)}
                            </p>
                        </div>
                        <div className="total-price text-right">
                            <p className="title">Total price</p>
                            <p className="total">
                                {formatCurrency(total_payment / oneHundred)}
                            </p>
                        </div>
                        {!isFinishedContract ? renderActions() : null}
                    </div>
                </div>
            );
        };

        const { id, containers } = shipment;

        return {
            id,
            header: renderShipmentsAccordionHeader(shipment),
            render: renderShipmentsAccordionBody(containers),
        };
    });

    return <Accordion panels={shipmentsData} />;
};

export default CommonAccordion;
