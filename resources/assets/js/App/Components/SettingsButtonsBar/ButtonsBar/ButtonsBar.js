import React, { Fragment, useState, useEffect } from 'react';

import { EditOutlined } from '@ant-design/icons';

import useGetContract from '@Context/Contract/Hooks/useGetContract';
import useContractActions from '@Context/Contract/Hooks/useContractActions';
import { CONTRACT_TYPE } from '@Context/Contract/Store/constants';

import { checkIsContractFinished } from '@Utils/helpers';
import { MODALS, MODALS_TITLE } from '../constants';
import FinishContractModal from '../../Modals/FinishContract/FinishContractModal';
import UnfinishContractModal from '../../Modals/UnfinishContractModal/UnfinishContractModal';
import ContractModal from '../../Modals/ContractModal/ContractModal';
import Button from '@Components/Button/Button';
import {
    momentFormatDate,
    oneThousand,
    oneHundred,
} from '@Utils/formatHelpers';

export const ButtonsBar = (props) => {
    const { contractType } = props;

    const [isShowModal, setIsShowModal] = useState(false);
    const [isFinishButtonActive, setIsFinishButtonActive] = useState(true);
    const [currentModal, setCurrentModal] = useState(null);
    const [initialModalValues, setInitialModalValues] = useState({});
    const [selectedContract, setSelectedContract] = useState(null);

    const { contract, getContract } = useGetContract();

    const { isSuccess, setIsSuccess, editContract } = useContractActions();

    const openModal = (type) => {
        setIsShowModal(true);
        setCurrentModal(type);
    };

    const closeModal = () => {
        setIsShowModal(false);
        setCurrentModal(null);
        setIsSuccess(false);
        setInitialModalValues({});
    };

    const updateDataOnModalClose = () => {
        closeModal();
        getContract(contractType, contract.id);
    };

    const closeFinishModal = () => {
        setIsFinishButtonActive(false);
        updateDataOnModalClose();
    };

    const getContractModalTitle = () => {
        return `${MODALS_TITLE[currentModal]}`;
    };

    const onFinish = (values) => {
        switch (currentModal) {
            case MODALS.EDIT:
                editContract(values, selectedContract.id, contractType);
                break;
            default:
                break;
        }
    };

    const editContractHandler = () => {
        const {
            number,
            commodities,
            buyer_id,
            date_start,
            letter_of_credit,
            shipped_method,
            exporters,
            seller_id,
        } = contract;

        const generatedCommodities = [];
        const generatedQuantities = [];
        const generatedPrices = [];

        commodities.forEach((commodity, idx) => {
            const { pivot } = commodity;
            const { commodity_id, weight, pmt } = pivot;

            generatedCommodities.push([
                `commodity_${idx + 1}`,
                `${commodity_id}`,
            ]);
            generatedQuantities.push([
                `quantity_${idx + 1}`,
                weight / oneThousand,
            ]);
            generatedPrices.push([`pmt_${idx + 1}`, pmt / oneHundred]);
        });

        const result = {
            number,
            buyer_id: buyer_id + '',
            seller_id: seller_id + '',
            date_start: momentFormatDate(date_start),
            letter_of_credit,
            shipped_method,
            exporter_ids:
                exporters && exporters.map((exporter) => exporter.id + ''),
            ...Object.fromEntries(generatedCommodities),
            ...Object.fromEntries(generatedQuantities),
            ...Object.fromEntries(generatedPrices),
        };
        openModal(MODALS.EDIT);
        setInitialModalValues(result);
        setSelectedContract(contract);
    };

    const updateInitialValues = (initialValues) => {
        setInitialModalValues(initialValues);
    };

    const isFinishedContract = checkIsContractFinished(contract);

    const checkAddUpdateModal = () => {
        return currentModal === MODALS.ADD || currentModal === MODALS.EDIT;
    };

    const checkFinishModal = () => {
        return currentModal === MODALS.FINISH;
    };

    const checkUnfinishModal = () => {
        return currentModal === MODALS.UNFINISH;
    };

    const renderFinishModal = () => {
        return (
            checkFinishModal() && (
                <FinishContractModal
                    title={getContractModalTitle()}
                    isShowModal={isShowModal}
                    onClose={closeModal}
                    onOk={closeFinishModal}
                    contract={contract}
                    contractType={contractType}
                />
            )
        );
    };

    const renderContractModal = () => {
        return (
            checkAddUpdateModal() && (
                <ContractModal
                    title={getContractModalTitle()}
                    visible={isShowModal}
                    onCancel={closeModal}
                    initialValues={initialModalValues}
                    onFinish={onFinish}
                    success={isSuccess}
                    onOk={updateDataOnModalClose}
                    contractType={contractType}
                    onUpdateInitialValues={updateInitialValues}
                />
            )
        );
    };

    const renderUnfinishModal = () => {
        return (
            checkUnfinishModal() && (
                <UnfinishContractModal
                    title={getContractModalTitle()}
                    isShowModal={isShowModal}
                    onClose={closeModal}
                    onOk={closeFinishModal}
                    contract={contract}
                    contractType={contractType}
                />
            )
        );
    };

    return (
        <Fragment>
            {/* <Button icon={<ClockCircleOutlined />} type="primary" ghost>
                Log
            </Button> */}
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

            {renderFinishModal()}
            {renderContractModal()}
            {renderUnfinishModal()}
        </Fragment>
    );
};

export default ButtonsBar;
