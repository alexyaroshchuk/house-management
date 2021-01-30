import React from 'react';

import './MergeShipmentsModal.scss';
import Modal from '@Components/Modal/Modal';
import Input from '@Components/Input/Input';
import Alert from '@Components/Alert/Alert';
import Form from '@Components/Form/Form';
import Loader from '@Components/Loader/Loader';
import Button from '@Components/Button/Button';
import Select from '@Components/Select/Select';

const renderInput = () => {
    return <Input placeholder="Enter quantity" disabled />;
};

const renderSelect = (shipments) => {
    const options = shipments.map((shipment) => {
        const { id, number } = shipment;

        return {
            id,
            value: id + '',
            text: number,
        };
    });

    return <Select options={options} placeholder="Select booking" />;
};

const MergeShipmentsModal = (props) => {
    const {
        isShowModal,
        shipments,
        isModalLoading,
        closeModal,
        success,
        onFinish,
        onOk,
        selectedShipment = {},
        errors,
    } = props;

    const formConfig = {
        name: 'merge-modal-form',
        onFinish: onFinish,
        layout: 'vertical',
    };

    const initialValues = {
        master_shipment_id: selectedShipment.number,
    };

    const filteredShipments = shipments.filter(
        (shipment) => shipment.id !== selectedShipment.id
    );

    const elements = [
        {
            name: 'master_shipment_id',
            disabled: true,
            rules: [
                {
                    required: true,
                },
            ],
            label: 'B/L',
            className: 'quantity',
            render: () => renderInput(),
        },
        {
            name: 'slave_shipment_id',
            label: 'B/L',
            rules: [
                {
                    required: true,
                    message: 'Please, select booking',
                },
            ],
            className: 'price',
            render: () => renderSelect(filteredShipments),
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
                Merge
            </Button>,
        ];
    };

    const renderModalTemplate = () => {
        if (success) {
            return (
                <div className="success">
                    <p className="info">
                        Shipments has been merged successfully
                    </p>
                </div>
            );
        }

        if (isModalLoading) {
            return <Loader size="large" style="white" />;
        } else {
            return (
                <>
                    <Alert
                        message="Are you sure you want to merge selected bookings? This action cannot be aborted!"
                        type="info"
                        closable
                    />
                    <Form
                        formConfig={formConfig}
                        elements={elements}
                        initialValues={initialValues}
                        errors={errors}
                    />
                </>
            );
        }
    };

    return (
        <Modal
            destroyOnClose={true}
            title="Merge bookings"
            visible={isShowModal}
            onCancel={closeModal}
            className="merge-shipments-modal"
            footer={renderModalFooter()}
            width={730}
            closable={true}
        >
            {renderModalTemplate()}
        </Modal>
    );
};

export default MergeShipmentsModal;
