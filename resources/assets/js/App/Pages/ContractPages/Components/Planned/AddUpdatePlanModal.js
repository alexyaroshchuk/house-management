import React, { useEffect, useState } from 'react';
import { isEmpty, get } from 'lodash';

import Modal from '@Components/Modal/Modal';
import Form from '@Components/Form/Form';
import Input from '@Components/Input/Input';
import Select from '@Components/Select/Select';
import Button from '@Components/Button/Button';
import Loader from '@Components/Loader/Loader';
import { numberFieldValidator } from '@Utils/helpers';
import { weightMTS, oneThousand } from '@Utils/formatHelpers';
import useGetBuyers from '@Context/Contract/Hooks/useGetBuyers';

import './AddUpdatePlanModal.scss';

export const AddUpdatePlanModal = (props) => {
    const {
        initialValues,
        onCancel,
        onFinish,
        onOk,
        success,
        errors,
        contractType,
        contract,
    } = props;

    const { buyers, modalLoader, getBuyers } = useGetBuyers();

    useEffect(() => {
        getBuyers(contract.id);
    }, []);

    const [contractsOptions, setСontractsOptions] = useState([]);

    const handleBuyerChange = (value) => {
        const buyerIndex = buyers.findIndex((item) => item.name === value);

        const options = get(buyers[buyerIndex], `buyer_contracts`, []).map(
            (contract) => {
                const { contract_id, contract_number } = contract;

                return {
                    id: contract_id,
                    value: contract_number,
                    text: contract_number,
                };
            }
        );
        setСontractsOptions(options);
    };

    const renderBuyerColumn = () => {
        const buyerOptions = buyers.map((buyer) => {
            const { id, name } = buyer;

            return {
                id,
                value: name,
                text: name,
            };
        });
        return (
            <Select
                options={buyerOptions}
                placeholder="Select buyer"
                onChange={handleBuyerChange}
                disabled={!isEmpty(initialValues)}
            />
        );
    };

    const renderContractsColumn = () => {
        return (
            <Select
                options={contractsOptions}
                placeholder="Select contract"
                disabled={isEmpty(contractsOptions) || !isEmpty(initialValues)}
            />
        );
    };

    const renderQuantity = () => {
        return <Input placeholder="0" suffix={weightMTS} />;
    };

    const plannedElements = [
        {
            name: 'buyer',
            rules: [
                {
                    required: true,
                    message: 'Please, select buyer',
                },
            ],
            label: 'Buyer',
            render: renderBuyerColumn,
        },
        {
            name: 'contract_number',
            rules: [
                {
                    required: true,
                    message: 'Please, select contract',
                },
            ],
            label: 'Contract',
            render: renderContractsColumn,
        },
        {
            name: 'weight',
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
            validateFirst: true,
            label: 'Quantity',
            render: renderQuantity,
        },
    ];

    const finishHandler = (values) => {
        const { weight, buyer, contract_number } = values;

        const buyerIndex = buyers.findIndex((item) => item.name === buyer);
        const buyerContracts = get(buyers[buyerIndex], 'buyer_contracts', []);
        const foundContract = buyerContracts.find(
            (item) => item.contract_number === contract_number
        );

        const result = {
            contract_id: foundContract.contract_id,
            weight: weight * oneThousand,
        };
        onFinish(result);
    };

    const formConfig = {
        name: 'planned-form',
        initialValues: initialValues,
        onFinish: finishHandler,
        layout: 'vertical',
        observeField: 'buyer',
        resetField: 'contract_number',
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
        const actionType = isEmpty(initialValues) ? 'created' : 'updated';

        if (success) {
            return (
                <p className="success">
                    {`Plan has been ${actionType} successfully`}
                </p>
            );
        }

        if (modalLoader) {
            return <Loader size="large" style="white" />;
        } else {
            return (
                <Form
                    formConfig={formConfig}
                    elements={plannedElements}
                    errors={errors}
                />
            );
        }
    };

    return (
        <Modal
            {...props}
            destroyOnClose={true}
            width={440}
            className={`planned-modal`}
            footer={renderModalFooter()}
            onCancel={onCancel}
        >
            {renderModalTemplate()}
        </Modal>
    );
};

export default AddUpdatePlanModal;
