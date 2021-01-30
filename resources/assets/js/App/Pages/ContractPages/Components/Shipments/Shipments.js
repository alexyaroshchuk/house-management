import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Empty } from 'antd';
import moment from 'moment';

import { isEmpty } from 'lodash';
import { isAccountantRole } from '@Utils/rolesHelper';

import Card from '@Components/Card/Card';
import Button from '@Components/Button/Button';
import Loader from '@Components/Loader/Loader';
import AccountantAccordion from './AccountantAccordion';
import CommonAccordion from './CommonAccordion';

import { MODALS, PAYMENT_TYPE_VALUE, income, outcome } from './constants';
import AddShipmentModal from './AddShipmentModal/AddShipmentModal';
import EditShipmentModal from './EditShipmentModal/EditShipmentModal';
import MergeShipmentsModal from './MergeShipmentsModal/MergeShipmentsModal';
import AddContainerModal from './AddContainerModal/AddContainerModal';
import EditContainerModal from './EditContainerModal/EditContainerModal';
import DeleteContainerModal from './DeleteContainerModal/DeleteContainerModal';
import AddIncomeModal from './AddIncomeModal/AddIncomeModal';
import AddPaymentModal from './AddPaymentModal/AddPaymentModal';
import EditIncomeModal from './EditIncomeModal/EditIncomeModal';
import EditPaymentModal from './EditPaymentModal/EditPaymentModal';
import DeleteIncomeModal from './DeleteIncomeModal/DeleteIncomeModal';
import DeleteOutcomeModal from './DeleteOutcomeModal/DeleteOutcomeModal';
import ChangeShipmentStatusModal from './ChangeShipmentStatusModal/ChangeShipmentStatusModal';

import useShipmentsActions from '@Context/Contract/Hooks/useShipmentsActions';
import useGetContract from '@Context/Contract/Hooks/useGetContract';
import { CONTRACT_TYPE } from '@Context/Contract/Store/constants';

import './Shipments.scss';
import { oneThousand, oneHundred } from '@Utils/formatHelpers';

export const Shipments = (props) => {
    const { shipments, currentRole, isFinishedContract, banks } = props;
    const isAccountant = isAccountantRole(currentRole);

    const {
        isModalLoading,
        shipmentLoading,
        isSuccess,
        setIsSuccess,
        addShipment,
        editShipment,
        mergeShipments,
        changeShipmentStatus,
        addContainer,
        editContainer,
        deleteContainer,
        addShipmentIncomeOutcome,
        editShipmentIncomeOutcome,
        deleteShipmentIncomeOutcome,
    } = useShipmentsActions();

    const { contract, getShipments, isShipmentLoading } = useGetContract();

    const [isShowModal, setIsShowModal] = useState(false);
    const [currentModal, setCurrentModal] = useState(null);
    const [rowData, setRowData] = useState(null);
    const [errors, setErrors] = useState(null);
    const [selectedShipment, setSelectedShipment] = useState(null);
    const [selectedContainer, setSelectedContainer] = useState(null);
    const [selectedShipmentStatus, setSelectedShipmentStatus] = useState(null);

    const selectedAccountantDropdownHandler = (key, shipment) => {
        if (key === '0') {
            openModal(MODALS.ADD_INCOME);
        } else if (key === '1') {
            openModal(MODALS.ADD_PAYMENT);
        } else if (key === '2') {
            openModal(MODALS.MERGE_SHIPMENTS);
        }

        setSelectedShipment(shipment);
    };

    const selectedDropdownHandler = (key, shipment) => {
        if (key === '0') {
            openModal(MODALS.ADD_CONTAINER);
            setSelectedShipment(shipment);
        } else if (key === '1') {
            openModal(MODALS.EDIT_SHIPMENT);
            const initialValues = {
                ...shipment,
                date: moment(shipment.date),
            };
            setSelectedShipment(initialValues);
        } else if (key === '2') {
            openModal(MODALS.MERGE_SHIPMENTS);
            setSelectedShipment(shipment);
        }
    };

    const editSelectedContainerHandler = (container) => {
        const data = {
            ...container,
            quantity: container.quantity / oneThousand,
        };
        setSelectedContainer(data);
        openModal(MODALS.EDIT_CONTAINER);
    };

    const deleteSelectedContainerHandler = (container) => {
        openModal(MODALS.DELETE_CONTAINER);
        setSelectedContainer(container);
    };

    const changeStatusHandler = (shipment, status) => {
        openModal(MODALS.CHANGE_SHIPMENT_STATUS);
        setSelectedShipment(shipment);
        setSelectedShipmentStatus(status);
    };

    const editSelectedShipmentHandler = (shipment) => {
        const { type } = shipment;

        const initialValues = {
            ...shipment,
            date: moment(shipment.date),
            bank_id: shipment.bank_id + '',
            payment_type:
                shipment.payment_type === PAYMENT_TYPE_VALUE.DOWN
                    ? PAYMENT_TYPE_VALUE.DOWN
                    : PAYMENT_TYPE_VALUE.POST,
            contractor_id: shipment.contractor_id + '',
        };

        setSelectedShipment(initialValues);

        switch (type) {
            case income:
                openModal(MODALS.EDIT_INCOME);
                break;
            case outcome:
                openModal(MODALS.EDIT_PAYMENT);
                break;
            default:
                break;
        }
    };

    const deleteSelectedShipmentHandler = (shipment) => {
        const { type } = shipment;

        switch (type) {
            case income:
                openModal(MODALS.DELETE_INCOME);
                break;
            case outcome:
                openModal(MODALS.DELETE_PAYMENT);
                break;
            default:
                break;
        }

        setSelectedShipment(shipment);
    };

    const renderAccordion = () => {
        return isAccountant ? (
            <AccountantAccordion
                shipments={shipments}
                onSelectDropdown={selectedAccountantDropdownHandler}
                onEdit={editSelectedShipmentHandler}
                onDelete={deleteSelectedShipmentHandler}
                onChangeStatus={changeStatusHandler}
                isFinishedContract={isFinishedContract}
            />
        ) : (
            <CommonAccordion
                shipments={shipments}
                onSelectDropdown={selectedDropdownHandler}
                onEdit={editSelectedContainerHandler}
                onDelete={deleteSelectedContainerHandler}
                onChangeStatus={changeStatusHandler}
                isFinishedContract={isFinishedContract}
            />
        );
    };

    const openModal = (type) => {
        setIsShowModal(true);
        setCurrentModal(type);
    };

    const closeModal = () => {
        setCurrentModal(null);
        setIsShowModal(false);
        setIsSuccess(false);
        setRowData(null);
        setErrors(null);
    };

    const okHandler = () => {
        closeModal();
        getShipments(CONTRACT_TYPE.BUYER, contract.id);
    };

    const renderCardExtraTemplate = () => {
        return (
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => openModal(MODALS.ADD_SHIPMENT)}
            >
                Add
            </Button>
        );
    };

    const renderEmptySection = () => {
        return <Empty />;
    };

    const renderLoader = () => (
        <Loader size="large" fullscreen style="white fill" />
    );

    const errorHandler = (errors, data) => {
        setErrors(errors);
        setRowData(data);
    };

    const addShipmentHandler = (values) => {
        const payload = {
            name: values.name,
            date: values.date,
            number: values.number,
            contract_id: contract.id,
        };
        addShipment(payload, errorHandler);
    };

    const editShipmentHandler = (values) => {
        const payload = {
            name: values.name,
            date: values.date,
            number: values.number,
            contract_id: contract.id,
        };
        editShipment(payload, selectedShipment.id, errorHandler);
    };

    const addContainerHandler = (values) => {
        const payload = {
            ...values,
            quantity: values.quantity * oneThousand,
            shipment_id: selectedShipment.id,
        };
        addContainer(payload, errorHandler);
    };

    const editContainerHandler = (values, shipment_id) => {
        const payload = {
            ...values,
            quantity: values.quantity * oneThousand,
            shipment_id,
        };
        editContainer(payload, selectedContainer.id, errorHandler);
    };

    const mergeShipmentsHandler = (values) => {
        const payload = {
            ...values,
            master_shipment_id: selectedShipment.id,
        };
        mergeShipments(payload);
    };

    const deleteContainerHandler = (id) => {
        deleteContainer(id, errorHandler);
    };

    const addIncomeHandler = (values) => {
        const payload = {
            ...values,
            amount: values.amount * oneHundred,
            type: income,
            shipment_id: selectedShipment.id,
            contractor_id: contract.buyer_id,
        };
        addShipmentIncomeOutcome(payload, errorHandler);
    };

    const addPaymentHandler = (values) => {
        const payload = {
            ...values,
            amount: values.amount * oneHundred,
            type: outcome,
            shipment_id: selectedShipment.id,
        };
        addShipmentIncomeOutcome(payload, errorHandler);
    };

    const editIncomeHandler = (values) => {
        const payload = {
            ...values,
            amount: values.amount * oneHundred,
            type: income,
            shipment_id: selectedShipment.shipment_id,
            contractor_id: selectedShipment.contractor_id,
        };
        editShipmentIncomeOutcome(payload, selectedShipment.id, errorHandler);
    };

    const editPaymentHandler = (values) => {
        const payload = {
            ...values,
            amount: values.amount * oneHundred,
            type: outcome,
            shipment_id: selectedShipment.shipment_id,
            contractor_id: selectedShipment.contractor_id,
        };
        editShipmentIncomeOutcome(payload, selectedShipment.id, errorHandler);
    };

    const deleteIncomeOutcomeHandler = () => {
        deleteShipmentIncomeOutcome(selectedShipment.id, errorHandler);
    };

    const changeShipmentStatusHandler = () => {
        const payload = {
            status: selectedShipmentStatus,
        };
        changeShipmentStatus(payload, selectedShipment.id);
    };

    const checkAddContainerModal = () => {
        return currentModal === MODALS.ADD_CONTAINER;
    };

    const checkEditContainerModal = () => {
        return currentModal === MODALS.EDIT_CONTAINER;
    };

    const checkMergeShipmentsModal = () => {
        return currentModal === MODALS.MERGE_SHIPMENTS;
    };

    const checkDeleteContainerModal = () => {
        return currentModal === MODALS.DELETE_CONTAINER;
    };

    const checkAddIncomeModal = () => {
        return currentModal === MODALS.ADD_INCOME;
    };

    const checkAddPaymentModal = () => {
        return currentModal === MODALS.ADD_PAYMENT;
    };

    const checkEditIncomeModal = () => {
        return currentModal === MODALS.EDIT_INCOME;
    };

    const checkEditPaymentModal = () => {
        return currentModal === MODALS.EDIT_PAYMENT;
    };

    const renderAddShipmentModal = () => {
        return (
            <AddShipmentModal
                isShowModal={
                    isShowModal && currentModal === MODALS.ADD_SHIPMENT
                }
                modalLoader={isModalLoading}
                success={isSuccess}
                closeModal={closeModal}
                onFinish={addShipmentHandler}
                onOk={okHandler}
                className="add-shipment-modal shipment-modal"
                rowData={rowData}
                errors={errors}
            />
        );
    };

    const renderEditShipmentModal = () => {
        return (
            <EditShipmentModal
                isShowModal={
                    isShowModal && currentModal === MODALS.EDIT_SHIPMENT
                }
                modalLoader={isModalLoading}
                success={isSuccess}
                closeModal={closeModal}
                onFinish={editShipmentHandler}
                onOk={okHandler}
                className="edit-shipment-modal shipment-modal"
                rowData={selectedShipment}
                errors={errors}
            />
        );
    };

    const renderAddContainerModal = () => {
        return (
            checkAddContainerModal() && (
                <AddContainerModal
                    isShowModal={isShowModal}
                    isModalLoading={isModalLoading}
                    contract={contract}
                    success={isSuccess}
                    closeModal={closeModal}
                    onFinish={addContainerHandler}
                    onOk={okHandler}
                    className="add-container-modal container-modal"
                    rowData={rowData}
                    errors={errors}
                />
            )
        );
    };

    const renderEditContainerModal = () => {
        return (
            checkEditContainerModal() && (
                <EditContainerModal
                    isShowModal={isShowModal}
                    isModalLoading={isModalLoading}
                    contract={contract}
                    success={isSuccess}
                    closeModal={closeModal}
                    onFinish={editContainerHandler}
                    onOk={okHandler}
                    className="edit-container-modal container-modal"
                    rowData={selectedContainer}
                    errors={errors}
                />
            )
        );
    };

    const renderMergeShipmentsModal = () => {
        return (
            checkMergeShipmentsModal() && (
                <MergeShipmentsModal
                    isShowModal={isShowModal}
                    isModalLoading={isModalLoading}
                    shipments={shipments}
                    success={isSuccess}
                    closeModal={closeModal}
                    onFinish={mergeShipmentsHandler}
                    onOk={okHandler}
                    className="merge-shipments-modal shipments-modal"
                    selectedShipment={selectedShipment}
                    errors={errors}
                />
            )
        );
    };

    const renderDeleteContainerModal = () => {
        return (
            checkDeleteContainerModal() && (
                <DeleteContainerModal
                    isShowModal={isShowModal}
                    isModalLoading={isModalLoading}
                    success={isSuccess}
                    closeModal={closeModal}
                    onFinish={deleteContainerHandler}
                    onOk={okHandler}
                    className="delete-container-modal container-modal"
                    rowData={selectedContainer}
                    errors={errors}
                />
            )
        );
    };

    const renderAddIncomeModal = () => {
        return (
            checkAddIncomeModal() && (
                <AddIncomeModal
                    banks={banks}
                    isShowModal={isShowModal}
                    isModalLoading={isModalLoading}
                    success={isSuccess}
                    closeModal={closeModal}
                    onFinish={addIncomeHandler}
                    onOk={okHandler}
                    className="add-income-modal income-modal"
                    rowData={selectedContainer}
                    errors={errors}
                />
            )
        );
    };

    const renderAddPaymentModal = () => {
        return (
            checkAddPaymentModal() && (
                <AddPaymentModal
                    banks={banks}
                    contract={contract}
                    isShowModal={isShowModal}
                    isModalLoading={isModalLoading}
                    success={isSuccess}
                    closeModal={closeModal}
                    onFinish={addPaymentHandler}
                    onOk={okHandler}
                    className="add-payment-modal payment-modal"
                    rowData={selectedContainer}
                    errors={errors}
                />
            )
        );
    };

    const renderEditIncomeModal = () => {
        return (
            checkEditIncomeModal() && (
                <EditIncomeModal
                    banks={banks}
                    isShowModal={isShowModal}
                    isModalLoading={isModalLoading}
                    success={isSuccess}
                    closeModal={closeModal}
                    onFinish={editIncomeHandler}
                    onOk={okHandler}
                    className="edit-income-modal income-modal"
                    initialValues={selectedShipment}
                    errors={errors}
                />
            )
        );
    };

    const renderEditPaymentModal = () => {
        return (
            checkEditPaymentModal() && (
                <EditPaymentModal
                    banks={banks}
                    contract={contract}
                    isShowModal={isShowModal}
                    isModalLoading={isModalLoading}
                    success={isSuccess}
                    closeModal={closeModal}
                    onFinish={editPaymentHandler}
                    onOk={okHandler}
                    className="edit-payment-modal payment-modal"
                    initialValues={selectedShipment}
                    errors={errors}
                />
            )
        );
    };

    const renderDeleteIncomeModal = () => {
        return (
            <DeleteIncomeModal
                isShowModal={
                    isShowModal && currentModal === MODALS.DELETE_INCOME
                }
                isModalLoading={isModalLoading}
                success={isSuccess}
                closeModal={closeModal}
                onFinish={deleteIncomeOutcomeHandler}
                onOk={okHandler}
                className="delete-income-modal income-modal"
                errors={errors}
            />
        );
    };

    const renderDeleteOutcomeModal = () => {
        return (
            <DeleteOutcomeModal
                isShowModal={
                    isShowModal && currentModal === MODALS.DELETE_PAYMENT
                }
                isModalLoading={isModalLoading}
                success={isSuccess}
                closeModal={closeModal}
                onFinish={deleteIncomeOutcomeHandler}
                onOk={okHandler}
                className="delete-outcome-modal outcome-modal"
                errors={errors}
            />
        );
    };

    const renderChangeShipmentStatusModal = () => {
        return (
            <ChangeShipmentStatusModal
                isShowModal={
                    isShowModal &&
                    currentModal === MODALS.CHANGE_SHIPMENT_STATUS
                }
                isModalLoading={isModalLoading}
                success={isSuccess}
                closeModal={closeModal}
                onFinish={changeShipmentStatusHandler}
                onOk={okHandler}
                className="change-shipment-status-modal shipment-status-modal"
            />
        );
    };

    return (
        <div className="shipments">
            <Card
                title="Shipments"
                extra={!isFinishedContract ? renderCardExtraTemplate() : null}
            >
                {isShipmentLoading ? renderLoader() : null}
                {isEmpty(shipments) ? renderEmptySection() : renderAccordion()}
            </Card>

            {renderAddShipmentModal()}
            {renderEditShipmentModal()}
            {renderAddContainerModal()}
            {renderEditContainerModal()}
            {renderMergeShipmentsModal()}
            {renderDeleteContainerModal()}
            {renderAddIncomeModal()}
            {renderAddPaymentModal()}
            {renderEditIncomeModal()}
            {renderEditPaymentModal()}
            {renderDeleteIncomeModal()}
            {renderDeleteOutcomeModal()}
            {renderChangeShipmentStatusModal()}
        </div>
    );
};
