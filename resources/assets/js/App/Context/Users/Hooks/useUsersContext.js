import { useContext } from 'react';
import { usersStore } from '../UsersContext';

export const useUsersContext = () => useContext(usersStore);

export default useUsersContext;
