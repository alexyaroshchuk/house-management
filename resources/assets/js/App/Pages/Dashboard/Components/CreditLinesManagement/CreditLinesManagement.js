import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

import './CreditLinesManagement.scss';
import Card from '@Components/Card/Card';
import Table from '@Components/Table/Table';
import Button from '@Components/Button/Button';

import { MODALS } from '../../constants';
import {
    formatDate,
    formatCurrency,
    momentFormatDate,
    oneHundred,
} from '@Utils/formatHelpers';

import AddCreditLineModal from '../AddCreditLineModal/AddCreditLineModal';
import EditCreditLineModal from '../EditCreditLineModal/EditCreditLineModal';
import DeleteCreditLineModal from '../DeleteCreditLineModal/DeleteCreditLineModal';

import useCreditLineActions from '@Context/Dashboard/Hooks/useCreditLineActions';

const CreditLinesManagement = (props) => {
    const { credits, onOk } = props;

    const {
        isModalLoading,
        isSuccess,
        setIsSuccess,
        addCreditLine,
        editCreditLine,
        deleteCreditLine,
    } = useCreditLineActions();

    const [isShowModal, setIsShowModal] = useState(false);
    const [currentModal, setCurrentModal] = useState(null);
    const [currentCredit, setCurrentCredit] = useState(null);
    const [errors, setErrors] = useState(null);
    const [initialValues, setInitialValues] = useState({});

    const openModal = (type) => {
        setIsShowModal(true);
        setCurrentModal(type);
    };

    const closeModal = () => {
        setIsShowModal(false);
        setInitialValues({});
        setCurrentModal(null);
        setErrors(null);
        setIsSuccess(false);
        setCurrentCredit(null);
    };

    const okHandler = () => {
        closeModal();
        onOk();
    };

    const editCreditHandler = (credit) => {
        const values = {
            ...credit,
            amount: credit.amount / oneHundred,
            bank_id: String(credit.bank_id),
            date: momentFormatDate(credit.date),
        };

        setInitialValues(values);
        openModal(MODALS.UPDATE);
        setCurrentCredit(credit);
    };

    const finishCreditHandler = (credit) => {
        openModal(MODALS.FINISH);
        setCurrentCredit(credit);
    };

    const renderActionsColumn = (text, record) => {
        return (
            <>
                <Button
                    className="table-row-action"
                    type="link"
                    onClick={() => editCreditHandler(record)}
                >
                    Update
                </Button>

                <Button
                    className="table-row-action"
                    type="link"
                    onClick={() => finishCreditHandler(record)}
                >
                    Finish
                </Button>
            </>
        );
    };

    const renderCreditLinesManagementExtra = () => {
        return (
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => openModal(MODALS.CREATE)}
            >
                Create new
            </Button>
        );
    };

    const columns = [
        {
            title: 'Bank name',
            dataIndex: 'bank_id',
            key: 'bank_id',
            render: (text, record) => record.bank.title,
        },
        {
            title: 'Credit number',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text, record) => formatDate(record.date),
        },
        {
            title: 'Credit',
            dataIndex: 'amount',
            key: 'amount',
            render: (text, record) =>
                formatCurrency(record.amount / oneHundred),
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: renderActionsColumn,
        },
    ];

    const errorHandler = (errors, data) => {
        setErrors(errors);
        setInitialValues(data);
    };

    const addCreditLineHandler = (values) => {
        const result = {
            ...values,
            amount: values.amount * oneHundred,
        };

        addCreditLine(result, errorHandler);
    };

    const editCreditLineHandler = (values) => {
        const result = {
            ...values,
            amount: values.amount * oneHundred,
        };

        editCreditLine(result, currentCredit.id, errorHandler);
    };

    const deleteCreditLineHandler = () => {
        deleteCreditLine(currentCredit.id, errorHandler);
    };

    const checkAddCreditLineModal = () => {
        return currentModal === MODALS.CREATE;
    };

    const checkEditCreditLineModal = () => {
        return currentModal === MODALS.UPDATE;
    };

    const checkDeleteCreditLineModal = () => {
        return currentModal === MODALS.FINISH;
    };

    const renderAddCreditLineModal = () => {
        return (
            checkAddCreditLineModal() && (
                <AddCreditLineModal
                    isShowModal={isShowModal}
                    isModalLoader={isModalLoading}
                    success={isSuccess}
                    closeModal={closeModal}
                    onFinish={addCreditLineHandler}
                    onOk={okHandler}
                    initialValues={initialValues}
                    errors={errors}
                />
            )
        );
    };

    const renderEditCreditLineModal = () => {
        return (
            checkEditCreditLineModal() && (
                <EditCreditLineModal
                    isShowModal={isShowModal}
                    isModalLoader={isModalLoading}
                    success={isSuccess}
                    closeModal={closeModal}
                    onFinish={editCreditLineHandler}
                    onOk={okHandler}
                    initialValues={initialValues}
                    errors={errors}
                />
            )
        );
    };

    const renderDeleteCreditLineModal = () => {
        return (
            checkDeleteCreditLineModal() && (
                <DeleteCreditLineModal
                    isShowModal={isShowModal}
                    isModalLoader={isModalLoading}
                    success={isSuccess}
                    closeModal={closeModal}
                    onFinish={deleteCreditLineHandler}
                    onOk={okHandler}
                    initialValues={initialValues}
                    errors={errors}
                />
            )
        );
    };

    return (
        <div className="credit-lines-management">
            <Card
                title="Credit lines management"
                extra={renderCreditLinesManagementExtra()}
            >
                <Table data={credits} columns={columns} />
            </Card>

            {renderAddCreditLineModal()}
            {renderEditCreditLineModal()}
            {renderDeleteCreditLineModal()}
        </div>
    );
};

export default CreditLinesManagement;
