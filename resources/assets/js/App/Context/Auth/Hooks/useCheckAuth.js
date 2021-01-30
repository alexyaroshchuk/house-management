import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { getUser } from '../Store/queries';
import { setUser, clearUser, setUserLoading } from '../Store/actions';

export const useCheckAuth = () => {
    const {
        state: { user, userLoading },
        dispatch,
    } = useAuthContext();

    const request = (callback = '') => {
        dispatch(setUserLoading(true));

        getUser()
            .then((response) => {
                const { payload } = response.data;
                dispatch(setUser(payload));
                dispatch(setUserLoading(false));
                callback && callback();
            })
            .catch(() => {
                dispatch(clearUser());
                dispatch(setUserLoading(false));
            });
    };

    return [user, userLoading, request];
};

export default useCheckAuth;
