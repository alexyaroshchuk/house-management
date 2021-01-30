import React from 'react';

import './DeleteContainerModal.scss';
import Modal from '@Components/Modal/Modal';
import Loader from '@Components/Loader/Loader';
import Button from '@Components/Button/Button';

const DeleteContainerModal = (props) => {
    const {
        isShowModal,
        isModalLoading,
        closeModal,
        success,
        onFinish,
        onOk,
        rowData,
    } = props;

    const renderModalTemplate = () => {
        if (success) {
            return (
                <div className="success">
                    <p className="info">
                        Container has been deleted successfully
                    </p>
                </div>
            );
        }

        if (isModalLoading) {
            return <Loader size="large" style="white" />;
        } else {
            return (
                <p className="question">
                    Are you sure that you want to delete this container?
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
                onClick={() => onFinish(rowData.id)}
                disabled={isModalLoading}
            >
                Delete container
            </Button>,
        ];
    };

    return (
        <Modal
            destroyOnClose={true}
            title="Delete container"
            visible={isShowModal}
            onCancel={closeModal}
            className="delete-container-modal"
            footer={renderModalFooter()}
            width={440}
            closable={false}
        >
            {renderModalTemplate()}
        </Modal>
    );
};

export default DeleteContainerModal;
