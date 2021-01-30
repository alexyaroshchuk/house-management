import React from 'react';

import './EditUserModal.scss';
import Modal from '@Components/Modal/Modal';
import Button from '@Components/Button/Button';
import Input from '@Components/Input/Input';
import Select from '@Components/Select/Select';
import Loader from '@Components/Loader/Loader';
import Form from '@Components/Form/Form';

const renderInput = (placeholder) => (
    <Input type="text" placeholder={placeholder} />
);

const renderSelect = (options) => {
    return (
        <Select
            options={options}
            initialvalues={options[0].value}
            // onChange={(e) => console.log('onChange', e)}
            placeholder="Select Role"
        />
    );
};

const EditUserModal = (props) => {
    const {
        isShowModal,
        options,
        modalLoader,
        closeModal,
        success,
        onFinish,
        onOk,
        selectedUser = {},
        errors,
    } = props;

    const formConfig = {
        name: 'edit-user-form',
        onFinish: onFinish,
        layout: 'vertical',
    };

    const elements = [
        {
            name: 'email',
            rules: [
                {
                    required: true,
                    message: 'Please, enter an e-mail',
                },
                {
                    type: 'email',
                    message: 'Please, enter valid e-mail address',
                },
            ],
            label: 'E-mail',
            render: () => renderInput('e-mail'),
        },
        {
            name: 'role',
            rules: [
                {
                    required: true,
                    message: 'Please, enter role',
                },
            ],
            label: 'Role',
            render: () => renderSelect(options),
        },
        {
            name: 'name',
            // rules: [
            //     {
            //         required: true,
            //         message: 'Please, enter your name',
            //     },
            // ],
            label: 'Full name',
            render: () => renderInput('Name'),
        },
    ];

    const renderModalFooter = () => {
        if (success) {
            return [
                <Button key="close" type="primary" onClick={onOk}>
                    Close
                </Button>,
            ];
        }

        return [
            <Button key="close" onClick={closeModal} disabled={modalLoader}>
                Cancel
            </Button>,
            <Button
                form={formConfig.name}
                key="submit"
                type="primary"
                htmlType="submit"
                disabled={modalLoader}
            >
                Save
            </Button>,
        ];
    };

    const renderModalTemplate = () => {
        if (success) {
            return (
                <div className="success">
                    <p className="info">User has been edited successfully</p>
                </div>
            );
        }

        if (modalLoader) {
            return <Loader size="large" style="white" />;
        }

        return (
            <Form
                formConfig={formConfig}
                elements={elements}
                initialValues={selectedUser}
                errors={errors}
            />
        );
    };

    return (
        <Modal
            destroyOnClose={true}
            title="Edit role"
            visible={isShowModal}
            onCancel={closeModal}
            wrapClassName="edit-user-modal"
            footer={renderModalFooter()}
            width={440}
            closable={false}
        >
            {renderModalTemplate()}
        </Modal>
    );
};

export default EditUserModal;
