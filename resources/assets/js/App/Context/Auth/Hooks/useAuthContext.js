import { useContext } from 'react';
import { authStore } from '../AuthContext';

export const useAuthContext = () => useContext(authStore);

export default useAuthContext;
