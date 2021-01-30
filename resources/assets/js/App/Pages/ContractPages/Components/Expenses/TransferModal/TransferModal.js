import React, { useState } from 'react';

import './TransferModal.scss';
import Input from '@Components/Input/Input';
import Select from '@Components/Select/Select';
import Button from '@Components/Button/Button';
import Loader from '@Components/Loader/Loader';
import Form from '@Components/Form/Form';
import Modal from '@Components/Modal/Modal';

const renderInput = () => {
    return <Input placeholder="Enter payment" prefix="$" />;
};

const TransferModal = (props) => {
    const {
        banks,
        isShowModal,
        isModalLoader,
        closeModal,
        success,
        onFinish,
        onOk,
        initialValues = {},
        errors,
    } = props;

    const [fromBankId, setFromBankId] = useState(null);

    const formConfig = {
        name: 'transfer-form',
        onFinish: onFinish,
        layout: 'vertical',
    };

    const renderFromBankSelect = (banks) => {
        const options = banks.map((bank) => {
            const { id, title } = bank;
            return {
                id,
                value: id + '',
                text: title,
            };
        });

        const selectFromBankHandler = (value) => {
            setFromBankId(+value);
        };

        return (
            <Select
                options={options}
                placeholder="Select bank"
                onChange={selectFromBankHandler}
            />
        );
    };

    const renderToBankSelect = (banks) => {
        const options = banks
            .filter((bank) => bank.id !== fromBankId)
            .map((bank) => {
                const { id, title } = bank;
                return {
                    id,
                    value: id + '',
                    text: title,
                };
            });

        return (
            <Select
                options={options}
                placeholder="Select bank"
                disabled={fromBankId ? false : true}
            />
        );
    };

    const elements = [
        {
            name: 'from_bank_id',
            rules: [
                {
                    required: true,
                    message: 'Please, select bank',
                },
            ],
            label: 'From bank',
            render: () => renderFromBankSelect(banks),
        },
        {
            name: 'to_bank_id',
            rules: [
                {
                    required: true,
                    message: 'Please, select bank',
                },
            ],
            label: 'To bank',
            render: () => renderToBankSelect(banks),
        },
        {
            name: 'amount',
            rules: [
                {
                    required: true,
                    message: 'Please, enter payment',
                },
            ],
            label: 'Payment',
            render: () => renderInput(),
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
            <Button key="close" onClick={closeModal} disabled={isModalLoader}>
                Cancel
            </Button>,
            <Button
                form={formConfig.name}
                key="submit"
                type="primary"
                htmlType="submit"
                disabled={isModalLoader}
            >
                Confirm
            </Button>,
        ];
    };

    const renderModalTemplate = () => {
        if (success) {
            return (
                <div className="success">
                    <p className="info">
                        Transfer has been created successfully
                    </p>
                </div>
            );
        }

        if (isModalLoader) {
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
            title="Transfer expense"
            visible={isShowModal}
            onCancel={closeModal}
            className="transfer-modal"
            footer={renderModalFooter()}
            width={730}
            closable={true}
        >
            {renderModalTemplate()}
        </Modal>
    );
};

export default TransferModal;
