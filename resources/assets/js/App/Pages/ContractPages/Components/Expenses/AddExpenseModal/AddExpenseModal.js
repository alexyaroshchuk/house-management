import React, { useState, useEffect } from 'react';

import './AddExpenseModal.scss';
import Modal from '@Components/Modal/Modal';
import RadioGroup from '@Components/RadioGroup/RadioGroup';
import Select from '@Components/Select/Select';
import Input from '@Components/Input/Input';
import Datepicker from '@Components/Datepicker/Datepicker';
import Form from '@Components/Form/Form';
import Loader from '@Components/Loader/Loader';
import Button from '@Components/Button/Button';
import { momentDatePickerFormat } from '@Utils/formatHelpers';
import { numberFieldValidator } from '@Utils/helpers';

import useGetExpenseTypes from '@Context/Contract/Hooks/useGetExpenseTypes';
import useGetExpenses from '@Context/Contract/Hooks/useGetExpenses';

const renderDatepicker = () => {
    return <Datepicker format={momentDatePickerFormat()} />;
};

const renderInput = () => {
    return <Input placeholder="Enter payment" prefix="$" />;
};

const renderExpensesSelect = (expenses) => {
    const options = expenses.map((expense, id) => {
        return {
            id: id + 1,
            value: expense,
            text: expense,
        };
    });

    return <Select options={options} placeholder="Select expense type" />;
};

const renderExpensesInput = () => {
    return <Input placeholder="Enter expense" />;
};

const renderPaymentTypeSelect = (banks) => {
    const options = banks.map((bank) => {
        const { id, title } = bank;
        return {
            id,
            value: id + '',
            text: title,
        };
    });

    return <Select options={options} placeholder="Select payment type" />;
};

const renderShipmentSelect = (shipments) => {
    const options = shipments.map((shipment) => {
        const { id, name, number } = shipment;
        return {
            id,
            value: id + '',
            text: `${name} - ${number}`,
        };
    });

    return <Select options={options} placeholder="Select shipment" />;
};

const AddExpenseModal = (props) => {
    const {
        banks,
        shipments,
        isShowModal,
        isModalLoader,
        closeModal,
        success,
        onFinish,
        onOk,
        initialValues = {},
        errors,
    } = props;

    const logistic = 'logistic';

    const { expenseTypes, getExpenseTypes } = useGetExpenseTypes();
    const { expenses, modalLoader, getExpenses } = useGetExpenses();

    const [radioGroupValue, setRadioGroupValue] = useState(
        initialValues['expense_type']
    );

    const renderRadioGroup = (expenseTypes) => {
        const changeHandler = (e) => {
            const { value } = e.target;

            setRadioGroupValue(value);
        };

        return (
            <RadioGroup
                radio={true}
                group={expenseTypes}
                onChange={changeHandler}
            />
        );
    };

    useEffect(() => {
        getExpenseTypes();
        getExpenses();
    }, []);

    const formConfig = {
        name: 'add-expense-form',
        onFinish: onFinish,
        layout: 'vertical',
    };

    const switchExpenseTypeElement = () => {
        return {
            name: 'description',
            className: 'description',
            rules: [
                {
                    required: true,
                    message: 'Please, select expense type',
                },
            ],
            label: 'Expense type',
            render: () =>
                radioGroupValue === logistic
                    ? renderExpensesSelect(expenses)
                    : renderExpensesInput(),
        };
    };

    const elements = [
        {
            name: 'expense_type',
            className: 'expense-type',
            render: () => renderRadioGroup(expenseTypes),
        },
        switchExpenseTypeElement(),
        {
            name: 'date',
            className: 'date',
            label: 'Payment date',
            render: () => renderDatepicker(),
        },
        {
            name: 'amount',
            className: 'amount',
            rules: [
                {
                    required: true,
                    message: 'Please, enter payment',
                },
                () => ({
                    validator(rule, value) {
                        return numberFieldValidator(
                            value,
                            'Payment should be number'
                        );
                    },
                }),
            ],
            label: 'Payment',
            render: () => renderInput(),
        },
        {
            name: 'bank_id',
            className: 'payment-type',
            label: 'Bank',
            render: () => renderPaymentTypeSelect(banks),
        },
        {
            name: 'shipment_id',
            className: 'shipment',
            label: 'Shipment',
            render: () => renderShipmentSelect(shipments),
        },
    ];

    const renderModalFooter = () => {
        if (success) {
            return [
                <Button key="close" type="primary" onClick={onOk}>
                    Close
                </Button>,
            ];
        }

        return [
            <Button key="close" onClick={closeModal} disabled={modalLoader}>
                Cancel
            </Button>,
            <Button
                form={formConfig.name}
                key="submit"
                type="primary"
                htmlType="submit"
                disabled={modalLoader}
            >
                Add expense
            </Button>,
        ];
    };

    const renderModalTemplate = () => {
        if (success) {
            return (
                <div className="success">
                    <p className="info">
                        Expense has been created successfully
                    </p>
                </div>
            );
        }

        if (modalLoader || isModalLoader) {
            return <Loader size="large" style="white" />;
        } else {
            return (
                <Form
                    formConfig={formConfig}
                    elements={elements}
                    initialValues={initialValues}
                    errors={errors}
                />
            );
        }
    };

    return (
        <Modal
            destroyOnClose={true}
            title="Add new expense"
            visible={isShowModal}
            onCancel={closeModal}
            className="add-expense-modal expense-modal"
            footer={renderModalFooter()}
            width={730}
            closable={true}
        >
            {renderModalTemplate()}
        </Modal>
    );
};

export default AddExpenseModal;
