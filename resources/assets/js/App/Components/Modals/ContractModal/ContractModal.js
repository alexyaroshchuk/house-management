import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { PlusOutlined } from '@ant-design/icons';
import { useRouteMatch } from 'react-router-dom';

import Modal from '@Components/Modal/Modal';
import Form from '@Components/Form/Form';
import Input from '@Components/Input/Input';
import Select from '@Components/Select/Select';
import Datepicker from '@Components/Datepicker/Datepicker';
import Button from '@Components/Button/Button';
import Loader from '@Components/Loader/Loader';
import {
    datePickerFormat,
    weightMTS,
    oneThousand,
    oneHundred,
} from '@Utils/formatHelpers';
import { numberFieldValidator } from '@Utils/helpers';
import useGetDirectory from '@Context/Contract/Hooks/useGetDirectory';
import { CONTRACTS_TYPE } from '@Context/Contracts/Store/constants';
import './ContractModal.scss';

const ContractModal = (props) => {
    const {
        initialValues,
        onCancel,
        onFinish,
        onOk,
        success,
        isLoader,
        errors,
        contractType,
        title,
        onUpdateInitialValues,
    } = props;

    const {
        contractDirectory,
        modalLoader,
        getDirectoryRequest,
    } = useGetDirectory();

    const match = useRouteMatch();
    const isSellerContractPath = match.path === '/seller-contracts/:id';

    const {
        buyers = [],
        sellers = [],
        commodities = [],
        exporters = [],
        shipped_methods = [],
    } = contractDirectory;

    const [addBuyerFormElements, setAddBuyerFormElements] = useState([]);
    const [commodityIndex, setCommodityIndex] = useState(1);

    useEffect(() => {
        getDirectoryRequest();
    }, []);

    useEffect(() => {
        const initialValuesArray = Object.keys(initialValues);
        const commodityLength = initialValuesArray.filter(
            (value) => value.indexOf('commodity') !== -1
        ).length;

        let commodityRowWithIncreasedIndex = [];

        for (let i = 1; i < commodityLength; i++) {
            let result = [];
            result = commodityRow.map((item) => {
                const underscoreIndex = item.name.indexOf('_');
                const name = `${item.name.slice(0, underscoreIndex)}_${i + 1}`;

                return {
                    ...item,
                    name,
                };
            });

            commodityRowWithIncreasedIndex = commodityRowWithIncreasedIndex.concat(
                result
            );
        }
        setAddBuyerFormElements([...commodityRowWithIncreasedIndex]);

        if (!isEmpty(initialValues)) {
            setCommodityIndex(commodityLength);
        }
    }, [initialValues, contractDirectory]);

    const commodityOptions = commodities.map((commodity) => {
        const { id, title, logo } = commodity;

        return {
            id,
            value: id + '',
            text: `${title} (${logo.title})`,
        };
    });

    const buyerOptions = buyers.map((buyer) => {
        const { id, name } = buyer;

        return {
            id,
            value: id + '',
            text: name,
        };
    });

    const sellerOptions = sellers.map((seller) => {
        const { id, name } = seller;

        return {
            id,
            value: id + '',
            text: name,
        };
    });

    const paymentOptions = shipped_methods.map((method, idx) => {
        const { key, value } = method;

        return {
            id: idx,
            value: key,
            text: value,
        };
    });

    const exporterOptions = exporters.map((exporter) => {
        const { id, name } = exporter;

        return {
            id,
            value: id + '',
            text: name,
        };
    });

    const renderNumberColumn = () => {
        return <Input placeholder="Number" />;
    };

    const renderComodityColumn = () => {
        return (
            <Select options={commodityOptions} placeholder="Select commodity" />
        );
    };

    const renderBuyerColumn = () => {
        return <Select options={buyerOptions} placeholder="Select buyer" />;
    };

    const renderSellerColumn = () => {
        return <Select options={sellerOptions} placeholder="Select seller" />;
    };

    const renderQuantity = () => {
        return <Input placeholder="0" suffix={weightMTS} />;
    };

    const renderPriceColumn = () => {
        return <Input placeholder="0" prefix="$" suffix="PMT" />;
    };

    const renderLetterOfCreditColumn = () => {
        return <Input placeholder="Letter of credit" />;
    };

    const renderPaymnetMethodColumn = () => {
        return (
            <Select
                placeholder="Select payment method"
                options={paymentOptions}
            />
        );
    };

    const renderExporterColumn = () => {
        return (
            <Select
                placeholder="Select exporter"
                options={exporterOptions}
                mode="multiple"
            />
        );
    };

    const renderDateColumn = () => {
        return <Datepicker format={datePickerFormat()} />;
    };

    const commodityRow = [
        {
            name: `commodity_1`,
            rules: [
                {
                    required: true,
                    message: 'Please, select commodity',
                },
            ],
            label: 'Commodity',
            className: 'commodity',
            render: renderComodityColumn,
        },
        {
            name: `quantity_1`,
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
            className: 'quantity',
            render: renderQuantity,
        },
        {
            name: `pmt_1`,
            rules: [
                {
                    required: true,
                    message: 'Please, enter price',
                },
                () => ({
                    validator(rule, value) {
                        return numberFieldValidator(
                            value,
                            'Price should be number'
                        );
                    },
                }),
            ],
            label: 'Price',
            className: 'price',
            render: renderPriceColumn,
        },
    ];

    const staticBuyerElements = [
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
        {
            name: 'buyer_id',
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
            name: 'date_start',
            rules: [
                {
                    required: true,
                    message: 'Please, enter date start',
                },
            ],
            label: 'Date start',
            render: () => renderDateColumn(),
        },
        {
            name: 'exporter_ids',
            label: 'Exporter',
            render: renderExporterColumn,
        },
        {
            name: 'shipped_method',
            label: 'Payment method',
            render: renderPaymnetMethodColumn,
        },
        {
            name: 'letter_of_credit',
            label: 'Letter of credit',
            render: renderLetterOfCreditColumn,
        },
    ];

    const staticSellerElements = [
        {
            name: 'seller_id',
            rules: [
                {
                    required: true,
                    message: 'Please, select seller',
                },
            ],
            label: 'Seller',
            className: 'seller',
            render: renderSellerColumn,
        },
        {
            name: 'date_start',
            rules: [
                {
                    required: true,
                    message: 'Please, enter date start',
                },
            ],
            label: 'Date start',
            render: () => renderDateColumn(),
        },
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

    const getBuyerFormElements = () => [
        ...staticBuyerElements,
        ...commodityRow,
        ...addBuyerFormElements,
    ];

    const getSellerFormElements = () => [
        ...staticSellerElements,
        ...commodityRow,
        ...addBuyerFormElements,
    ];

    const buyerFormElements = getBuyerFormElements();

    const addCommodityHandler = () => {
        const commodityRowWithIncreasedIndex = commodityRow.map((item) => {
            const underscoreIndex = item.name.indexOf('_');
            const name = `${item.name.slice(0, underscoreIndex)}_${
                commodityIndex + 1
            }`;

            return {
                ...item,
                name,
            };
        });

        setCommodityIndex(commodityIndex + 1);
        setAddBuyerFormElements([
            ...addBuyerFormElements,
            ...commodityRowWithIncreasedIndex,
        ]);
    };

    const deleteCommodityHandler = () => {
        const commodityLength = Object.keys(initialValues).filter(
            (commodity) => commodity.indexOf('commodity') !== -1
        ).length;

        if (commodityLength === commodityIndex) {
            const cloneInitialValues = Object.assign({}, initialValues);

            delete cloneInitialValues[`commodity_${commodityLength}`];
            delete cloneInitialValues[`quantity_${commodityLength}`];
            delete cloneInitialValues[`pmt_${commodityLength}`];

            onUpdateInitialValues(cloneInitialValues);
            setCommodityIndex(commodityLength - 1);
        }

        setAddBuyerFormElements(
            addBuyerFormElements.slice(0, addBuyerFormElements.length - 3)
        );
    };

    const renderAddButton = () => {
        return (
            <Button
                icon={<PlusOutlined />}
                type="link"
                onClick={addCommodityHandler}
            >
                Add commodity
            </Button>
        );
    };

    const renderDeleteButton = () => {
        return (
            <Button
                type="link"
                danger
                onClick={deleteCommodityHandler}
                disabled={buyerFormElements.length === 9 ? true : false}
            >
                Delete
            </Button>
        );
    };

    const actions = [
        {
            className: 'add',
            render: renderAddButton,
        },
        {
            className: 'delete',
            render: renderDeleteButton,
        },
    ];

    const getElements = () => {
        switch (contractType) {
            case CONTRACTS_TYPE.BUYER:
                return getBuyerFormElements();
            case CONTRACTS_TYPE.SELLER:
                return getSellerFormElements();
            default:
                return [];
        }
    };

    const setInitialValues = () => {
        if (!isEmpty(initialValues)) {
            const {
                buyer = {},
                seller = {},
                commodity = {},
                exporter = [],
            } = initialValues;
            const result = {
                ...initialValues,
                buyer: buyer.name,
                seller: seller.name,
                commodity: commodity.title,
                exporter: exporter.map((exp) => exp.name),
            };

            return result;
        }

        return initialValues;
    };

    const finishHandler = (values) => {
        let result = {};

        const {
            number,
            date_start,
            buyer_id = '',
            seller_id = '',
            exporter_ids = [],
            letter_of_credit = '',
            shipped_method = '',
        } = values;

        const valueKeys = Object.keys(values);
        const commodity_ids = [];
        const commodity_pmts = [];
        const commodity_weights = [];

        valueKeys.forEach((key) => {
            if (key.indexOf('commodity') !== -1) {
                commodity_ids.push(+values[key]);
            } else if (key.indexOf('pmt') !== -1) {
                commodity_pmts.push(values[key] * oneHundred);
            } else if (key.indexOf('quantity') !== -1) {
                commodity_weights.push(values[key] * oneThousand);
            }
        });

        switch (contractType) {
            case CONTRACTS_TYPE.BUYER:
                result = {
                    number,
                    date_start,
                    buyer_id,
                    commodity_ids,
                    commodity_weights,
                    commodity_pmts,
                    exporter_ids,
                    letter_of_credit,
                    shipped_method,
                };
                break;
            case CONTRACTS_TYPE.SELLER:
                result = {
                    commodity_ids,
                    commodity_weights,
                    commodity_pmts,
                    number,
                    date_start,
                    seller_id,
                };
                break;
            default:
                result = {};
        }

        onFinish(result);
    };

    const formConfig = {
        name: 'contract-form',
        initialValues: setInitialValues(),
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
            <Button
                key="cancel"
                onClick={onCancel}
                disabled={modalLoader || isLoader}
            >
                Cancel
            </Button>,
            <Button
                form={formConfig.name}
                type="primary"
                key="create"
                htmlType="submit"
                disabled={modalLoader || isLoader}
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
                    {`Contract has been ${actionType} successfully`}
                </p>
            );
        }

        if (modalLoader || isLoader) {
            return <Loader size="large" style="white" />;
        } else {
            return (
                <Form
                    formConfig={formConfig}
                    elements={getElements()}
                    actions={!isSellerContractPath ? actions : []}
                    errors={errors}
                />
            );
        }
    };

    const getModalClassName = () => {
        switch (contractType) {
            case CONTRACTS_TYPE.BUYER:
                return 'create-buyer-modal';
            case CONTRACTS_TYPE.SELLER:
                return 'create-seller-modal';
            default:
                return '';
        }
    };

    return (
        <Modal
            {...props}
            destroyOnClose={true}
            width={730}
            className={`contract-modal ${getModalClassName()}`}
            footer={renderModalFooter()}
            onCancel={onCancel}
        >
            {renderModalTemplate()}
        </Modal>
    );
};

export default ContractModal;
