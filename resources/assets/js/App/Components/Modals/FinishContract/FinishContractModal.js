import React, { useState } from 'react';

import useContractAction from '@Context/Contract/Hooks/useContractActions';
import { CONTRACT_STATUS } from '@Context/Contract/Store/constants';
import {
    getCurrentDate,
    datePickerFormat,
    weightMTS,
    oneThousand,
} from '@Utils/formatHelpers';

import Modal from '@Components/Modal/Modal';
import Button from '@Components/Button/Button';
import Input from '@Components/Input/Input';
import Loader from '@Components/Loader/Loader';
import Form from '@Components/Form/Form';
import Datepicker from '@Components/Datepicker/Datepicker';

import './FinishContractModal.scss';

const FinishContractModal = (props) => {
    const { onClose, isShowModal, contract, contractType, onOk } = props;

    const { isLoading, isSuccess, changeContractStatus } = useContractAction();
    const [finishDate, setFinishDate] = useState(getCurrentDate());

    const errors = {};

    const initialValues = {
        quantity: contract.shipped_weight / oneThousand,
        date_end: finishDate,
    };

    const renderQuantity = () => (
        <Input type="number" suffix={weightMTS} disabled />
    );

    const dateChangeHandler = (date) => {
        setFinishDate(date);
    };

    const renderDate = () => (
        <Datepicker format={datePickerFormat()} onChange={dateChangeHandler} />
    );

    const onSaveForm = (event) => {
        const payload = {
            ...event,
            quantity: event.quantity * oneThousand,
            status: CONTRACT_STATUS.INACTIVE,
        };
        changeContractStatus(contractType, contract.id, payload);
    };

    const formConfig = {
        name: 'finish-contract-form',
        onFinish: onSaveForm,
        layout: 'vertical',
    };

    const elements = [
        {
            name: 'quantity',
            label: 'Final quantity',
            render: renderQuantity,
        },
        {
            name: 'date_end',
            rules: [
                {
                    required: true,
                    message: 'Please, select date',
                },
            ],
            label: 'Final date',
            render: renderDate,
        },
    ];

    const renderModalFooter = () => {
        if (isSuccess) {
            return [
                <Button key="close" type="primary" onClick={onOk}>
                    Close
                </Button>,
            ];
        }

        return [
            <Button key="close" onClick={closeModal} disabled={isLoading}>
                Cancel
            </Button>,
            <Button
                form={formConfig.name}
                key="submit"
                type="primary"
                htmlType="submit"
                disabled={isLoading}
                className={'ant-btn-successfull'}
            >
                Finish contract
            </Button>,
        ];
    };

    const renderModalTemplate = () => {
        if (isSuccess) {
            return (
                <div className="success">
                    <p className="info">
                        Contract has been finished successfully
                    </p>
                </div>
            );
        }

        if (isLoading) {
            return <Loader size="large" style="white" />;
        }

        return (
            <>
                <Form
                    formConfig={formConfig}
                    elements={elements}
                    initialValues={initialValues}
                    errors={errors}
                />
            </>
        );
    };

    const closeModal = () => {
        onClose();
    };

    return (
        <Modal
            {...props}
            wrapClassName="finish-contract-modal"
            visible={isShowModal}
            footer={renderModalFooter()}
            destroyOnClose={true}
            width={440}
            closable={false}
            onCancel={closeModal}
        >
            {renderModalTemplate()}
        </Modal>
    );
};

export default FinishContractModal;
