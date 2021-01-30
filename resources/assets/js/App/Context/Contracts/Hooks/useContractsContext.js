import { useContext } from 'react';
import { contractsStore } from '../ContractsContext';

export const useContractsContext = () => useContext(contractsStore);

export default useContractsContext;
