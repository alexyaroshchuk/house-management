import React from 'react';

import './DeleteCreditLineModal.scss';
import Modal from '@Components/Modal/Modal';
import Loader from '@Components/Loader/Loader';
import Button from '@Components/Button/Button';

const DeleteCreditLineModal = (props) => {
    const {
        isShowModal,
        isModalLoader,
        closeModal,
        success,
        onFinish,
        onOk,
        initialValues = {},
    } = props;

    const renderModalTemplate = () => {
        if (success) {
            return (
                <div className="success">
                    <p className="info">
                        Credit has been finished successfully
                    </p>
                </div>
            );
        }

        if (isModalLoader) {
            return <Loader size="large" style="white" />;
        } else {
            return (
                <p className="question">
                    Are you sure that you want to finish this credit?
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
            <Button key="close" onClick={closeModal} disabled={isModalLoader}>
                Cancel
            </Button>,
            <Button
                key="submit"
                type="danger"
                onClick={() => onFinish(initialValues.id)}
                disabled={isModalLoader}
            >
                Finish credit
            </Button>,
        ];
    };

    return (
        <Modal
            destroyOnClose={true}
            title="Finish credit line"
            visible={isShowModal}
            onCancel={closeModal}
            className="delete-credit-line-modal"
            footer={renderModalFooter()}
            width={440}
            closable={false}
        >
            {renderModalTemplate()}
        </Modal>
    );
};

export default DeleteCreditLineModal;
