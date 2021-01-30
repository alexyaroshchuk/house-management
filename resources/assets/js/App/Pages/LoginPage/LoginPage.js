import React from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { get } from 'lodash';

import { useLogin } from '@Context/Auth/Hooks/useLogin';

import Form from '@Components/Form/Form';
import Input from '@Components/Input/Input';
import Checkbox from '@Components/Checkbox/Checkbox';
import Button from '@Components/Button/Button';
import Loader from '@Components/Loader/Loader';

import './LoginPage.scss';

export const LoginPage = () => {
    const [isLoading, login] = useLogin();

    const onFinish = (values) => {
        const payload = {
            email: get(values, 'username', ''),
            password: get(values, 'password', ''),
            remember: get(values, 'remember', false),
        };
        login(payload);
    };

    const renderInputUserName = () => {
        return (
            <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                type="text"
                placeholder="User name"
            />
        );
    };

    const renderInputPassword = () => {
        return (
            <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
            />
        );
    };

    const renderCheckbox = () => {
        return <Checkbox>Remember me</Checkbox>;
    };

    const renderButton = () => {
        return (
            <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
            >
                Log in
            </Button>
        );
    };

    const elements = [
        {
            name: 'username',
            rules: [
                {
                    required: true,
                    message: 'Please, enter your email address',
                },
                {
                    type: 'email',
                    message: 'Please, enter valid email address',
                },
            ],
            validateTrigger: 'onBlur',
            render: renderInputUserName,
        },
        {
            name: 'password',
            rules: [
                {
                    required: true,
                    message: 'Please enter your password',
                },
            ],
            validateTrigger: 'onBlur',
            render: renderInputPassword,
        },
        {
            name: 'remember',
            valuePropName: 'checked',
            render: renderCheckbox,
        },
    ];

    const actions = [
        {
            render: renderButton,
        },
    ];

    const formConfig = {
        name: 'login-form',
        className: 'login-form',
        initialValues: {
            remember: false,
        },
        layout: 'vertical',
        onFinish: onFinish,
    };

    return (
        <div className="login-page page">
            <div className="login-wrapper">
                <div className="authorization">Authorization</div>
                <Form
                    formConfig={formConfig}
                    elements={elements}
                    actions={actions}
                />
            </div>
            {isLoading && <Loader size="large" fullscreen />}
        </div>
    );
};

export default LoginPage;
