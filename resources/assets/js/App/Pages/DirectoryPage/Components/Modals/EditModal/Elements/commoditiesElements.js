import React from 'react';
import Input from '@Components/Input/Input';

const renderInput = (placeholder) => (
    <Input type="text" placeholder={placeholder} />
);

const commoditiesElements = [
    {
        name: 'title',
        rules: [
            {
                required: true,
                message: 'Please, enter name',
            },
        ],
        label: 'Commodity name',
        render: () => renderInput('Commodity name'),
    },
];

export default commoditiesElements;
