import React, { useEffect } from 'react';

import './EditMainContractModal.scss';
import Input from '@Components/Input/Input';
import Select from '@Components/Select/Select';
import Button from '@Components/Button/Button';
import Loader from '@Components/Loader/Loader';
import Form from '@Components/Form/Form';
import Modal from '@Components/Modal/Modal';

import useGetSellerContracts from '@Context/Seller/Hooks/useGetSellerContracts';

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

const EditMainContractModal = (props) => {
    const {
        isShowModal,
        initialValues,
        onCancel,
        onFinish,
        onOk,
        success,
        errors,
        modalLoader,
    } = props;

    const formConfig = {
        name: 'edit-main-contract-form',
        onFinish: onFinish,
        layout: 'vertical',
    };

    const {
        sellerContracts,
        isLoading,
        getSellerContracts,
    } = useGetSellerContracts();

    useEffect(() => {
        getSellerContracts();
    }, []);

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
            render: () => renderSelect(sellerContracts),
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
            <Button
                key="close"
                onClick={onCancel}
                disabled={isLoading || modalLoader}
            >
                Cancel
            </Button>,
            <Button
                form={formConfig.name}
                key="submit"
                type="primary"
                htmlType="submit"
                disabled={isLoading || modalLoader}
            >
                Edit
            </Button>,
        ];
    };

    const renderModalTemplate = () => {
        if (success) {
            return (
                <div className="success">
                    <p className="info">
                        Main contract has been edited successfully
                    </p>
                </div>
            );
        }

        if (isLoading || modalLoader) {
            return <Loader size="large" style="white" />;
        } else {
            return (
                <Form
                    formConfig={formConfig}
                    elements={elements}
                    initialValues={initialValues}
                    errors={errors}
                />
            );
        }
    };

    return (
        <Modal
            destroyOnClose={true}
            title="Edit main contract"
            visible={isShowModal}
            onCancel={onCancel}
            className="edit-main-contract-modal main-contract-modal"
            footer={renderModalFooter()}
            width={730}
            closable={true}
        >
            {renderModalTemplate()}
        </Modal>
    );
};

export default EditMainContractModal;
