import { SET_LOGS, SET_LOGS_LOADER } from './constants';

export const setLogs = (logs) => ({
    type: SET_LOGS,
    logs,
});

export const setLogsLoader = (logsLoader) => ({
    type: SET_LOGS_LOADER,
    logsLoader,
});
