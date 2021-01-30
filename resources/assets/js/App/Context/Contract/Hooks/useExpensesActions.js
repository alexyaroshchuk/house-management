import { useState } from 'react';
import { isFunction } from 'lodash';
import {
    addExpense,
    editExpense,
    deleteExpense,
    transfer,
} from '../Store/queries';

export const useExpensesActions = () => {
    const [isModalLoading, setIsModalLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const addExpenseRequest = (values, errorCallback = () => {}) => {
        setIsModalLoading(true);
        addExpense(values)
            .then((response) => {
                setIsModalLoading(false);
                setIsSuccess(true);
            })
            .catch((error) => {
                const { errors } = error.response.data;
                setIsModalLoading(false);
                setIsSuccess(false);
                isFunction(errorCallback) && errorCallback(errors, values);
            });
    };

    const editExpenseRequest = (values, id, errorCallback = () => {}) => {
        setIsModalLoading(true);
        editExpense(values, id)
            .then((response) => {
                setIsModalLoading(false);
                setIsSuccess(true);
            })
            .catch((error) => {
                const { errors } = error.response.data;
                setIsModalLoading(false);
                setIsSuccess(false);
                isFunction(errorCallback) && errorCallback(errors, values);
            });
    };

    const deleteExpenseRequest = (id, errorCallback = () => {}) => {
        setIsModalLoading(true);
        deleteExpense(id)
            .then((response) => {
                setIsModalLoading(false);
                setIsSuccess(true);
            })
            .catch((error) => {
                const { errors } = error.response.data;
                setIsModalLoading(false);
                setIsSuccess(false);
                isFunction(errorCallback) && errorCallback(errors, values);
            });
    };

    const transferRequest = (values, errorCallback = () => {}) => {
        setIsModalLoading(true);
        transfer(values)
            .then((response) => {
                setIsModalLoading(false);
                setIsSuccess(true);
            })
            .catch((error) => {
                const { errors } = error.response.data;
                setIsModalLoading(false);
                setIsSuccess(false);
                isFunction(errorCallback) && errorCallback(errors, values);
            });
    };

    return {
        isModalLoading,
        isSuccess,
        setIsSuccess,
        addExpense: addExpenseRequest,
        editExpense: editExpenseRequest,
        deleteExpense: deleteExpenseRequest,
        transfer: transferRequest,
    };
};

export default useExpensesActions;
