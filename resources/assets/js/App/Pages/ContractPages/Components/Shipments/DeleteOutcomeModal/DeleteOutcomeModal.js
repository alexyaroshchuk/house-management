import React from 'react';

import Modal from '@Components/Modal/Modal';
import Loader from '@Components/Loader/Loader';

import Button from '@Components/Button/Button';
import './DeleteOutcomeModal.scss';

export const DeleteOutcomeModal = (props) => {
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
                        Outcome has been deleted successfully
                    </p>
                </div>
            );
        }

        if (isModalLoading) {
            return <Loader size="large" style="white" />;
        } else {
            return (
                <p className="question">
                    Are you sure that you want to delete this outcome?
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
                type="danger"
                onClick={onFinish}
                disabled={isModalLoading}
            >
                Delete outcome
            </Button>,
        ];
    };

    return (
        <Modal
            destroyOnClose={true}
            title="Delete outcome"
            visible={isShowModal}
            onCancel={closeModal}
            className="delete-outcome-modal"
            footer={renderModalFooter()}
            width={440}
            closable={false}
        >
            {renderModalTemplate()}
        </Modal>
    );
};

export default DeleteOutcomeModal;
