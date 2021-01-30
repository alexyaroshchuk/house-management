import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';

import Button from '@Components/Button/Button';
import { MODALS, MODALS_TITLE } from '../constants';
import EditMainContractModal from '../../Modals/EditMainContractModal/EditMainContractModal';
import FinishMainContractModal from '../../Modals/FinishMainContractModal/FinishMainContractModal';
import UnfinishMainContractModal from '../../Modals/UnfinishMainContractModal/UnfinishMainContractModal';

import { checkIsContractFinished } from '@Utils/helpers';
import useSellerActions from '@Context/Seller/Hooks/useSellerActions';

export const ButtonsBar = (props) => {
    const { contract, onOk } = props;

    const { modalLoader, isSuccess, editMainContract } = useSellerActions();

    const [isShowModal, setIsShowModal] = useState(false);
    const [currentModal, setCurrentModal] = useState(null);
    const [initialModalValues, setInitialModalValues] = useState({});
    const [errors, setErrors] = useState(null);

    const openModal = (type) => {
        setIsShowModal(true);
        setCurrentModal(type);
    };

    const closeModal = () => {
        setIsShowModal(false);
        setCurrentModal(null);
        setInitialModalValues({});
    };

    const getContractModalTitle = () => {
        return `${MODALS_TITLE[currentModal]}`;
    };

    const errorHandler = (errors, data) => {
        setErrors(errors);
        setInitialModalValues(data);
    };

    const onFinish = (values) => {
        switch (currentModal) {
            case MODALS.EDIT:
                const payload = {
                    ...values,
                    seller_id: contract.seller.id,
                };
                editMainContract(payload, contract.id, errorHandler);
                break;
            default:
                break;
        }
    };

    const okHandler = () => {
        closeModal();
        onOk();
    };

    const editContractHandler = () => {
        setInitialModalValues({
            number: contract.number,
            seller_contract_ids: contract.seller_contracts.map(
                (contract) => contract.id + ''
            ),
        });
        openModal(MODALS.EDIT);
    };

    const isFinishedContract = checkIsContractFinished(contract);

    const checkEditMainContractModal = () => {
        return currentModal === MODALS.EDIT;
    };

    const checkFinishMainContractModal = () => {
        return currentModal === MODALS.FINISH;
    };

    const checkUnfinishMainContractModal = () => {
        return currentModal === MODALS.UNFINISH;
    };

    const renderEditMainContractModal = () => {
        return (
            checkEditMainContractModal() && (
                <EditMainContractModal
                    title={getContractModalTitle()}
                    isShowModal={isShowModal}
                    onCancel={closeModal}
                    initialValues={initialModalValues}
                    onFinish={onFinish}
                    errors={errors}
                    success={isSuccess}
                    modalLoader={modalLoader}
                    onOk={okHandler}
                />
            )
        );
    };

    const renderFinishMainContractModal = () => {
        return (
            checkFinishMainContractModal() && (
                <FinishMainContractModal
                    title={getContractModalTitle()}
                    isShowModal={isShowModal}
                    onClose={closeModal}
                    contract={contract}
                    onOk={okHandler}
                />
            )
        );
    };

    const renderUnfinishMainContractModal = () => {
        return (
            checkUnfinishMainContractModal() && (
                <UnfinishMainContractModal
                    title={getContractModalTitle()}
                    isShowModal={isShowModal}
                    onClose={closeModal}
                    onOk={okHandler}
                    contract={contract}
                />
            )
        );
    };

    return (
        <>
            {isFinishedContract ? (
                <Button
                    icon={<EditOutlined />}
                    type="primary"
                    onClick={() => openModal(MODALS.UNFINISH)}
                >
                    Unfinish Contract
                </Button>
            ) : (
                <Button
                    icon={<EditOutlined />}
                    type="primary"
                    onClick={editContractHandler}
                >
                    Edit
                </Button>
            )}
            {!isFinishedContract && (
                <Button
                    icon={<EditOutlined />}
                    type="primary"
                    className="ant-btn-successfull"
                    onClick={() => openModal(MODALS.FINISH)}
                >
                    Finish Contract
                </Button>
            )}

            {renderFinishMainContractModal()}
            {renderEditMainContractModal()}
            {renderUnfinishMainContractModal()}
        </>
    );
};

export default ButtonsBar;
