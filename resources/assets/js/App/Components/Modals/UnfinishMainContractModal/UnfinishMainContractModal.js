import React from 'react';

import useSellerActions from '@Context/Seller/Hooks/useSellerActions';
import { CONTRACT_STATUS } from '@Context/Contract/Store/constants';

import Modal from '@Components/Modal/Modal';
import Button from '@Components/Button/Button';
import Loader from '@Components/Loader/Loader';

import './UnfinishMainContractModal.scss';

const UnfinishMainContractModal = (props) => {
    const { onClose, isShowModal, contract, onOk } = props;

    const {
        modalLoader,
        isSuccess,
        changeMainContractStatus,
    } = useSellerActions();

    const onSaveForm = () => {
        const payload = {
            status: CONTRACT_STATUS.ACTIVE,
        };
        changeMainContractStatus(payload, contract.id);
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
            <Button key="close" onClick={onClose} disabled={modalLoader}>
                Cancel
            </Button>,
            <Button
                key="submit"
                type="primary"
                onClick={onSaveForm}
                disabled={modalLoader}
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

        if (modalLoader) {
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

export default UnfinishMainContractModal;
