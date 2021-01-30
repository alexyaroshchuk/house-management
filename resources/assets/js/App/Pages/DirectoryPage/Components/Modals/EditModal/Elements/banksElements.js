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
                message: 'Please, enter name',
            },
        ],
        label: 'Bank name',
        render: () => renderInput('Bank name'),
    },
];

export default banksElements;
