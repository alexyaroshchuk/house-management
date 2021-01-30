import React from 'react';
import Input from '@Components/Input/Input';

const renderInputPassword = (placeholder) => {
    return (
        <Input type="password" placeholder={placeholder} inputType="password" />
    );
};

export const password = [
    {
        name: 'password',
        rules: [
            {
                required: true,
                message: 'Please enter password',
            },
            {
                min: 6,
                message: 'The password must be at least 6 characters!',
            },
        ],
        validateTrigger: 'onBlur',
        label: 'Create password',
        render: () => renderInputPassword('Password'),
    },
    {
        name: 'confirm',
        dependencies: ['password'],
        validateFirst: true,
        rules: [
            {
                required: true,
                message: 'Please enter password',
            },
            {
                min: 6,
                message: 'The password must be at least 6 characters!',
            },
            ({ getFieldValue }) => ({
                validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }

                    return Promise.reject("Passwords don't match");
                },
            }),
        ],
        validateTrigger: 'onBlur',
        label: 'Confirm password',
        render: () => renderInputPassword('Confirm Password'),
    },
];
