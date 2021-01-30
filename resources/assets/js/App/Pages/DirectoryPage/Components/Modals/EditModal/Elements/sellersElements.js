import React from 'react';
import Input from '@Components/Input/Input';

const renderInput = (placeholder) => (
    <Input type="text" placeholder={placeholder} />
);

const sellersElements = [
    {
        name: 'name',
        rules: [
            {
                required: true,
                message: 'Please, enter name',
            },
        ],
        label: 'Seller name',
        render: () => renderInput('Seller name'),
    },
];

export default sellersElements;
