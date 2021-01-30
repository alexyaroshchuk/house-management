import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { uniq } from 'lodash';

import {
    formatWeightMTS,
    formatCurrency,
    oneHundred,
} from '@Utils/formatHelpers';
import { CONTRACTS_STATUS } from '@Context/Contracts/Store/constants';

import Button from '@Components/Button/Button';
import Dropdown from '@Components/Dropdown/Dropdown';
import Table from '@Components/Table/Table';

const BuyerContractsTable = (props) => {
    const { contracts, currentTab, onEdit, onFinish, onDelete } = props;

    const getActiveContractActions = (text, record, idx) => {
        const menuItems = [{ action: 'action1' }, { action: 'action2' }];

        return (
            <Fragment>
                <Button
                    className="table-row-action"
                    type="link"
                    onClick={() => onEdit(record)}
                >
                    Edit
                </Button>

                <Button
                    className="table-row-action"
                    type="link"
                    onClick={() => onFinish(record)}
                >
                    Finish
                </Button>
            </Fragment>
        );
    };

    const getArchiveContractActions = (text, record, idx) => {
        return (
            <Button type="link" danger onClick={() => onDelete(record)}>
                Delete
            </Button>
        );
    };

    const renderActionsColumn = (text, record, idx) => {
        switch (currentTab) {
            case CONTRACTS_STATUS.ACTIVE:
                return getActiveContractActions(text, record, idx);
            case CONTRACTS_STATUS.ARCHIVE:
                return getArchiveContractActions(text, record, idx);
            default:
                return null;
        }
    };

    const renderContractNumberColumn = (text, record) => {
        return <Link to={`/contracts/${record.id}`}>{text}</Link>;
    };

    const renderExportersColumn = (textList) => {
        return textList.map((exporter) => exporter.name).join(', ');
    };

    const renderCommodityColumn = (textObj, record) => {
        return record.commodities
            .map((commodity) => commodity.title)
            .join(', ');
    };

    const renderBalanceColumn = (data) => {
        return (
            <span className={data / oneHundred < 0 ? 'table-cell-red' : ''}>
                {`${formatCurrency(data / oneHundred)}`}
            </span>
        );
    };

    const renderSellerContractsColumn = (textList) => {
        const sellers = textList.map(
            (sellerContract) => sellerContract.seller.name
        );
        return uniq(sellers).join(', ');
    };

    const columns = [
        {
            title: 'Contract number',
            dataIndex: 'number',
            key: 'number',
            render: renderContractNumberColumn,
        },
        {
            title: 'Seller',
            dataIndex: 'seller_contracts',
            key: 'seller_contracts',
            className: 'table-cell-wrap',
            render: renderSellerContractsColumn,
        },
        {
            title: 'Exporter',
            dataIndex: 'exporters',
            key: 'exporters',
            className: 'table-cell-wrap',
            render: renderExportersColumn,
        },
        {
            title: 'Quantity',
            dataIndex: 'weight',
            key: 'weight',
            className: 'table-cell-number',
            render: formatWeightMTS,
        },
        {
            title: 'Commodity',
            dataIndex: 'commodity',
            key: 'commodity',
            className: 'table-cell-wrap',
            width: 200,
            render: renderCommodityColumn,
        },
        {
            title: 'Shipped',
            dataIndex: 'shipped_weight',
            className: 'table-cell-number',
            key: 'shipped_weight',
            render: formatWeightMTS,
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
            key: 'balance',
            className: 'table-cell-number',
            render: renderBalanceColumn,
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: renderActionsColumn,
        },
    ];

    return (
        <>
            <Table columns={columns} data={contracts} pagination={false} />
        </>
    );
};

export default BuyerContractsTable;
