import { CONTRACT_STATUS } from '@Context/Contract/Store/constants';
import { get, toNumber, toString } from 'lodash';

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties,
    };
};

const goBack = () => {
    window.history.back();
};

const checkIsContractFinished = (contract) => {
    const status = get(contract, 'status', '');
    return status ? status === CONTRACT_STATUS.INACTIVE : null;
};

const numberFieldValidator = (value = '', errorMsg) => {
    const strValue = toString(value);
    const isInvalid = strValue.includes('-');

    if (!isInvalid && !isNaN(toNumber(value))) {
        return Promise.resolve();
    }

    return Promise.reject(errorMsg);
};

const moveElementToEnd = (makeLastItem, currentValue) => {
    if (currentValue === makeLastItem) {
        return 1;
    }
    return -1;
};

const sortArrayByObjKey = (array, sortKey, makeLastItem = '') =>
    array.sort((a, b) => {
        const currentValue = a[sortKey];
        const comparedValue = b[sortKey];

        switch (true) {
            case [currentValue, comparedValue].includes(makeLastItem):
                return moveElementToEnd(makeLastItem, currentValue);
            case currentValue < comparedValue:
                return -1;
            case currentValue > comparedValue:
                return 1;
            default:
                return 0;
        }
    });

export {
    updateObject,
    goBack,
    checkIsContractFinished,
    numberFieldValidator,
    sortArrayByObjKey,
};
