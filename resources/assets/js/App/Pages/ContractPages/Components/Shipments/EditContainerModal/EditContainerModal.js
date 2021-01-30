import React, { useEffect } from 'react';

import './EditContainerModal.scss';
import Modal from '@Components/Modal/Modal';
import Input from '@Components/Input/Input';
import Form from '@Components/Form/Form';
import Loader from '@Components/Loader/Loader';
import Button from '@Components/Button/Button';
import Select from '@Components/Select/Select';
import useGetSellers from '@Context/Contract/Hooks/useGetSellers';
import useGetCommodities from '@Context/Contract/Hooks/useGetCommodities';
import { numberFieldValidator } from '@Utils/helpers';
import { oneHundred } from '@Utils/formatHelpers';

const renderTextarea = () => {
    return <Input inputType="textarea" placeholder="Enter containers" />;
};

const renderInput = () => {
    return <Input placeholder="Enter quantity" />;
};

const EditContainerModal = (props) => {
    const {
        isShowModal,
        contract,
        isModalLoading,
        closeModal,
        success,
        onFinish,
        onOk,
        rowData = {},
        errors,
    } = props;

    const { sellers, modalLoader, getSellersRequest } = useGetSellers();
    const { commodities, getCommodities } = useGetCommodities();

    useEffect(() => {
        getSellersRequest(contract.id);
        getCommodities(rowData.seller_contract_id);
    }, []);

    const getOptions = (seller_contracts) => {
        return seller_contracts.map((contract) => {
            const { id, pmt, number, for_delete } = contract;

            return {
                id,
                value: id,
                text: `$${pmt / oneHundred} - ${number}`,
                disabled:
                    for_delete && id !== rowData.seller_contract_id
                        ? true
                        : false,
            };
        });
    };

    const renderSelect = (sellers) => {
        const groups = sellers.map((seller) => {
            const { id, name, seller_contracts } = seller;

            return {
                id,
                groupLabel: name,
                options: getOptions(seller_contracts),
            };
        });

        return (
            <Select group={true} groups={groups} placeholder="Select price" />
        );
    };

    const renderCommoditySelect = () => {
        const options = commodities.map((item) => {
            const { id, commodity, logo } = item;

            return {
                id,
                value: `${commodity} (${logo})`,
                text: `${commodity} (${logo})`,
            };
        });

        return <Select options={options} placeholder="Select commodity" />;
    };

    const formConfig = {
        name: 'edit-container-form',
        onFinish: (values) => onFinish(values, rowData.shipment_id),
        layout: 'vertical',
    };

    const elements = [
        {
            name: 'number',
            label: 'Containers',
            rules: [
                {
                    required: true,
                    message: 'Please, enter name',
                },
            ],
            className: 'container',
            render: () => renderTextarea(),
        },
        {
            name: 'quantity',
            rules: [
                {
                    required: true,
                    message: 'Please, enter quantity',
                },
                () => ({
                    validator(rule, value) {
                        return numberFieldValidator(
                            value,
                            'Quantity should be number'
                        );
                    },
                }),
            ],
            label: 'Total quantity',
            className: 'quantity',
            render: () => renderInput(),
        },
        {
            name: 'seller_contract_id',
            label: 'Price',
            rules: [
                {
                    required: true,
                    message: 'Please, enter price',
                },
            ],
            className: 'price',
            render: () => renderSelect(sellers),
        },
        {
            name: 'label',
            label: 'Commodity',
            className: 'label',
            render: renderCommoditySelect,
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
                Edit containers
            </Button>,
        ];
    };

    const renderModalTemplate = () => {
        if (success) {
            return (
                <div className="success">
                    <p className="info">
                        Container has been created successfully
                    </p>
                </div>
            );
        }

        if (modalLoader || isModalLoading) {
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
            title="Edit containers"
            visible={isShowModal}
            onCancel={closeModal}
            className="edit-container-modal container-modal"
            footer={renderModalFooter()}
            width={730}
            closable={true}
        >
            {renderModalTemplate()}
        </Modal>
    );
};

export default EditContainerModal;
