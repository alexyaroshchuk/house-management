import React from 'react';
import Input from '@Components/Input/Input';

const renderInput = (placeholder) => (
    <Input type="text" placeholder={placeholder} />
);

const buyersElements = [
    {
        name: 'name',
        rules: [
            {
                required: true,
                message: 'Please, enter name',
            },
        ],
        label: 'Buyer name',
        render: () => renderInput('Buyer name'),
    },
];

export default buyersElements;
