import React, { useEffect } from 'react';

import './EditCreditLineModal.scss';
import Select from '@Components/Select/Select';
import Input from '@Components/Input/Input';
import Datepicker from '@Components/Datepicker/Datepicker';
import Modal from '@Components/Modal/Modal';
import Form from '@Components/Form/Form';
import Loader from '@Components/Loader/Loader';
import Button from '@Components/Button/Button';

import useGetBanks from '@Context/Contract/Hooks/useGetBanks';
import { momentDatePickerFormat } from '@Utils/formatHelpers';
import { numberFieldValidator } from '@Utils/helpers';

const renderSelect = (banks) => {
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

const renderCreditInput = () => {
    return <Input prefix="$" />;
};

const renderInput = () => {
    return <Input placeholder="Enter credit number" />;
};

const renderDatepicker = () => {
    return (
        <Datepicker
            format={momentDatePickerFormat()}
            placeholder="Select date"
        />
    );
};

const EditCreditLineModal = (props) => {
    const {
        isShowModal,
        isModalLoader,
        closeModal,
        success,
        onFinish,
        onOk,
        initialValues = {},
        errors,
    } = props;

    const { banks, modalLoader, getBanks } = useGetBanks();

    useEffect(() => {
        getBanks();
    }, []);

    const formConfig = {
        name: 'edit-credit-line-form',
        onFinish: onFinish,
        layout: 'vertical',
    };

    const elements = [
        {
            name: 'bank_id',
            rules: [
                {
                    required: true,
                    message: 'Please, select bank',
                },
            ],
            label: 'Select bank',
            render: () => renderSelect(banks),
        },
        {
            name: 'amount',
            rules: [
                {
                    required: true,
                    message: 'Please, enter credit',
                },
                () => ({
                    validator(rule, value) {
                        return numberFieldValidator(
                            value,
                            'Credit should be number'
                        );
                    },
                }),
            ],
            label: 'Credit',
            render: () => renderCreditInput(),
        },
        {
            name: 'number',
            rules: [
                {
                    required: true,
                    message: 'Please, enter credit number',
                },
            ],
            label: 'Credit number',
            render: () => renderInput(),
        },
        {
            name: 'date',
            rules: [
                {
                    required: true,
                    message: 'Please, enter date',
                },
            ],
            label: 'Date',
            render: () => renderDatepicker(),
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
                Save
            </Button>,
        ];
    };

    const renderModalTemplate = () => {
        if (success) {
            return (
                <div className="success">
                    <p className="info">
                        Credit line has been updated successfully
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
            title="Update credit line"
            visible={isShowModal}
            onCancel={closeModal}
            className="edit-credit-line-modal credit-line-modal"
            footer={renderModalFooter()}
            width={730}
            closable={true}
        >
            {renderModalTemplate()}
        </Modal>
    );
};

export default EditCreditLineModal;
