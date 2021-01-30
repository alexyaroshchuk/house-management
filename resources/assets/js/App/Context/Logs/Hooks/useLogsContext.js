import { useContext } from 'react';
import { logsStore } from '../LogsContext';

export const useLogsContext = () => useContext(logsStore);

export default useLogsContext;
