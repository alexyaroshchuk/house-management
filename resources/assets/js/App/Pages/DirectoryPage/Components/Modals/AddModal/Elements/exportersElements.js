import React from 'react';
import Input from '@Components/Input/Input';

const renderInput = (placeholder) => (
    <Input type="text" placeholder={placeholder} />
);

const exportersElements = [
    {
        name: 'name',
        rules: [
            {
                required: true,
                message: 'Please, enter directory name',
            },
        ],
        label: 'Exporter name',
        render: () => renderInput('Exporter name'),
    },
];

export default exportersElements;
