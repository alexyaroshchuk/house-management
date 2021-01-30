import React from 'react';

import './ChangeUserPasswordModal.scss';
import Modal from '@Components/Modal/Modal';
import Loader from '@Components/Loader/Loader';
import Form from '@Components/Form/Form';
import Button from '@Components/Button/Button';
import { password } from '../passwordFormFields';

const ChangeUserPasswordModal = (props) => {
    const {
        isShowModal,
        modalLoader,
        closeModal,
        success,
        onFinish,
        onOk,
    } = props;

    const formConfig = {
        name: 'change-password-form',
        onFinish: onFinish,
        layout: 'vertical',
    };

    const elements = [...password];

    const renderModalFooter = () => {
        if (success) {
            return [
                <Button key="close" type="primary" onClick={onOk}>
                    Close
                </Button>,
            ];
        }

        // if (!modalLoader) {
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
                Save
            </Button>,
        ];
        // } else {
        //     return false;
        // }
    };

    const renderModalTemplate = () => {
        if (success) {
            return (
                <div className="success">
                    <p className="info">
                        Password has been changed successfully
                    </p>
                </div>
            );
        }

        if (modalLoader) {
            return <Loader size="large" style="white" />;
        } else {
            return <Form formConfig={formConfig} elements={elements} />;
        }
    };

    return (
        <Modal
            destroyOnClose={true}
            title="Change password"
            visible={isShowModal}
            onCancel={closeModal}
            wrapClassName="change-password-modal"
            footer={renderModalFooter()}
            width={440}
            closable={false}
        >
            {renderModalTemplate()}
        </Modal>
    );
};

export default ChangeUserPasswordModal;
