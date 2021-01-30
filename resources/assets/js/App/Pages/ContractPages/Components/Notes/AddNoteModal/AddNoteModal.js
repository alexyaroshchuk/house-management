import React from 'react';

import Modal from '@Components/Modal/Modal';
import Input from '@Components/Input/Input';
import Form from '@Components/Form/Form';
import Loader from '@Components/Loader/Loader';
import Button from '@Components/Button/Button';
import './AddNoteModal.scss';

const renderDescription = () => {
    return <Input inputType="textarea" placeholder="Enter text node" />;
};

const AddNoteModal = (props) => {
    const {
        isShowModal,
        modalLoader,
        closeModal,
        success,
        onFinish,
        onOk,
        errors,
    } = props;

    const formConfig = {
        name: 'add-note-form',
        onFinish: onFinish,
        layout: 'vertical',
    };

    const elements = [
        {
            name: 'text',
            rules: [
                {
                    required: true,
                    message: 'Please, enter note',
                },
            ],
            label: 'Description',
            render: () => renderDescription(),
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
                Create
            </Button>,
        ];
    };

    const renderModalTemplate = () => {
        if (success) {
            return (
                <div className="success">
                    <p className="info">Note has been created successfully</p>
                </div>
            );
        }

        if (modalLoader) {
            return <Loader size="large" style="white" />;
        } else {
            return (
                <Form
                    formConfig={formConfig}
                    elements={elements}
                    errors={errors}
                />
            );
        }
    };

    return (
        <Modal
            destroyOnClose={true}
            title="Add new note"
            visible={isShowModal}
            onCancel={closeModal}
            className="add-note-modal note-modal"
            footer={renderModalFooter()}
            width={730}
        >
            {renderModalTemplate()}
        </Modal>
    );
};

export default AddNoteModal;
