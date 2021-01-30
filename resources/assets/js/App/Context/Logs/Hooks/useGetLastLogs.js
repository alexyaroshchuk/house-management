import { useLogsContext } from './useLogsContext';
import { getLastLogs } from '../Store/queries';
import { setLogs, setLogsLoader } from '../Store/actions';

export const useGetLastLogs = () => {
    const {
        state: { logs, logsLoader },
        dispatch,
    } = useLogsContext();

    const getLastLogsRequest = () => {
        dispatch(setLogsLoader(true));

        getLastLogs()
            .then((response) => {
                const { payload } = response.data;
                dispatch(setLogs(payload));
                dispatch(setLogsLoader(false));
            })
            .catch(() => {
                dispatch(setLogsLoader(true));
            });
    };

    return {
        logs,
        logsLoader,
        getLastLogs: getLastLogsRequest,
    };
};

export default useGetLastLogs;
