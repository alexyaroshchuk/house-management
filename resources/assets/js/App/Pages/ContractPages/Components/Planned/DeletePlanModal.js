import React from 'react';

import Modal from '@Components/Modal/Modal';
import Loader from '@Components/Loader/Loader';

import Button from '@Components/Button/Button';
import './DeletePlanModal.scss';

export const DeletePlanModal = (props) => {
    const {
        visible,
        modalLoader,
        onCancel,
        success,
        onFinish,
        onOk,
        initialValues,
    } = props;

    const renderModalTemplate = () => {
        if (success) {
            return (
                <div className="success">
                    <p className="info">Plan has been deleted successfully</p>
                </div>
            );
        }

        if (modalLoader) {
            return <Loader size="large" style="white" />;
        } else {
            return (
                <p className="question">
                    Are you sure that you want to delete this plan?
                </p>
            );
        }
    };

    const finishHandler = () => {
        const { contract_id } = initialValues;

        const result = {
            contract_id,
        };

        onFinish(result);
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
            <Button key="close" onClick={onCancel} disabled={modalLoader}>
                Cancel
            </Button>,
            <Button
                key="submit"
                type="danger"
                onClick={finishHandler}
                disabled={modalLoader}
            >
                Delete plan
            </Button>,
        ];
    };

    return (
        <Modal
            destroyOnClose={true}
            title="Delete plan"
            visible={visible}
            onCancel={onCancel}
            className="delete-plan-modal"
            footer={renderModalFooter()}
            width={440}
            closable={false}
        >
            {renderModalTemplate()}
        </Modal>
    );
};

export default DeletePlanModal;
