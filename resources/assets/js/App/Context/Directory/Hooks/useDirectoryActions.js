import { useState } from 'react';
import { isFunction } from 'lodash';

import { useDirectoryContext } from './useDirectoryContext';
import * as queries from '../Store/queries';
import * as actions from '../Store/actions';

export const useDirectoryActions = () => {
    const {
        state: { modalLoader },
        dispatch,
    } = useDirectoryContext();
    const [success, setSuccess] = useState(false);

    const addDirectoryRequest = (
        directoryType,
        data,
        errorCallback = () => {}
    ) => {
        dispatch(actions.setModalLoader(true));
        setSuccess(false);

        queries
            .addDirectory(directoryType, data)
            .then((response) => {
                dispatch(actions.setModalLoader(false));
                setSuccess(true);
            })
            .catch((error) => {
                const { errors } = error.response.data;
                dispatch(actions.setModalLoader(false));
                setSuccess(false);
                isFunction(errorCallback) && errorCallback(errors, data);
            });
    };

    const editDirectoryRequest = (
        directoryType,
        id,
        data,
        errorCallback = () => {}
    ) => {
        dispatch(actions.setModalLoader(true));
        setSuccess(false);

        queries
            .editDirectory(directoryType, id, data)
            .then((response) => {
                dispatch(actions.setModalLoader(false));
                setSuccess(true);
            })
            .catch((error) => {
                const { errors } = error.response.data;
                dispatch(actions.setModalLoader(false));
                setSuccess(false);
                isFunction(errorCallback) && errorCallback(errors, data);
            });
    };

    return {
        modalLoader,
        success,
        addDirectoryRequest,
        editDirectoryRequest,
        setSuccess,
    };
};

export default useDirectoryActions;
