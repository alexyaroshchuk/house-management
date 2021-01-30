import React from 'react';

import './EditContractModal.scss';
import Modal from '@Components/Modal/Modal';
import Form from '@Components/Form/Form';
import Input from '@Components/Input/Input';
import Button from '@Components/Button/Button';
import Loader from '@Components/Loader/Loader';

import useGetDirectory from '@Context/Contract/Hooks/useGetDirectory';

const renderNumberColumn = () => {
    return <Input placeholder="Number" />;
};

const EditContractModal = (props) => {
    const {
        initialValues,
        onCancel,
        onFinish,
        onOk,
        success,
        errors,
        selectedContract,
        title,
    } = props;

    const { modalLoader } = useGetDirectory();

    const elements = [
        {
            name: 'number',
            rules: [
                {
                    required: true,
                    message: 'Please, enter contract number',
                },
            ],
            label: 'Contract number',
            render: renderNumberColumn,
        },
    ];

    const finishHandler = (values) => {
        const data = {
            ...values,
            seller_id: selectedContract.seller_id,
        };

        onFinish(data);
    };

    const formConfig = {
        name: 'edit-contract-form',
        initialValues: initialValues,
        onFinish: finishHandler,
        layout: 'vertical',
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
            <Button key="cancel" onClick={onCancel} disabled={modalLoader}>
                Cancel
            </Button>,
            <Button
                form={formConfig.name}
                type="primary"
                key="create"
                htmlType="submit"
                disabled={modalLoader}
            >
                Save
            </Button>,
        ];
    };

    const renderModalTemplate = () => {
        if (success) {
            return (
                <p className="success">
                    Contract has been updated successfully
                </p>
            );
        }

        if (modalLoader) {
            return <Loader size="large" style="white" />;
        } else {
            return (
                <Form
                    formConfig={formConfig}
                    elements={elements}
                    errors={errors}
                />
            );
        }
    };
    return (
        <Modal
            {...props}
            destroyOnClose={true}
            width={400}
            className={`edit-seller-modal`}
            footer={renderModalFooter()}
            onCancel={onCancel}
        >
            {renderModalTemplate()}
        </Modal>
    );
};

export default EditContractModal;
