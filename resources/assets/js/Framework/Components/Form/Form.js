import React, { useEffect } from 'react';
import { Form as FormAnt } from 'antd';
import propTypes, { shape } from 'prop-types';

import './Form.scss';

const Form = (props) => {
    const [form] = FormAnt.useForm();
    const { elements, actions, formConfig, initialValues, errors } = props;
    const { observeField, resetField, ...antFormConfig } = formConfig;
    const elementsList = [...elements, ...actions];

    useEffect(() => {
        form.setFieldsValue(initialValues);

        if (errors) {
            const result = [];

            for (let key in errors) {
                result.push({
                    name: key,
                    errors: errors[key],
                });
            }

            form.setFields(result);
        }
    }, [initialValues]);

    const renderElement = (element, idx) => {
        const { label, render, onChange, ...props } = element;
        return (
            <FormAnt.Item
                shouldUpdate={true}
                key={idx}
                label={label}
                onChange={onChange}
                {...props}
            >
                {render()}
            </FormAnt.Item>
        );
    };

    const onFinish = (values) => {
        form.resetFields();
        antFormConfig.onFinish(values);
    };

    const onFieldsChange = (changedFields) => {
        if (
            observeField &&
            changedFields.length === 1 &&
            changedFields.find((item) => item.name.includes(observeField))
        ) {
            form.resetFields([resetField]);
        }
    };

    return (
        <FormAnt
            form={form}
            {...antFormConfig}
            onFinish={onFinish}
            onFieldsChange={onFieldsChange}
        >
            {elementsList.map((element, idx) => {
                return renderElement(element, idx);
            })}
        </FormAnt>
    );
};

Form.defaultProps = {
    formConfig: {
        name: '',
        initialValues: {},
        onFinish: () => {},
        layout: 'horizontal',
    },
    elements: [],
    actions: [],
};

Form.propTypes = {
    formConfig: propTypes.shape({
        name: propTypes.string.isRequired,
        initialValues: propTypes.object,
        onFinish: propTypes.func.isRequired,
        layout: propTypes.string.isRequired,
    }),
    elements: propTypes.arrayOf(
        shape({
            name: propTypes.string.isRequired,
            rules: propTypes.array,
            render: propTypes.func,
        })
    ),
    actions: propTypes.arrayOf(
        shape({
            render: propTypes.func.isRequired,
        })
    ),
};

export default Form;
