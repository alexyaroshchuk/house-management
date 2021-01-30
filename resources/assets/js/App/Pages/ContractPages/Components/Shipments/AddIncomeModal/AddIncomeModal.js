import React from 'react';
import moment from 'moment';

import './AddIncomeModal.scss';
import Modal from '@Components/Modal/Modal';
import Input from '@Components/Input/Input';
import Datepicker from '@Components/Datepicker/Datepicker';
import Form from '@Components/Form/Form';
import Loader from '@Components/Loader/Loader';
import Button from '@Components/Button/Button';
import Select from '@Components/Select/Select';
import { PAYMENT_TYPE_OPTIONS } from '../constants';

import { datePickerFormat } from '@Utils/formatHelpers';
import { numberFieldValidator } from '@Utils/helpers';

const renderInput = () => {
    return <Input placeholder="Enter payment" prefix="$" />;
};

const renderDatepicker = () => {
    return <Datepicker format={datePickerFormat()} />;
};

const renderPaymentTypeSelect = () => {
    return (
        <Select
            options={PAYMENT_TYPE_OPTIONS}
            placeholder="Select expense type"
        />
    );
};

const renderPaymentMethodSelect = (banks) => {
    const options = banks.map((bank) => {
        const { id, title } = bank;
        return {
            id,
            value: id + '',
            text: title,
        };
    });

    return <Select options={options} placeholder="Select bank" />;
};

const AddIncomeModal = (props) => {
    const {
        banks,
        isShowModal,
        isModalLoading,
        closeModal,
        success,
        onFinish,
        onOk,
        initialValues = {},
        errors,
    } = props;

    const formConfig = {
        name: 'add-income-form',
        onFinish: onFinish,
        layout: 'vertical',
    };

    const elements = [
        {
            name: 'amount',
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
            name: 'date',
            rules: [
                {
                    required: true,
                    message: 'Please, select date',
                },
            ],
            label: 'Payment date',
            render: () => renderDatepicker(),
        },
        {
            name: 'payment_type',
            rules: [
                {
                    required: true,
                    message: 'Please, select date',
                },
            ],
            label: 'Payment type',
            render: () => renderPaymentTypeSelect(),
        },
        {
            name: 'bank_id',
            rules: [
                {
                    required: true,
                    message: 'Please, select date',
                },
            ],
            label: 'Bank',
            render: () => renderPaymentMethodSelect(banks),
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
            <Button key="close" onClick={closeModal} disabled={isModalLoading}>
                Cancel
            </Button>,
            <Button
                form={formConfig.name}
                key="submit"
                type="primary"
                htmlType="submit"
                disabled={isModalLoading}
            >
                Add income
            </Button>,
        ];
    };

    const renderModalTemplate = () => {
        if (success) {
            return (
                <div className="success">
                    <p className="info">Income has been created successfully</p>
                </div>
            );
        }

        if (isModalLoading) {
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
            title="Add new income"
            visible={isShowModal}
            onCancel={closeModal}
            className="add-income-modal income-modal"
            footer={renderModalFooter()}
            width={730}
            closable={true}
        >
            {renderModalTemplate()}
        </Modal>
    );
};

export default AddIncomeModal;
