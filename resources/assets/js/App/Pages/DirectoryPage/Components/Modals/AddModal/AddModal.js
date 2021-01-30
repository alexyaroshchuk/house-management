import React from 'react';
import Modal from '@Components/Modal/Modal';
import Form from '@Components/Form/Form';
import Button from '@Components/Button/Button';
import Loader from '@Components/Loader/Loader';
import Input from '@Components/Input/Input';
import Select from '@Components/Select/Select';

import addModalElements from './Elements/index';
import './AddModal.scss';
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

const AddModal = (props) => {
    const {
        isShowModal,
        modalLoader,
        closeModal,
        directoryType,
        logos,
        directoryDisplayName,
        success,
        onFinish,
        onOk,
        rowData = {},
        errors,
    } = props;

    const formConfig = {
        name: 'add-directory-form',
        onFinish: onFinish,
        layout: 'vertical',
    };

    const getAddModalElements = () => {
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
                return addModalElements[directoryType.key];
        }
    };

    const renderModalTemplate = () => {
        if (success) {
            return (
                <div className="success">
                    <p className="info">
                        {`${directoryDisplayName} has been created successfully `}
                    </p>
                </div>
            );
        }

        if (modalLoader) {
            return <Loader size="large" style="white" />;
        } else {
            return (
                <Form
                    formConfig={formConfig}
                    elements={getAddModalElements()}
                    initialValues={rowData}
                    errors={errors}
                />
            );
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
                Add
            </Button>,
        ];
    };

    return (
        <Modal
            destroyOnClose={true}
            title={`Add new ${directoryDisplayName}`}
            visible={isShowModal}
            onCancel={closeModal}
            className="add-modal"
            footer={renderModalFooter()}
        >
            {renderModalTemplate()}
        </Modal>
    );
};

export default AddModal;
