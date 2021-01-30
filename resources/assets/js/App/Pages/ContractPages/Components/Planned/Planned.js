import React, { useState } from 'react';

import './Planned.scss';
import { usePlannedShipmentsActions } from '@Context/Contract/Hooks/usePlannedShipmentsActions';
import Table from '@Components/Table/Table';
import {
    formatDate,
    formatCurrency,
    formatWeightMTS,
    oneThousand,
} from '@Utils/formatHelpers';
import { PlusOutlined } from '@ant-design/icons';
import Card from '@Components/Card/Card';

import Button from '@Components/Button/Button';

import { AddUpdatePlanModal } from './AddUpdatePlanModal';
import { DeletePlanModal } from './DeletePlanModal';
import { MODALS, MODALS_TITLE } from './constants';
import { CONTRACT_TYPE } from '@Context/Contract/Store/constants';
import useGetContract from '@Context/Contract/Hooks/useGetContract';

export const Planned = (props) => {
    const { data = [], contractId, isFinishedContract } = props;
    const [isShowModal, setIsShowModal] = useState(false);
    const [currentModal, setCurrentModal] = useState(null);
    const [initialModalValues, setInitialModalValues] = useState({});

    const {
        isSuccess,
        setIsSuccess,
        modalLoader,
        addEditPlan,
        deletePlan,
    } = usePlannedShipmentsActions();

    const { contract, isPlanLoading, getPlanned } = useGetContract();

    const updateDataOnModalClose = () => {
        closeModal();
        getPlanned(CONTRACT_TYPE.SELLER, contract.id);
    };

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

    const openAddUpdatePlanModal = () => {
        openModal(MODALS.ADD);
    };

    const onEditPlan = (plan) => {
        const { buyer, contract_number, weight } = plan;

        const result = {
            buyer,
            contract_number,
            weight: weight / oneThousand,
        };
        openModal(MODALS.EDIT);
        setInitialModalValues(result);
    };

    const onDeletePlan = (plan) => {
        const {
            pivot: { contract_id },
        } = plan;

        const result = {
            contract_id,
        };
        openModal(MODALS.DELETE);
        setInitialModalValues(result);
    };

    const getPlanModalTitle = () => {
        return MODALS_TITLE[currentModal];
    };

    const onFinish = (values) => {
        switch (currentModal) {
            case MODALS.ADD:
            case MODALS.EDIT:
                addEditPlan(contract.id, values);
                break;
            case MODALS.DELETE:
                deletePlan(contract.id, values);
                break;
            default:
                break;
        }
    };

    const checkAddUpdateModal = () => {
        return currentModal === MODALS.ADD || currentModal === MODALS.EDIT;
    };

    const checkDeletehModal = () => {
        return currentModal === MODALS.DELETE;
    };

    const renderCreateNewButton = () => {
        return (
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={openAddUpdatePlanModal}
            >
                Add
            </Button>
        );
    };

    const renderActionsColumn = (text, record, idx) => {
        return (
            <>
                <Button
                    className="table-row-action"
                    type="link"
                    onClick={() => onEditPlan(record)}
                >
                    Edit
                </Button>

                <Button
                    className="table-row-action"
                    type="link"
                    onClick={() => onDeletePlan(record)}
                >
                    Delete
                </Button>
            </>
        );
    };

    const plannedActions = () => {
        if (!isFinishedContract) {
            return {
                title: 'Actions',
                dataIndex: 'actions',
                key: 'actions',
                render: renderActionsColumn,
            };
        }

        return {};
    };

    const columns = [
        {
            title: 'Customer',
            dataIndex: 'buyer',
            key: 'buyer',
        },
        {
            title: 'Contract',
            dataIndex: 'contract_number',
            key: 'contract_number',
        },
        {
            title: 'Quantity',
            dataIndex: 'weight',
            key: 'weight',
            className: 'table-cell-number',
            render: formatWeightMTS,
        },
        {
            title: 'Shipped',
            dataIndex: 'shipped',
            key: 'shipped',
            className: 'table-cell-number',
            render: formatWeightMTS,
        },
        plannedActions(),
    ];

    const renderAddUpdatePlanModal = () => {
        return (
            checkAddUpdateModal() && (
                <AddUpdatePlanModal
                    title={getPlanModalTitle()}
                    visible={isShowModal}
                    onCancel={closeModal}
                    initialValues={initialModalValues}
                    onFinish={onFinish}
                    success={isSuccess}
                    onOk={updateDataOnModalClose}
                    contract={contract}
                />
            )
        );
    };

    const renderDeletePlanModal = () => {
        return (
            checkDeletehModal() && (
                <DeletePlanModal
                    title={getPlanModalTitle()}
                    visible={isShowModal}
                    onCancel={closeModal}
                    initialValues={initialModalValues}
                    onFinish={onFinish}
                    success={isSuccess}
                    onOk={updateDataOnModalClose}
                    modalLoader={modalLoader}
                />
            )
        );
    };

    return (
        <div className="planned">
            <Card
                title="Planned"
                extra={!isFinishedContract ? renderCreateNewButton() : null}
            >
                <Table columns={columns} data={data} loading={isPlanLoading} />
            </Card>
            {renderAddUpdatePlanModal()}
            {renderDeletePlanModal()}
        </div>
    );
};

export default Planned;
