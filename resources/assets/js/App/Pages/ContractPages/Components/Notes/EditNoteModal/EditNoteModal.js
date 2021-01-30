import React from 'react';

import Modal from '@Components/Modal/Modal';
import Input from '@Components/Input/Input';
import Form from '@Components/Form/Form';
import Button from '@Components/Button/Button';
import Loader from '@Components/Loader/Loader';
import './EditNoteModal.scss';

const renderDescription = () => {
    return <Input inputType="textarea" placeholder="Enter text node" />;
};

const EditNoteModal = (props) => {
    const {
        isShowModal,
        modalLoader,
        closeModal,
        success,
        onFinish,
        onOk,
        selectedNote = {},
        errors,
    } = props;

    const formConfig = {
        name: 'edit-note-form',
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
                Save
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
                    initialValues={selectedNote}
                    errors={errors}
                />
            );
        }
    };

    return (
        <Modal
            destroyOnClose={true}
            title="Edit note"
            visible={isShowModal}
            onCancel={closeModal}
            className="edit-note-modal note-modal"
            footer={renderModalFooter()}
            width={730}
        >
            {renderModalTemplate()}
        </Modal>
    );
};

export default EditNoteModal;
