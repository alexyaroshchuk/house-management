import React from 'react';
import moment from 'moment';

import './EditShipmentModal.scss';
import Modal from '@Components/Modal/Modal';
import Input from '@Components/Input/Input';
import Datepicker from '@Components/Datepicker/Datepicker';
import Form from '@Components/Form/Form';
import Loader from '@Components/Loader/Loader';
import Button from '@Components/Button/Button';
import { datePickerFormat } from '@Utils/formatHelpers';

const renderInput = (placeholder, maxLength) => {
    return <Input placeholder={placeholder} maxLength={maxLength} />;
};

const disabledDate = (current) => {
    return moment().add(-1, 'days') >= current;
};

const renderDatepicker = () => {
    return <Datepicker format={datePickerFormat()} />;
};

const EditShipmentModal = (props) => {
    const {
        isShowModal,
        modalLoader,
        closeModal,
        success,
        onFinish,
        onOk,
        rowData = {},
        errors,
    } = props;

    const formConfig = {
        name: 'edit-shipment-form',
        onFinish: onFinish,
        layout: 'vertical',
    };

    const elements = [
        {
            name: 'name',
            rules: [
                {
                    required: true,
                    message: 'Please, enter name',
                },
            ],
            label: "Vessel's name",
            render: () => renderInput("Enter vessel's name", 100),
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
            name: 'number',
            label: 'B/L number',
            render: () => renderInput('Enter number', 19),
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
                Edit shipment
            </Button>,
        ];
    };

    const renderModalTemplate = () => {
        if (success) {
            return (
                <div className="success">
                    <p className="info">
                        Shipment has been edited successfully
                    </p>
                </div>
            );
        }

        if (modalLoader) {
            return <Loader size="large" style="white" />;
        } else {
            return (
                <Form
                    formConfig={formConfig}
                    elements={elements}
                    initialValues={rowData}
                    errors={errors}
                />
            );
        }
    };

    return (
        <Modal
            destroyOnClose={true}
            title="Edit shipment"
            visible={isShowModal}
            onCancel={closeModal}
            className="edit-shipment-modal shipment-modal"
            footer={renderModalFooter()}
            width={730}
            closable={true}
        >
            {renderModalTemplate()}
        </Modal>
    );
};

export default EditShipmentModal;
