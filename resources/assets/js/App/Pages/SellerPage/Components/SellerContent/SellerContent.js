import React, { useState, useEffect, useCallback } from 'react';

import Card from '@Components/Card/Card';
import RadioGroup from '@Components/RadioGroup/RadioGroup';
import Button from '@Components/Button/Button';
import Tabs from '@Components/Tabs/Tabs';
import SellerTable from './SellerTable/SellerTable';
import MainContractsTable from './MainContractsTable/MainContractsTable';
import ContractModal from '../../../../Components/Modals/ContractModal/ContractModal';
import { CONTRACTS_STATUS } from '@Context/Seller/Store/constants';
import {
    getQueryStringValue,
    setQueryStringValue,
    useQueryString,
    CONTRACTS_STATUS_TABS,
} from '@Utils/queryString';
import { TABLES, MODALS } from '../../constants';
import { useSellerActions } from '@Context/Seller/Hooks/useSellerActions';

import './SellerContent.scss';

const SellerContent = (props) => {
    const { seller, onRefreshMainContracts } = props;
    const {
        active_seller_contracts,
        archived_seller_contracts,
        active_main_seller_contracts = [],
        archived_main_seller_contracts = [],
    } = seller;

    const { modalLoader, isSuccess, createMainContract } = useSellerActions();

    const [currentTab, setCurrentTab] = useState(
        CONTRACTS_STATUS_TABS[0].value
    );

    const [currentModal, setCurrentModal] = useState(null);
    const [isShowModal, setIsShowModal] = useState(false);
    const [rowData, setRowData] = useState({});
    const [errors, setErrors] = useState(null);
    const [activeTabKey, setActiveTabKey] = useState(TABLES.MAIN_CONTRACTS);

    // const useQueryTableString = (key) => {
    //     const [tableValue, setValue] = useState(
    //         getQueryStringValue(key) || TABLES.MAIN_CONTRACTS
    //     );

    //     const onSetTableValue = useCallback(
    //         (newValue) => {
    //             setValue(newValue);
    //             setQueryStringValue(key, newValue);
    //         },
    //         [key]
    //     );

    //     return [tableValue, onSetTableValue];
    // };

    const [value, onSetValue] = useQueryString('currentTab');
    // const [tableValue, onSetTableValue] = useQueryTableString('currentTable');

    useEffect(() => {
        const abortController = new AbortController();

        onSetValue(value);
        setCurrentTab(value);
        // onSetTableValue(tableValue);
        // setActiveTabKey(tableValue);

        return function cleanup() {
            abortController.abort();
        };
    }, []);

    const getContracts = () => {
        switch (currentTab) {
            case CONTRACTS_STATUS.ACTIVE:
                return active_seller_contracts;
            case CONTRACTS_STATUS.ARCHIVE:
                return archived_seller_contracts;
            default:
                return [];
        }
    };

    const getMainContracts = () => {
        switch (currentTab) {
            case CONTRACTS_STATUS.ACTIVE:
                return active_main_seller_contracts;
            case CONTRACTS_STATUS.ARCHIVE:
                return archived_main_seller_contracts;
            default:
                return [];
        }
    };

    const changeContractsType = (e) => {
        const { value } = e.target;
        setCurrentTab(value);
        onSetValue(value);
    };

    const openModal = () => {
        setIsShowModal(true);
        setCurrentModal(MODALS.ADD);
    };

    const closeModal = () => {
        setIsShowModal(false);
        setCurrentModal(null);
    };

    const okHandler = () => {
        closeModal();
        onRefreshMainContracts();
    };

    const changeTabHandler = (key) => {
        setActiveTabKey(key);
        onSetTableValue(key);

        onSetValue(CONTRACTS_STATUS_TABS[0].value);
        setCurrentTab(CONTRACTS_STATUS_TABS[0].value);
    };

    const errorHandler = (errors, data) => {
        setErrors(errors);
        setRowData(data);
    };

    const createMainContractHandler = (values) => {
        const payload = {
            ...values,
            seller_id: seller.id,
        };
        createMainContract(payload, errorHandler);
    };

    const cardExtraTemplate = () => {
        return (
            <>
                <Button type="primary" onClick={openModal}>
                    Create new
                </Button>
                <RadioGroup
                    group={CONTRACTS_STATUS_TABS}
                    onChange={changeContractsType}
                    value={currentTab}
                />
            </>
        );
    };

    const getTabs = () => {
        const tabs = [
            {
                id: 'main-contracts',
                name: 'Main contracts',
                content: (
                    <Card title="Main contracts" extra={cardExtraTemplate()}>
                        <MainContractsTable contracts={getMainContracts()} />
                    </Card>
                ),
            },
            {
                id: 'contracts',
                name: 'Contracts',
                content: (
                    <Card title="Contracts" extra={cardExtraTemplate()}>
                        <SellerTable contracts={getContracts()} />
                    </Card>
                ),
            },
        ];

        return tabs;
    };

    const checkContractModal = () => {
        return currentModal === MODALS.ADD;
    };

    const updateInitialValues = (initialValues) => {
        setRowData(initialValues);
    };

    const renderCreateMainContractModal = () => {
        return (
            checkContractModal() && (
                <ContractModal
                    title="Create new contract"
                    visible={isShowModal}
                    onCancel={closeModal}
                    initialValues={rowData}
                    onFinish={createMainContractHandler}
                    success={isSuccess}
                    isLoader={modalLoader}
                    onOk={okHandler}
                    contractType="seller"
                    onUpdateInitialValues={updateInitialValues}
                />
            )
        );
    };

    return (
        <div className="seller-content">
            {/* <Tabs
                tabs={getTabs()}
                type="card"
                activeTabKey={activeTabKey}
                onChange={changeTabHandler}
            /> */}

            <Card title="Main contracts" extra={cardExtraTemplate()}>
                <MainContractsTable contracts={getMainContracts()} />
            </Card>

            {renderCreateMainContractModal()}
        </div>
    );
};

export default SellerContent;
