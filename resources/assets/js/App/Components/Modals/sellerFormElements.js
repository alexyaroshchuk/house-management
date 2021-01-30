import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';

import Modal from '@Components/Modal/Modal';
import Form from '@Components/Form/Form';
import Input from '@Components/Input/Input';
import Select from '@Components/Select/Select';
import Datepicker from '@Components/Datepicker/Datepicker';
import Button from '@Components/Button/Button';
import Loader from '@Components/Loader/Loader';
import { datePickerFormat, weightMTS } from '@Utils/formatHelpers';
import { numberFieldValidator } from '@Utils/helpers';
import useGetDirectory from '@Context/Contract/Hooks/useGetDirectory';

const { contractDirectory } = useGetDirectory();

const {
    sellers = [],
    commodities = [],
    exporters = [],
    shipped_methods = [],
} = contractDirectory;

const commodityOptions = commodities.map((commodity) => {
    const { id, title } = commodity;

    return {
        id,
        value: title,
        text: title,
    };
});

const sellerOptions = sellers.map((seller) => {
    const { id, name } = seller;

    return {
        id,
        value: name,
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
        value: name,
        text: name,
    };
});

const renderNumberColumn = () => {
    return <Input placeholder="Number" />;
};

const renderComodityColumn = () => {
    return <Select options={commodityOptions} placeholder="Select commodity" />;
};

const renderSellerColumn = () => {
    return <Select options={sellerOptions} placeholder="Select buyer" />;
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
        <Select placeholder="Select payment method" options={paymentOptions} />
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

const sellerFormElements = [
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
        name: 'commodity',
        rules: [
            {
                required: true,
                message: 'Please, select commodity',
            },
        ],
        label: 'Commodity',
        render: renderComodityColumn,
    },
    {
        name: 'seller',
        rules: [
            {
                required: true,
                message: 'Please, select seller',
            },
        ],
        label: 'Seller',
        render: renderSellerColumn,
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
        validateFirst: true,
        label: 'Quantity',
        render: renderQuantity,
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
        name: 'pmt',
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
        render: renderPriceColumn,
    },
];

export default sellerFormElements;
