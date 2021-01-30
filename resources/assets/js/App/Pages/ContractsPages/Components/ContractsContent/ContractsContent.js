import React, { Fragment, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { debounce, get } from 'lodash';
import { CONTRACTS_STATUS } from '@Context/Contracts/Store/constants';
import {
    momentFormatDate,
    oneThousand,
    oneHundred,
} from '@Utils/formatHelpers';

import Button from '@Components/Button/Button';
import Input from '@Components/Input/Input';
import Card from '@Components/Card/Card';
import ContractsTable from '../ContractsTable/ContractsTable';

import useGetContracts from '@Context/Contracts/Hooks/useGetContracts';
import useGetQueryParams from '@Context/Contracts/Hooks/useGetQueryParams';
import ContractModal from '../../../../Components/Modals/ContractModal/ContractModal';
import EditContractModal from '../../../../Components/Modals/EditContractModal/EditContractModal';
import FinishContractModal from '@/App/Components/Modals/FinishContract/FinishContractModal';
import useContractActions from '@Context/Contract/Hooks/useContractActions';
import { MODALS, MODALS_TITLE } from '../../constants';
import DeleteContractModal from '@/App/Components/Modals/DeleteContract/DeleteContractModal';
import './ContractsContent.scss';

const ContractsContent = (props) => {
    const { currentRole, currentTab, contractType } = props;

    const [isShowModal, setIsShowModal] = useState(false);
    const [currentModal, setCurrentModal] = useState(null);
    const [initialModalValues, setInitialModalValues] = useState({});
    const [selectedContract, setSelectedContract] = useState(null);

    const {
        isSuccess,
        isLoading,
        setIsSuccess,
        addContract,
        editContract,
        deleteContract,
    } = useContractActions();

    let location = useLocation();

    const { getContracts } = useGetContracts();

    const { params } = useGetQueryParams();

    const isActiveTab = currentTab === CONTRACTS_STATUS.ACTIVE;

    const getTitle = () => {
        return isActiveTab
            ? 'List of active contracts'
            : 'List of archived contracts';
    };

    const getContractModalTitle = () => {
        const contractNumber = get(selectedContract, 'number', '');
        return `${MODALS_TITLE[currentModal]} ${contractNumber}`;
    };

    const onFinish = (values) => {
        switch (currentModal) {
            case MODALS.ADD:
                addContract(values, contractType);
                break;
            case MODALS.EDIT:
            case MODALS.EDIT_MAIN_SELLER_CONTRACT:
                editContract(values, selectedContract.id, contractType);
                break;
            case MODALS.DELETE:
                deleteContract(selectedContract.id, contractType);
                break;
            default:
                break;
        }
    };

    const updateDataOnModalClose = () => {
        closeModal();
        getContracts(contractType, currentTab, params);
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

    const editMainContractHandler = (contract) => {
        const { number } = contract;
        const result = {
            number,
        };

        openModal(MODALS.EDIT_MAIN_SELLER_CONTRACT);
        setInitialModalValues(result);
        setSelectedContract(contract);
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

    const renderCreateNewButton = () => {
        const showCreateButton = isActiveTab;
        return (
            showCreateButton && (
                <Button type="primary" onClick={() => openModal(MODALS.ADD)}>
                    Create new
                </Button>
            )
        );
    };

    const getContractsBySearch = (value) => {
        const newParams = {
            ...params,
            search: value,
        };
        getContracts(contractType, currentTab, newParams);
    };

    const searchBounce = debounce(getContractsBySearch, 500);

    const changeSerachValue = (ev) => {
        searchBounce(ev.target.value);
    };

    const renderSearchField = () => {
        return (
            <Input
                key={`${contractType}-${currentTab}`}
                inputType="search"
                placeholder="Search"
                onChange={changeSerachValue}
            />
        );
    };

    const cardExtraTemplate = () => {
        return (
            <Fragment>
                {renderCreateNewButton()}
                {renderSearchField()}
            </Fragment>
        );
    };

    const finishContractHandler = (contract) => {
        setIsShowModal(true);
        openModal(MODALS.FINISH);
        setSelectedContract(contract);
    };

    const renderFinishContractModal = () => {
        return (
            selectedContract &&
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

    const deleteContractHandler = (contract) => {
        setIsShowModal(true);
        openModal(MODALS.DELETE);
        setSelectedContract(contract);
    };

    const updateInitialValues = (initialValues) => {
        setInitialModalValues(initialValues);
    };

    const renderDeleteContractModal = () => {
        return (
            selectedContract &&
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

    const checkAddUpdateModal = () => {
        return currentModal === MODALS.ADD || currentModal === MODALS.EDIT;
    };

    const checkEditMainSellerContractModal = () => {
        return currentModal === MODALS.EDIT_MAIN_SELLER_CONTRACT;
    };

    const checkFinishModal = () => {
        return currentModal === MODALS.FINISH;
    };

    const checkDeleteModal = () => {
        return currentModal === MODALS.DELETE;
    };

    const renderContractModal = () => {
        return (
            checkAddUpdateModal() && (
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

    const renderEditContractModal = () => {
        return (
            checkEditMainSellerContractModal() && (
                <EditContractModal
                    title={getContractModalTitle()}
                    visible={isShowModal}
                    onCancel={closeModal}
                    initialValues={initialModalValues}
                    onFinish={onFinish}
                    success={isSuccess}
                    onOk={updateDataOnModalClose}
                    selectedContract={selectedContract}
                />
            )
        );
    };

    return (
        <div className="contracts page-content">
            <Card title={getTitle()} extra={cardExtraTemplate()}>
                <ContractsTable
                    currentTab={currentTab}
                    contractType={contractType}
                    currentRole={currentRole}
                    onEditContract={
                        location.pathname === '/seller-contracts'
                            ? editMainContractHandler
                            : editContractHandler
                    }
                    onFinishContract={finishContractHandler}
                    onDeleteContract={deleteContractHandler}
                />
            </Card>

            {renderContractModal()}
            {renderEditContractModal()}
            {renderFinishContractModal()}
            {renderDeleteContractModal()}
        </div>
    );
};

export default ContractsContent;
