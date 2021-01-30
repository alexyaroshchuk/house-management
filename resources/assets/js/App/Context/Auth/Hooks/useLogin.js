import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { login } from '../Store/queries';
import { setUser, setUserLoading } from '../Store/actions';

export const useLogin = () => {
    const {
        state: { userLoading },
        dispatch,
    } = useAuthContext();

    const request = (payload, callback = '') => {
        dispatch(setUserLoading(true));

        login(payload)
            .then((response) => {
                const { payload } = response.data;
                dispatch(setUser(payload));
                dispatch(setUserLoading(false));
                callback && callback();
            })
            .catch(() => {
                dispatch(setUserLoading(false));
            });
    };

    return [userLoading, request];
};

export default useLogin;
