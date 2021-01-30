import React, { Fragment, useEffect } from 'react';

import {
    CONTRACTS_STATUS,
    CONTRACTS_TYPE,
} from '@Context/Contracts/Store/constants';
import useGetContracts from '@Context/Contracts/Hooks/useGetContracts';
import useGetQueryParams from '@Context/Contracts/Hooks/useGetQueryParams';

import * as columns from './Columns';
import Button from '@Components/Button/Button';
import Table from '@Components/Table/Table';

const ContractsTable = (props) => {
    const {
        currentTab,
        contractType,
        currentRole,
        onEditContract,
        onFinishContract,
        onDeleteContract,
    } = props;

    const { contracts, contractsLoader, getContracts } = useGetContracts();
    const { params, resetQueryParams } = useGetQueryParams();

    const { pagination } = params;

    useEffect(() => {
        getContracts(contractType, currentTab, params);
    }, [contractType, currentTab]);

    useEffect(() => {
        return resetQueryParams();
    }, []);

    const getActiveContractActions = (text, record, idx) => {
        return (
            <Fragment>
                <Button
                    className="table-row-action"
                    type="link"
                    onClick={() => onEditContract(record)}
                >
                    Edit
                </Button>

                <Button
                    className="table-row-action"
                    type="link"
                    onClick={() => onFinishContract(record)}
                >
                    Finish
                </Button>
            </Fragment>
        );
    };

    const getArchiveContractActions = (text, record, idx) => {
        return (
            <Button type="link" onClick={() => onDeleteContract(record)}>
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

    const containersColumns = [
        ...columns.containers,
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: renderActionsColumn,
        },
    ];

    const commoditiesColumns = [
        ...columns.commodities,
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: renderActionsColumn,
        },
    ];

    const getColumns = () => {
        switch (contractType) {
            case CONTRACTS_TYPE.BUYER:
                return containersColumns;
            case CONTRACTS_TYPE.SELLER:
                return commoditiesColumns;
            default:
                return [];
        }
    };
    const onChangePagination = (pageNumber) => {
        const newParams = {
            ...params,
            pagination: {
                pageSize: pagination.pageSize,
                page: pageNumber,
            },
        };
        getContracts(contractType, currentTab, newParams);
    };

    const onShowSizeChange = (current, size) => {
        const newParams = {
            ...params,
            pagination: {
                pageSize: size,
                page: 1,
            },
        };
        getContracts(contractType, currentTab, newParams);
    };

    const paginationSettings = () => {
        return {
            pageSize: pagination.pageSize,
            current: pagination.page,
            total: pagination.total,
            defaultCurrent: 1,
            onChange: onChangePagination,
            onShowSizeChange: onShowSizeChange,
        };
    };
    return (
        <>
            <Table
                columns={getColumns()}
                data={contracts}
                pagination={paginationSettings()}
                loading={contractsLoader}
            />
        </>
    );
};
export default ContractsTable;
