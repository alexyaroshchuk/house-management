import React from 'react';

import useContractAction from '@Context/Contract/Hooks/useContractActions';
import { CONTRACT_STATUS } from '@Context/Contract/Store/constants';

import Modal from '@Components/Modal/Modal';
import Button from '@Components/Button/Button';
import Loader from '@Components/Loader/Loader';

import './UnfinishContractModal.scss';

const UnfinishContractModal = (props) => {
    const { onClose, isShowModal, contract, contractType, onOk } = props;

    const { isLoading, isSuccess, changeContractStatus } = useContractAction();

    const onSaveForm = () => {
        const payload = {
            status: CONTRACT_STATUS.ACTIVE,
        };

        changeContractStatus(contractType, contract.id, payload);
    };

    const renderModalFooter = () => {
        if (isSuccess) {
            return [
                <Button key="close" type="primary" onClick={onOk}>
                    Close
                </Button>,
            ];
        }

        return [
            <Button key="close" onClick={onClose} disabled={isLoading}>
                Cancel
            </Button>,
            <Button
                key="submit"
                type="primary"
                onClick={onSaveForm}
                disabled={isLoading}
            >
                Unfinish contract
            </Button>,
        ];
    };

    const renderModalTemplate = () => {
        if (isSuccess) {
            return (
                <div className="success">
                    <p className="info">
                        Contract has been unfinished successfully
                    </p>
                </div>
            );
        }

        if (isLoading) {
            return <Loader size="large" style="white" />;
        }

        return (
            <p className="question">
                <span>This action will make current contract active.</span>
                <span>Are you sure you want to proceed?</span>
            </p>
        );
    };

    const closeModal = () => {
        onClose();
    };

    return (
        <Modal
            {...props}
            wrapClassName="unfinish-contract-modal"
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

export default UnfinishContractModal;
