import { useUsersContext } from './useUsersContext';
import * as queries from '../Store/queries';
import * as actions from '../Store/actions';
import { snakeCase } from 'lodash';

export const useUserActions = () => {
    const {
        state: { modalLoader, success },
        dispatch,
    } = useUsersContext();

    const setSuccess = () => {
        dispatch(actions.setSuccess(false));
    };

    const editUserRequest = (user, errorCallback = null) => {
        dispatch(actions.setSuccess(false));
        dispatch(actions.setModalLoader(true));

        const result = {
            ...user,
            role: snakeCase(user.role),
        };

        queries
            .editUser(result)
            .then((response) => {
                dispatch(actions.setModalLoader(false));
                dispatch(actions.setSuccess(true));
            })
            .catch((error) => {
                dispatch(actions.setModalLoader(false));
                dispatch(actions.setSuccess(false));
                const { errors } = error.response.data;
                errorCallback && errorCallback(errors, user);
            });
    };

    const deleteUserRequest = (userId) => {
        dispatch(actions.setSuccess(false));
        dispatch(actions.setModalLoader(true));

        queries
            .deleteUser(userId)
            .then((response) => {
                dispatch(actions.setModalLoader(false));
                dispatch(actions.setSuccess(true));
            })
            .catch(() => {
                dispatch(actions.setModalLoader(false));
                dispatch(actions.setSuccess(false));
            });
    };

    const addUserRequest = (user, errorCallback = null) => {
        dispatch(actions.setSuccess(false));

        dispatch(actions.setModalLoader(true));
        const result = {
            ...user,
            role: snakeCase(user.role),
        };

        queries
            .addUser(result)
            .then((response) => {
                dispatch(actions.setModalLoader(false));
                dispatch(actions.setSuccess(true));
            })
            .catch((error) => {
                dispatch(actions.setModalLoader(false));
                dispatch(actions.setSuccess(false));
                const { errors } = error.response.data;
                errorCallback && errorCallback(errors, user);
            });
    };

    return [
        modalLoader,
        success,
        editUserRequest,
        deleteUserRequest,
        addUserRequest,
        setSuccess,
    ];
};

export default useUserActions;
