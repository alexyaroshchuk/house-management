import { useUsersContext } from './useUsersContext';
import * as queries from '../Store/queries';
import * as actions from '../Store/actions';
import { camelCase } from 'lodash';

export const useGetUsers = () => {
    const {
        state: { users, usersLoader },
        dispatch,
    } = useUsersContext();

    const getUsers = () => {
        dispatch(actions.setUsersLoader(true));

        queries
            .getUsers()
            .then((response) => {
                const { payload } = response.data;
                const result = payload.map((user) => {
                    return {
                        ...user,
                        role: camelCase(user.role),
                    };
                });
                dispatch(actions.setUsersLoader(false));
                dispatch(actions.setUsers(result));
            })
            .catch(() => {
                dispatch(actions.setUsersLoader(false));
            });
    };

    return [users, usersLoader, getUsers];
};

export default useGetUsers;
