import React from 'react';

import Table from '@Components/Table/Table';
import Button from '@Components/Button/Button';
import columns from './Columns';
import Loader from '@Components/Loader/Loader';

const DirectoryTable = (props) => {
    const { directoryType, data, onEditTableRow, directoryLoader } = props;

    const editHandler = (record) => {
        onEditTableRow(directoryType, record);
    };

    const renderActionsTemplate = (record) => {
        return (
            <Button type="link" onClick={() => editHandler(record)}>
                Edit
            </Button>
        );
    };

    const actions = [
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, record) => renderActionsTemplate(record),
        },
    ];

    const getColumns = () => {
        const fullColumns = [...columns[directoryType.key], ...actions];

        return fullColumns;
    };

    return (
        <Table
            columns={getColumns()}
            data={data}
            loading={directoryLoader}
            pagination={false}
            showHeader={false}
        />
    );
};

export default DirectoryTable;
