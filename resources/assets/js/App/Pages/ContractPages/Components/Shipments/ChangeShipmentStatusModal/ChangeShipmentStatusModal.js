import React from 'react';

import Modal from '@Components/Modal/Modal';
import Loader from '@Components/Loader/Loader';
import Button from '@Components/Button/Button';

import './ChangeShipmentStatusModal.scss';

const ChangeShipmentStatusModal = (props) => {
    const {
        isShowModal,
        isModalLoading,
        closeModal,
        success,
        onFinish,
        onOk,
    } = props;

    const renderModalTemplate = () => {
        if (success) {
            return (
                <div className="success">
                    <p className="info">
                        Shipment has been changed status successfully
                    </p>
                </div>
            );
        }

        if (isModalLoading) {
            return <Loader size="large" style="white" />;
        } else {
            return (
                <p className="question">
                    Are you sure that you want to change shipment status?
                </p>
            );
        }
    };

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
                key="submit"
                type="primary"
                onClick={onFinish}
                disabled={isModalLoading}
            >
                Change status
            </Button>,
        ];
    };

    return (
        <Modal
            destroyOnClose={true}
            title="Change shipment status"
            visible={isShowModal}
            onCancel={closeModal}
            className="change-shipment-status-modal"
            footer={renderModalFooter()}
            width={440}
            closable={false}
        >
            {renderModalTemplate()}
        </Modal>
    );
};

export default ChangeShipmentStatusModal;
