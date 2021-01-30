import React, { Fragment, useState, useEffect } from 'react';

import { debounce, get } from 'lodash';
import { CONTRACTS_STATUS } from '@Context/Contracts/Store/constants';
import { isAdminRole, isLogisticRole } from '@Utils/rolesHelper';
import {
    momentFormatDate,
    oneThousand,
    oneHundred,
} from '@Utils/formatHelpers';
import { useQueryString, CONTRACTS_STATUS_TABS } from '@Utils/queryString';

import Button from '@Components/Button/Button';
import Input from '@Components/Input/Input';
import Card from '@Components/Card/Card';

import { v4 as uuidv4 } from 'uuid';
import ContractsTable from '../Table/BuyerContractsTable';
import { ContractsContext } from '@Context/Contracts';
import { CONTRACTS_TYPE } from '@Context/Contracts/Store/constants';
import { useUserRole } from '@Context/Auth/Hooks/useUserRole';
import useContractActions from '@Context/Contract/Hooks/useContractActions';

import RadioGroup from '@Components/RadioGroup/RadioGroup';
import { MODALS, MODALS_TITLE } from '../../constans';
import ContractModal from '@/App/Components/Modals/ContractModal/ContractModal';
import FinishContractModal from '@/App/Components/Modals/FinishContract/FinishContractModal';
import DeleteContractModal from '@/App/Components/Modals/DeleteContract/DeleteContractModal';

// import './BuyerContent.scss';
import useGetContracts from '@Context/Contracts/Hooks/useGetContracts';
import useGetQueryParams from '@Context/Contracts/Hooks/useGetQueryParams';

const BUYER_CONTRACTS = {
    [CONTRACTS_STATUS.ACTIVE]: 'active_buyer_contracts',
    [CONTRACTS_STATUS.ARCHIVE]: 'archived_buyer_contracts',
};

const BuyerContent = (props) => {
    const contractType = 'buyer';
    const { buyer, onEdit } = props;

    const {
        isSuccess,
        isLoading,
        setIsSuccess,
        editContract,
        deleteContract,
    } = useContractActions();

    const [currentTab, setCurrentTab] = useState(
        CONTRACTS_STATUS_TABS[0].value
    );

    const [buyerContracts, setBuyerContracts] = useState(
        buyer[BUYER_CONTRACTS[currentTab]]
    );

    const [isShowModal, setIsShowModal] = useState(false);
    const [currentModal, setCurrentModal] = useState(null);
    const [selectedContract, setSelectedContract] = useState(null);
    const [initialModalValues, setInitialModalValues] = useState({});

    const isActiveTab = currentTab === CONTRACTS_STATUS.ACTIVE;

    const getTitle = () => {
        return isActiveTab
            ? 'List of active contracts'
            : 'List of archived contracts';
    };

    const [value, onSetValue] = useQueryString('currentTab');

    useEffect(() => {
        const abortController = new AbortController();

        onSetValue(value);
        setCurrentTab(value);
        setBuyerContracts(buyer[BUYER_CONTRACTS[value]]);

        return function cleanup() {
            abortController.abort();
        };
    }, []);

    const handleTabChange = (e) => {
        const { value } = e.target;
        setCurrentTab(value);
        setBuyerContracts(buyer[BUYER_CONTRACTS[value]]);
        onSetValue(value);
    };

    const renderRadioGroup = () => (
        <RadioGroup
            key={uuidv4()}
            group={CONTRACTS_STATUS_TABS}
            defaultGroupValue={currentTab}
            onChange={handleTabChange}
        />
    );

    const cardExtraTemplate = () => {
        return renderRadioGroup();
    };

    const openModal = (type) => {
        setIsShowModal(true);
        setCurrentModal(type);
    };

    const closeModal = () => {
        setIsShowModal(false);
        setCurrentModal(null);
        setIsSuccess(false);
        setInitialModalValues({});
        setSelectedContract({});
    };

    const updateDataOnModalClose = () => {
        closeModal();
        onEdit();
    };

    const editContractHandler = (contract) => {
        const {
            number,
            commodities,
            buyer_id,
            date_start,
            letter_of_credit,
            shipped_method,
            exporters,
            seller_id,
        } = contract;

        const generatedCommodities = [];
        const generatedQuantities = [];
        const generatedPrices = [];

        commodities.forEach((commodity, idx) => {
            const { pivot } = commodity;
            const { commodity_id, weight, pmt } = pivot;

            generatedCommodities.push([
                `commodity_${idx + 1}`,
                `${commodity_id}`,
            ]);
            generatedQuantities.push([
                `quantity_${idx + 1}`,
                weight / oneThousand,
            ]);
            generatedPrices.push([`pmt_${idx + 1}`, pmt / oneHundred]);
        });

        const result = {
            number,
            buyer_id: buyer_id + '',
            seller_id: seller_id + '',
            date_start: momentFormatDate(date_start),
            letter_of_credit,
            shipped_method,
            exporter_ids:
                exporters && exporters.map((exporter) => exporter.id + ''),
            ...Object.fromEntries(generatedCommodities),
            ...Object.fromEntries(generatedQuantities),
            ...Object.fromEntries(generatedPrices),
        };
        openModal(MODALS.EDIT);
        setInitialModalValues(result);
        setSelectedContract(contract);
    };

    const updateInitialValues = (initialValues) => {
        setInitialModalValues(initialValues);
    };

    const finishContractHandler = (contract) => {
        openModal(MODALS.FINISH);
        setSelectedContract(contract);
    };

    const deleteContractHandler = (contract) => {
        openModal(MODALS.DELETE);
        setSelectedContract(contract);
    };

    const checkEditContractModal = () => {
        return currentModal === MODALS.EDIT;
    };

    const checkFinishModal = () => {
        return currentModal === MODALS.FINISH;
    };

    const checkDeleteModal = () => {
        return currentModal === MODALS.DELETE;
    };

    const getContractModalTitle = () => {
        const contractNumber = get(selectedContract, 'number', '');
        return `${MODALS_TITLE[currentModal]} ${contractNumber}`;
    };

    const onFinish = (values) => {
        switch (currentModal) {
            case MODALS.EDIT:
                editContract(values, selectedContract.id, contractType);
                break;
            case MODALS.DELETE:
                deleteContract(selectedContract.id, contractType);
                break;
            default:
                break;
        }
    };

    const renderEditContractModal = () => {
        return (
            checkEditContractModal() && (
                <ContractModal
                    title={getContractModalTitle()}
                    visible={isShowModal}
                    onCancel={closeModal}
                    initialValues={initialModalValues}
                    onFinish={onFinish}
                    success={isSuccess}
                    onOk={updateDataOnModalClose}
                    contractType={contractType}
                    onUpdateInitialValues={updateInitialValues}
                />
            )
        );
    };

    const renderFinishContractModal = () => {
        return (
            checkFinishModal() && (
                <FinishContractModal
                    title={getContractModalTitle()}
                    isShowModal={isShowModal}
                    onClose={closeModal}
                    onOk={updateDataOnModalClose}
                    contract={selectedContract}
                    contractType={contractType}
                />
            )
        );
    };

    const renderDeleteContractModal = () => {
        return (
            checkDeleteModal() && (
                <DeleteContractModal
                    title={getContractModalTitle()}
                    isShowModal={isShowModal}
                    modalLoader={isLoading}
                    success={isSuccess}
                    closeModal={closeModal}
                    onFinish={onFinish}
                    onOk={updateDataOnModalClose}
                    contract={selectedContract}
                />
            )
        );
    };

    return (
        <div className="contracts page-content">
            <Card title={getTitle()} extra={cardExtraTemplate()}>
                <ContractsTable
                    contracts={buyerContracts}
                    currentTab={currentTab}
                    onEdit={editContractHandler}
                    onFinish={finishContractHandler}
                    onDelete={deleteContractHandler}
                />
            </Card>

            {renderEditContractModal()}
            {renderFinishContractModal()}
            {renderDeleteContractModal()}
        </div>
    );
};

export default BuyerContent;
