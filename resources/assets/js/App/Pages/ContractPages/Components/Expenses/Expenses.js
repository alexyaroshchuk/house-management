import React, { useState, useEffect } from 'react';
import { PlusOutlined, SwapOutlined } from '@ant-design/icons';
import { Empty } from 'antd';
import moment from 'moment';

import { isEmpty } from 'lodash';
import { formatCurrency, oneHundred } from '@Utils/formatHelpers';
import { ROLES, isAdminRole, isAccountantRole } from '@Utils/rolesHelper';
import { sortArrayByObjKey } from '@Utils/helpers';

import Card from '@Components/Card/Card';
import Accordion from '@Components/Accordion/Accordion';
import Button from '@Components/Button/Button';
import Loader from '@Components/Loader/Loader';
import { ExpensesTable } from './ExpensesTable';

import { MODALS } from './constants';
import useGetContract from '@Context/Contract/Hooks/useGetContract';
import useExpensesActions from '@Context/Contract/Hooks/useExpensesActions';
import AddExpenseModal from './AddExpenseModal/AddExpenseModal';
import EditExpenseModal from './EditExpenseModal/EditExpenseModal';
import DeleteExpenseModal from './DeleteExpenseModal/DeleteExpenseModal';
import TransferModal from './TransferModal/TransferModal';
import { CONTRACT_TYPE } from '@Context/Contract/Store/constants';

import './Expenses.scss';

export const Expenses = (props) => {
    const {
        expenses,
        shipments,
        currentRole,
        isFinishedContract,
        banks,
    } = props;

    const { contract, isExpensesLoading, getExpenses } = useGetContract();
    const {
        isModalLoading,
        isSuccess,
        addExpense,
        editExpense,
        deleteExpense,
        transfer,
        setIsSuccess,
    } = useExpensesActions();

    const expenseTypeInitialValue = { expense_type: 'logistic' };

    const [isShowModal, setIsShowModal] = useState(false);
    const [currentModal, setCurrentModal] = useState(null);
    const [initialValues, setInitialValues] = useState(expenseTypeInitialValue);
    const [selectedExpenseType, setSelectedExpenseType] = useState(null);
    const [errors, setErrors] = useState(null);

    const renderExpensesAccordionHeader = (title, total) => {
        return (
            <div className="expenses-header">
                <div className="expenses-left">
                    <span className="title">Expenses type</span>
                    <span>{title}</span>
                </div>
                <div className="expenses-right expenses-text-right">
                    <span className="title">Total</span>
                    <span>{formatCurrency(total)}</span>
                </div>
            </div>
        );
    };

    const editSelectedExpenseHandler = (expense, expense_type) => {
        const foundExpenseType = banks.find(
            (bank) => bank.id === expense.bank_id
        );

        openModal(MODALS.EDIT_EXPENSE);
        setInitialValues({
            ...expense,
            date: moment(expense.date),
            expense_type,
            bank_id: foundExpenseType ? String(foundExpenseType.id) : null,
            shipment_id: expense.shipment ? `${expense.shipment.id}` : null,
        });
        setSelectedExpenseType(expense);
    };

    const deleteSelectedExpenseHandler = (expense) => {
        openModal(MODALS.DELETE_EXPENSE);
        setSelectedExpenseType(expense);
    };

    const renderExpensesTable = (expensesList, expense_type) => {
        return (
            <ExpensesTable
                data={expensesList}
                loading={isExpensesLoading}
                expense_type={expense_type}
                banks={banks}
                onEdit={editSelectedExpenseHandler}
                onDelete={deleteSelectedExpenseHandler}
                isFinishedContract={isFinishedContract}
            />
        );
    };

    const openModal = (type) => {
        setIsShowModal(true);
        setCurrentModal(type);
    };

    const closeModal = () => {
        setIsShowModal(false);
        setInitialValues(expenseTypeInitialValue);
        setCurrentModal(null);
        setErrors(null);
        setIsSuccess(false);
    };

    const okHandler = () => {
        closeModal();
        getExpenses(CONTRACT_TYPE.BUYER, contract.id);
    };

    const renderCardExtraTemplate = () => {
        return (
            <>
                {isAdminRole(currentRole) || isAccountantRole(currentRole) ? (
                    <Button
                        type="primary"
                        icon={<SwapOutlined />}
                        onClick={() => openModal(MODALS.TRANSFER)}
                        className="transfer"
                    >
                        Transfer
                    </Button>
                ) : null}
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => openModal(MODALS.ADD_EXPENSE)}
                >
                    Add
                </Button>
            </>
        );
    };

    const errorHandler = (errors, data) => {
        setErrors(errors);
        setInitialValues(data);
    };

    const addExpenseHandler = (values) => {
        const payload = {
            ...values,
            amount: values.amount * oneHundred,
            contract_id: contract.id,
        };

        addExpense(payload, errorHandler);
    };

    const editExpenseHandler = (values) => {
        const payload = {
            ...values,
            amount: values.amount * oneHundred,
            contract_id: contract.id,
        };

        editExpense(payload, selectedExpenseType.id, errorHandler);
    };

    const deleteExpenseHandler = () => {
        deleteExpense(selectedExpenseType.id);
    };

    const transferHandler = (values) => {
        const data = {
            ...values,
            amount: values.amount * oneHundred,
            contract_id: contract.id,
        };
        transfer(data);
    };

    const nonEditableType = 'misc';

    const sortedExpenses = sortArrayByObjKey(
        expenses,
        'expense_type',
        nonEditableType
    );

    const expensesData = sortedExpenses.map((expense) => {
        const {
            contract_id,
            expense_type,
            total_amount,
            expenses: expensesList,
        } = expense;

        return {
            id: contract_id,
            header: renderExpensesAccordionHeader(
                expense_type,
                total_amount / oneHundred
            ),
            render: renderExpensesTable(expensesList, expense_type),
            disabled:
                ROLES.LOGISTIC === currentRole &&
                expense_type === nonEditableType
                    ? true
                    : false,
        };
    });

    const renderLoader = () => (
        <Loader size="large" fullscreen style="white fill" />
    );

    const checkAddExpenseModal = () => {
        return currentModal === MODALS.ADD_EXPENSE;
    };

    const checkEditExpenseModal = () => {
        return currentModal === MODALS.EDIT_EXPENSE;
    };

    const checkDeleteExpenseModal = () => {
        return currentModal === MODALS.DELETE_EXPENSE;
    };

    const checkTransferModal = () => {
        return currentModal === MODALS.TRANSFER;
    };

    const renderAddExpenseModal = () => {
        return (
            checkAddExpenseModal() && (
                <AddExpenseModal
                    banks={banks}
                    shipments={shipments}
                    isShowModal={isShowModal}
                    isModalLoader={isModalLoading}
                    success={isSuccess}
                    closeModal={closeModal}
                    onFinish={addExpenseHandler}
                    onOk={okHandler}
                    className="add-expense-modal expense-modal"
                    initialValues={initialValues}
                    errors={errors}
                />
            )
        );
    };

    const renderEditExpenseModal = () => {
        return (
            checkEditExpenseModal() && (
                <EditExpenseModal
                    banks={banks}
                    shipments={shipments}
                    isShowModal={isShowModal}
                    isModalLoader={isModalLoading}
                    success={isSuccess}
                    closeModal={closeModal}
                    onFinish={editExpenseHandler}
                    onOk={okHandler}
                    className="edit-expense-modal expense-modal"
                    initialValues={initialValues}
                    errors={errors}
                />
            )
        );
    };

    const renderDeleteExpenseModal = () => {
        return (
            checkDeleteExpenseModal() && (
                <DeleteExpenseModal
                    isShowModal={isShowModal}
                    isModalLoader={isModalLoading}
                    success={isSuccess}
                    closeModal={closeModal}
                    onFinish={deleteExpenseHandler}
                    onOk={okHandler}
                    className="delete-expense-modal expense-modal"
                    initialValues={initialValues}
                    errors={errors}
                />
            )
        );
    };

    const renderTransferModal = () => {
        return (
            checkTransferModal() && (
                <TransferModal
                    banks={banks}
                    isShowModal={isShowModal}
                    isModalLoader={isModalLoading}
                    success={isSuccess}
                    closeModal={closeModal}
                    onFinish={transferHandler}
                    onOk={okHandler}
                    className="transfer-modal"
                    initialValues={initialValues}
                    errors={errors}
                />
            )
        );
    };

    return (
        <div className="expenses">
            <Card
                title="Expenses"
                extra={!isFinishedContract ? renderCardExtraTemplate() : null}
            >
                {isExpensesLoading ? renderLoader() : null}

                {isEmpty(expenses) ? (
                    <Empty />
                ) : (
                    <Accordion panels={expensesData} />
                )}
            </Card>

            {renderAddExpenseModal()}
            {renderEditExpenseModal()}
            {renderDeleteExpenseModal()}
            {renderTransferModal()}
        </div>
    );
};
