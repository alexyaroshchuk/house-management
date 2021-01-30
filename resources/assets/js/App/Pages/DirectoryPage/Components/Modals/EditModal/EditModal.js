import React from 'react';

import Modal from '@Components/Modal/Modal';
import Button from '@Components/Button/Button';
import Loader from '@Components/Loader/Loader';
import Form from '@Components/Form/Form';
import Input from '@Components/Input/Input';
import Select from '@Components/Select/Select';

import editModalElements from './Elements/index';
import './EditModal.scss';

import { DIRECTORY_TYPE } from '@Context/Directory/Store/constants';

const renderInput = (placeholder) => (
    <Input type="text" placeholder={placeholder} />
);

const renderSelect = (logos) => {
    const options = logos.map((logo) => {
        const { id, title } = logo;

        return {
            id,
            value: id + '',
            text: title,
        };
    });

    return <Select placeholder="Select logo" options={options} />;
};

const EditModal = (props) => {
    const {
        isShowModal,
        modalLoader,
        directoryType,
        logos,
        directoryDisplayName,
        closeModal,
        success,
        onFinish,
        onOk,
        rowData = {},
        errors,
    } = props;

    const formConfig = {
        name: 'edit-directory-form',
        onFinish: onFinish,
        layout: 'vertical',
    };

    const getEditModalElements = () => {
        switch (directoryType.key) {
            case DIRECTORY_TYPE.COMMODITIES:
                return [
                    {
                        name: 'title',
                        rules: [
                            {
                                required: true,
                                message: 'Please, enter directory name',
                            },
                        ],
                        label: 'Commodity name',
                        render: () => renderInput('Commodity name'),
                    },
                    {
                        name: 'logo_id',
                        rules: [
                            {
                                required: true,
                                message: 'Please, select logo',
                            },
                        ],
                        label: 'Logo',
                        render: () => renderSelect(logos),
                    },
                ];
            default:
                return editModalElements[directoryType.key];
        }
    };

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
                    <p className="info">{`${directoryDisplayName} has been edited successfully`}</p>
                </div>
            );
        }

        if (modalLoader) {
            return <Loader size="large" style="white" />;
        }

        return (
            <Form
                formConfig={formConfig}
                elements={getEditModalElements()}
                initialValues={rowData}
                errors={errors}
            />
        );
    };

    return (
        <Modal
            destroyOnClose={true}
            title={`Edit ${directoryDisplayName}`}
            visible={isShowModal}
            onCancel={closeModal}
            wrapClassName="edit-modal"
            footer={renderModalFooter()}
        >
            {renderModalTemplate()}
        </Modal>
    );
};

export default EditModal;
