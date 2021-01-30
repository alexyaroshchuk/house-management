import React from 'react';
import Input from '@Components/Input/Input';

const renderInput = (placeholder) => (
    <Input type="text" placeholder={placeholder} />
);

const logosElements = [
    {
        name: 'title',
        rules: [
            {
                required: true,
                message: 'Please, enter logo name',
            },
        ],
        label: 'Logo name',
        render: () => renderInput('Enter logo name'),
    },
];

export default logosElements;
