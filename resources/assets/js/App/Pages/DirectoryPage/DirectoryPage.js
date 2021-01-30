import React, { useState, useEffect } from 'react';

import {
    DIRECTORY_TYPE,
    DIRECTORY_NAME,
    DIRECTORY_SINGULAR_NAME,
} from '@Context/Directory/Store/constants';

import { MODALS } from './constants';

import useGetDirectory from '@Context/Directory/Hooks/useGetDirectory';
import { DirectoryContext } from '@Context/Directory';
import useDirectoryActions from '@Context/Directory/Hooks/useDirectoryActions';

import Sider from '@Components/Sider/Sider';

import DirectoryContent from './Components/DirectoryContent/DirectoryContent';
import AddModal from './Components/Modals/AddModal/AddModal';
import EditModal from './Components/Modals/EditModal/EditModal';

import './DirectoryPage.scss';

const DirectoryPage = () => {
    const menu = [
        {
            key: DIRECTORY_TYPE.BUYERS,
            value: DIRECTORY_NAME[DIRECTORY_TYPE.BUYERS],
        },
        {
            key: DIRECTORY_TYPE.SELLERS,
            value: DIRECTORY_NAME[DIRECTORY_TYPE.SELLERS],
        },
        {
            key: DIRECTORY_TYPE.EXPORTERS,
            value: DIRECTORY_NAME[DIRECTORY_TYPE.EXPORTERS],
        },
        {
            key: DIRECTORY_TYPE.COMMODITIES,
            value: DIRECTORY_NAME[DIRECTORY_TYPE.COMMODITIES],
        },
        {
            key: DIRECTORY_TYPE.BANKS,
            value: DIRECTORY_NAME[DIRECTORY_TYPE.BANKS],
        },
        {
            key: DIRECTORY_TYPE.LOGOS,
            value: DIRECTORY_NAME[DIRECTORY_TYPE.LOGOS],
        },
    ];

    const {
        directory,
        directoryLoader,
        logos,
        getDirectoryRequest,
    } = useGetDirectory();
    const {
        modalLoader,
        success,
        addDirectoryRequest,
        editDirectoryRequest,
        setSuccess,
    } = useDirectoryActions();

    const [directoryType, setDirectoryType] = useState(menu[0]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [currentModal, setCurrentModal] = useState(null);
    const [rowData, setRowData] = useState(null);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        getDirectoryRequest(directoryType.key);
    }, []);

    const getDirectoryDisplayName = () => {
        return DIRECTORY_SINGULAR_NAME[directoryType.key];
    };

    const selectMenuItemHandler = (item) => {
        const { key } = item;
        const foundMenuItem = menu.find((menuItem) => menuItem.key === key);

        setDirectoryType(foundMenuItem);
        getDirectoryRequest(foundMenuItem.key);
    };

    const openModal = (modal) => {
        setSuccess(false);
        setCurrentModal(modal);
        setIsShowModal(true);
    };

    const closeModal = () => {
        setIsShowModal(false);
        setCurrentModal(null);
        setRowData(null);
        setErrors(null);
    };

    const addDirectoryHandler = (values) => {
        const data = {
            ...values,
        };

        addDirectoryRequest(directoryType.key, data, errorHandler);
    };

    const editBuyerHandler = (values) => {
        const { id } = rowData;
        const data = {
            ...values,
        };

        editDirectoryRequest(directoryType.key, id, data, errorHandler);
    };

    const okHandler = () => {
        closeModal();
        getDirectoryRequest(directoryType.key);
    };

    const errorHandler = (errors, data) => {
        setErrors(errors);
        setRowData(data);
    };

    const renderAddModal = () => {
        return (
            <AddModal
                isShowModal={isShowModal && currentModal === MODALS.ADD}
                directoryType={directoryType}
                logos={logos}
                directoryDisplayName={getDirectoryDisplayName()}
                modalLoader={modalLoader}
                success={success}
                closeModal={closeModal}
                onFinish={addDirectoryHandler}
                onOk={okHandler}
                rowData={rowData}
                errors={errors}
            />
        );
    };

    const renderEditModal = () => {
        return (
            <EditModal
                isShowModal={isShowModal && currentModal === MODALS.EDIT}
                directoryType={directoryType}
                logos={logos}
                directoryDisplayName={getDirectoryDisplayName()}
                modalLoader={modalLoader}
                success={success}
                closeModal={closeModal}
                onFinish={editBuyerHandler}
                onOk={okHandler}
                rowData={rowData}
                errors={errors}
            />
        );
    };

    const editTableRowHandler = (type, item) => {
        const data = { ...item };

        if (directoryType.key === DIRECTORY_TYPE.COMMODITIES) {
            data.logo_id = item.logo_id + '';
        }

        setRowData(data);
        openModal(MODALS.EDIT);
    };

    return (
        <>
            <div className="directory-page page">
                <div className="directory-wrapper">
                    <Sider
                        menu={menu}
                        selectMenuItem={selectMenuItemHandler}
                        selectedMenuItem={directoryType}
                    />
                    <DirectoryContent
                        directoryType={directoryType}
                        directory={directory}
                        editTableRowHandler={editTableRowHandler}
                        directoryLoader={directoryLoader}
                        addButtonClickHandler={() => openModal(MODALS.ADD)}
                    />
                </div>
            </div>

            {renderAddModal()}
            {renderEditModal()}
        </>
    );
};

const DirectoryPageWithContext = () => () => {
    return (
        <DirectoryContext>
            <DirectoryPage />
        </DirectoryContext>
    );
};

export default DirectoryPageWithContext();
