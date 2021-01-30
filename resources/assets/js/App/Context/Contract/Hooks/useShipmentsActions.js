import { useState } from 'react';
import { isFunction } from 'lodash';
import {
    addShipment,
    editShipment,
    mergeShipments,
    changeShipmentStatus,
    addContainer,
    editContainer,
    deleteContainer,
    addShipmentIncomeOutcome,
    editShipmentIncomeOutcome,
    deleteShipmentIncomeOutcome,
} from '../Store/queries';

export const useShipmentsActions = () => {
    const [isModalLoading, setIsModalLoading] = useState(false);

    const [isSuccess, setIsSuccess] = useState(false);

    const addShipmentRequest = (shipment, errorCallback = () => {}) => {
        setIsModalLoading(true);
        addShipment(shipment)
            .then((response) => {
                setIsModalLoading(false);
                setIsSuccess(true);
            })
            .catch((error) => {
                const { errors } = error.response.data;
                setIsModalLoading(false);
                setIsSuccess(false);
                isFunction(errorCallback) && errorCallback(errors, shipment);
            });
    };

    const editShipmentRequest = (shipment, id, errorCallback = () => {}) => {
        setIsModalLoading(true);
        editShipment(shipment, id)
            .then((response) => {
                setIsModalLoading(false);
                setIsSuccess(true);
            })
            .catch((error) => {
                const { errors } = error.response.data;
                setIsModalLoading(false);
                setIsSuccess(false);
                isFunction(errorCallback) && errorCallback(errors, shipment);
            });
    };

    const mergeShipmentsRequest = (shipments, errorCallback = () => {}) => {
        setIsModalLoading(true);
        mergeShipments(shipments)
            .then((response) => {
                setIsModalLoading(false);
                setIsSuccess(true);
            })
            .catch((error) => {
                const { errors } = error.response.data;
                setIsModalLoading(false);
                setIsSuccess(false);
                isFunction(errorCallback) && errorCallback(errors, shipments);
            });
    };

    const addContainerRequest = (containers, errorCallback = () => {}) => {
        setIsModalLoading(true);
        addContainer(containers)
            .then((response) => {
                setIsModalLoading(false);
                setIsSuccess(true);
            })
            .catch((error) => {
                const { errors } = error.response.data;
                setIsModalLoading(false);
                setIsSuccess(false);
                isFunction(errorCallback) && errorCallback(errors, containers);
            });
    };

    const editContainerRequest = (container, id, errorCallback = () => {}) => {
        setIsModalLoading(true);
        editContainer(container, id)
            .then((response) => {
                setIsModalLoading(false);
                setIsSuccess(true);
            })
            .catch((error) => {
                const { errors } = error.response.data;
                setIsModalLoading(false);
                setIsSuccess(false);
                isFunction(errorCallback) && errorCallback(errors, containers);
            });
    };

    const deleteContainerRequest = (id, errorCallback = () => {}) => {
        setIsModalLoading(true);
        deleteContainer(id)
            .then((response) => {
                setIsModalLoading(false);
                setIsSuccess(true);
            })
            .catch((error) => {
                const { errors } = error.response.data;
                setIsModalLoading(false);
                setIsSuccess(false);
                isFunction(errorCallback) && errorCallback(errors, id);
            });
    };

    const changeShipmentStatusRequest = (payload, id) => {
        setIsModalLoading(true);

        changeShipmentStatus(payload, id)
            .then((response) => {
                setIsModalLoading(false);
                setIsSuccess(true);
            })
            .catch((error) => {
                setIsModalLoading(false);
                setIsSuccess(false);
            });
    };

    const addShipmentIncomeOutcomeRequest = (
        shipment,
        errorCallback = () => {}
    ) => {
        setIsModalLoading(true);
        addShipmentIncomeOutcome(shipment)
            .then((response) => {
                setIsModalLoading(false);
                setIsSuccess(true);
            })
            .catch((error) => {
                const { errors } = error.response.data;
                setIsModalLoading(false);
                setIsSuccess(false);
                isFunction(errorCallback) && errorCallback(errors, shipment);
            });
    };

    const editShipmentIncomeOutcomeRequest = (
        shipment,
        id,
        errorCallback = () => {}
    ) => {
        setIsModalLoading(true);
        editShipmentIncomeOutcome(shipment, id)
            .then((response) => {
                setIsModalLoading(false);
                setIsSuccess(true);
            })
            .catch((error) => {
                const { errors } = error.response.data;
                setIsModalLoading(false);
                setIsSuccess(false);
                isFunction(errorCallback) && errorCallback(errors, shipment);
            });
    };

    const deleteShipmentIncomeOutcomeRequest = (
        id,
        errorCallback = () => {}
    ) => {
        setIsModalLoading(true);
        deleteShipmentIncomeOutcome(id)
            .then((response) => {
                setIsModalLoading(false);
                setIsSuccess(true);
            })
            .catch((error) => {
                const { errors } = error.response.data;
                setIsModalLoading(false);
                setIsSuccess(false);
                isFunction(errorCallback) && errorCallback(errors, id);
            });
    };

    return {
        isModalLoading,
        isSuccess,
        setIsSuccess,
        addShipment: addShipmentRequest,
        editShipment: editShipmentRequest,
        mergeShipments: mergeShipmentsRequest,
        changeShipmentStatus: changeShipmentStatusRequest,
        addContainer: addContainerRequest,
        editContainer: editContainerRequest,
        deleteContainer: deleteContainerRequest,
        addShipmentIncomeOutcome: addShipmentIncomeOutcomeRequest,
        editShipmentIncomeOutcome: editShipmentIncomeOutcomeRequest,
        deleteShipmentIncomeOutcome: deleteShipmentIncomeOutcomeRequest,
    };
};

export default useShipmentsActions;
