import React from 'react';
import { PlusOutlined } from '@ant-design/icons';

import {
    DIRECTORY_TYPE,
    DIRECTORY_NAME,
} from '@Context/Directory/Store/constants';

import Button from '@Components/Button/Button';
import Table from '@Components/Table/Table';

import columns from '../DirectoryTable/Columns';
import DirectoryTable from '../DirectoryTable/DirectoryTable';
import './DirectoryContent.scss';

const DirectoryContent = (props) => {
    const {
        directoryType,
        directory,
        editTableRowHandler,
        directoryLoader,
        addButtonClickHandler,
    } = props;

    const isCommodities = DIRECTORY_TYPE.COMMODITIES === directoryType.key;
    const isLogos = DIRECTORY_TYPE.LOGOS === directoryType.key;
    const getTitle = () => {
        return isCommodities ? 'Type' : isLogos ? 'Logo name' : 'Company name';
    };

    return (
        <div className="directory-content">
            <div className="directory-header">
                <div className="directory-title">{getTitle()}</div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={addButtonClickHandler}
                    className="directory-add-button"
                >
                    Add
                </Button>
            </div>

            <DirectoryTable
                directoryType={directoryType}
                data={directory}
                onEditTableRow={editTableRowHandler}
                directoryLoader={directoryLoader}
            />
        </div>
    );
};

export default DirectoryContent;
