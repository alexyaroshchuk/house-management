import { useContext } from 'react';
import { managementStore } from '../ManagementContext';

export const useManagementContext = () => useContext(managementStore);

export default useManagementContext;
