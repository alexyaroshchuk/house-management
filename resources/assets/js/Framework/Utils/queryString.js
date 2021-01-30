import { useState, useCallback } from 'react';
import qs from 'query-string';
import { v4 as uuidv4 } from 'uuid';
import { CONTRACTS_STATUS } from '@Context/Contracts/Store/constants';

export const CONTRACTS_STATUS_TABS = [
    {
        id: uuidv4(),
        value: CONTRACTS_STATUS.ACTIVE,
        text: 'Active',
    },
    {
        id: uuidv4(),
        value: CONTRACTS_STATUS.ARCHIVE,
        text: 'Finished',
    },
];

const setQueryStringWithoutPageReload = (qsValue) => {
    const newUrl =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        qsValue;

    window.history.replaceState({ path: newUrl }, '', newUrl);
};

export const setQueryStringValue = (
    key,
    value,
    queryString = window.location.search
) => {
    const values = qs.parse(queryString);
    const newQsValue = qs.stringify({ ...values, [key]: value });
    setQueryStringWithoutPageReload(`?${newQsValue}`);
};

export const getQueryStringValue = (
    key,
    queryString = window.location.search
) => {
    const values = qs.parse(queryString);
    return values[key];
};

export const useQueryString = (key) => {
    const [value, setValue] = useState(
        getQueryStringValue(key) || CONTRACTS_STATUS_TABS[0].value
    );
    const onSetValue = useCallback(
        (newValue) => {
            setValue(newValue);
            setQueryStringValue(key, newValue);
        },
        [key]
    );

    return [value, onSetValue];
};
