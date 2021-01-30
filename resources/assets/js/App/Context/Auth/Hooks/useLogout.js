import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { logout } from '../Store/queries';
import { clearUser, setUserLoading } from '../Store/actions';

export const useLogout = () => {
    const {
        state: { userLoading },
        dispatch,
    } = useAuthContext();

    const request = (callback = '') => {
        dispatch(setUserLoading(true));
        logout()
            .then(() => {
                dispatch(clearUser());
                dispatch(setUserLoading(false));
                callback && callback();
            })
            .catch(() => {
                dispatch(setUserLoading(false));
            });
    };

    return [userLoading, request];
};

export default useLogout;
