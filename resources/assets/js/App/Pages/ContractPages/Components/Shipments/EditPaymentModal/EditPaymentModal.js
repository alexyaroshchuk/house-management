import React, { useEffect } from 'react';
import moment from 'moment';

import './EditPaymentModal.scss';
import Modal from '@Components/Modal/Modal';
import Input from '@Components/Input/Input';
import Datepicker from '@Components/Datepicker/Datepicker';
import Form from '@Components/Form/Form';
import Loader from '@Components/Loader/Loader';
import Button from '@Components/Button/Button';
import Select from '@Components/Select/Select';

import { datePickerFormat } from '@Utils/formatHelpers';
import { numberFieldValidator } from '@Utils/helpers';
import { PAYMENT_TYPE_OPTIONS } from '../constants';

import useGetSeller from '@Context/Contract/Hooks/useGetSeller';

const renderInput = () => {
    return <Input placeholder="Enter payment" prefix="$" />;
};

const disabledDate = (current) => {
    return current && current < moment().endOf('day');
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

    return <Select options={options} placeholder="Select payment type" />;
};

const renderSellersSelect = (sellers) => {
    const options = sellers.map((seller) => {
        const { id, name } = seller;
        return {
            id,
            value: id + '',
            text: name,
        };
    });

    return <Select options={options} placeholder="Select seller" />;
};

const EditPaymentModal = (props) => {
    const {
        banks,
        isShowModal,
        contract,
        isModalLoading,
        closeModal,
        success,
        onFinish,
        onOk,
        initialValues = {},
        errors,
    } = props;

    const {
        sellersByContractId,
        modalLoader,
        getSellersByContractId,
    } = useGetSeller();

    useEffect(() => {
        getSellersByContractId(contract.id);
    }, []);

    const formConfig = {
        name: 'edit-payment-form',
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
            label: 'Sailing date',
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
        {
            name: 'contractor_id',
            rules: [
                {
                    required: true,
                    message: 'Please, select seller',
                },
            ],
            label: 'Seller',
            render: () => renderSellersSelect(sellersByContractId),
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
                Edit payment
            </Button>,
        ];
    };

    const renderModalTemplate = () => {
        if (success) {
            return (
                <div className="success">
                    <p className="info">
                        Payment has been changed successfully
                    </p>
                </div>
            );
        }

        if (isModalLoading || modalLoader) {
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
            title="Edit payment"
            visible={isShowModal}
            onCancel={closeModal}
            className="edit-payment-modal payment-modal"
            footer={renderModalFooter()}
            width={730}
            closable={true}
        >
            {renderModalTemplate()}
        </Modal>
    );
};

export default EditPaymentModal;
