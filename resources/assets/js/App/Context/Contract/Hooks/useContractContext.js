import { useContext } from 'react';
import { contractStore } from '../ContractContext';

export const useContractContext = () => useContext(contractStore);

export default useContractContext;
