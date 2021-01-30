import React from 'react';

import Modal from '@Components/Modal/Modal';
import Loader from '@Components/Loader/Loader';
import Button from '@Components/Button/Button';

import './DeleteContractModal.scss';

const DeleteContractModal = (props) => {
    const {
        isShowModal,
        modalLoader,
        closeModal,
        success,
        onFinish,
        onOk,
        contract,
        title,
    } = props;

    const renderModalTemplate = () => {
        if (success) {
            return (
                <div className="success">
                    <p className="info">
                        Contract has been deleted successfully
                    </p>
                </div>
            );
        }

        if (modalLoader) {
            return <Loader size="large" style="white" />;
        } else {
            return (
                <p className="question">
                    Are you sure that you want to delete this contract?
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
            <Button key="close" onClick={closeModal} disabled={modalLoader}>
                Cancel
            </Button>,
            <Button
                key="submit"
                type="danger"
                onClick={onFinish}
                disabled={modalLoader}
            >
                Delete contract
            </Button>,
        ];
    };

    return (
        <Modal
            {...props}
            destroyOnClose={true}
            visible={isShowModal}
            onCancel={closeModal}
            className="delete-contract-modal"
            footer={renderModalFooter()}
            width={440}
            closable={false}
        >
            {renderModalTemplate()}
        </Modal>
    );
};

export default DeleteContractModal;
