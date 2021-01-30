import React from 'react';

import './CreateMainContractModal.scss';
import Input from '@Components/Input/Input';
import Select from '@Components/Select/Select';
import Button from '@Components/Button/Button';
import Loader from '@Components/Loader/Loader';
import Form from '@Components/Form/Form';
import Modal from '@Components/Modal/Modal';

const renderInput = () => {
    return <Input placeholder="Enter number" />;
};

const renderSelect = (contracts) => {
    const options = contracts.map((contract) => {
        const { id, number } = contract;

        return {
            id,
            value: id + '',
            text: number,
        };
    });

    return (
        <Select
            mode="multiple"
            options={options}
            placeholder="Select contracts"
        />
    );
};

const CreateMainContractModal = (props) => {
    const {
        isShowModal,
        activeSellerContracts = [],
        isModalLoading,
        closeModal,
        success,
        onFinish,
        onOk,
        rowData = {},
        errors,
    } = props;

    const formConfig = {
        name: 'create-main-contract-form',
        onFinish: onFinish,
        layout: 'vertical',
    };

    const elements = [
        {
            name: 'number',
            label: 'Contract number',
            rules: [
                {
                    required: true,
                    message: 'Please, enter contract number',
                },
            ],
            className: 'number',
            render: () => renderInput(),
        },
        {
            name: 'seller_contract_ids',
            label: 'Contracts',
            className: 'contracts',
            render: () => renderSelect(activeSellerContracts),
        },
    ];

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
                form={formConfig.name}
                key="submit"
                type="primary"
                htmlType="submit"
                disabled={isModalLoading}
            >
                Create
            </Button>,
        ];
    };

    const renderModalTemplate = () => {
        if (success) {
            return (
                <div className="success">
                    <p className="info">
                        Main contract has been created successfully
                    </p>
                </div>
            );
        }

        if (isModalLoading) {
            return <Loader size="large" style="white" />;
        } else {
            return (
                <Form
                    formConfig={formConfig}
                    elements={elements}
                    initialValues={rowData}
                    errors={errors}
                />
            );
        }
    };

    return (
        <Modal
            destroyOnClose={true}
            title="Create new main contract"
            visible={isShowModal}
            onCancel={closeModal}
            className="create-main-contract-modal main-contract-modal"
            footer={renderModalFooter()}
            width={730}
            closable={true}
        >
            {renderModalTemplate()}
        </Modal>
    );
};

export default CreateMainContractModal;
