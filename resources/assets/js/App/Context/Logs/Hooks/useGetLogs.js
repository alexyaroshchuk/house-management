import { useLogsContext } from './useLogsContext';
import { getLogs } from '../Store/queries';
import { setLogs, setLogsLoader } from '../Store/actions';

export const useGetLogs = () => {
    const {
        state: { logs, logsLoader },
        dispatch,
    } = useLogsContext();

    const getLogsRequest = (queryString) => {
        dispatch(setLogsLoader(true));

        getLogs(queryString)
            .then((response) => {
                const { data } = response.data.payload;
                dispatch(setLogs(data));
                dispatch(setLogsLoader(false));
            })
            .catch(() => {
                dispatch(setLogsLoader(true));
            });
    };

    return {
        logs,
        logsLoader,
        getLogs: getLogsRequest,
    };
};

export default useGetLogs;
