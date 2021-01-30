import React from 'react';
import Input from '@Components/Input/Input';

const renderInput = (placeholder) => (
    <Input type="text" placeholder={placeholder} />
);

const banksElements = [
    {
        name: 'title',
        rules: [
            {
                required: true,
                message: 'Please, enter bank name',
            },
        ],
        label: 'Bank name',
        render: () => renderInput('Enter bank name'),
    },
];

export default banksElements;
