import axios from 'axios';
import { errorResponseHandler } from './errorHandler';
import { DEFAULT_HEADERS } from './constants';
import { getUrl } from './helpers';

const axiosHttp = axios.create({
    headers: DEFAULT_HEADERS,
    responseType: 'json',
});

// apply interceptor on response
axiosHttp.interceptors.response.use(
    (response) => response,
    errorResponseHandler
);

const sendRequest = (method, url, data, config) => {
    const { apiPrefix, ...axiosConfig } = config;
    const newUrl = getUrl(url, apiPrefix);

    const req = axiosHttp({
        method,
        url: newUrl,
        data,
        ...axiosConfig,
    });

    return req;
};

const get = (reqParams) => {
    const { url, params = {}, config = {} } = reqParams;

    return sendRequest('get', url, null, {
        params,
        ...config,
    });
};

const post = (reqParams) => {
    const { url, data, config = {} } = reqParams;

    return sendRequest('post', url, data, config);
};

const put = (reqParams) => {
    const { url, data, config = {} } = reqParams;

    return sendRequest('put', url, data, config);
};

const del = (reqParams) => {
    const { url, id, data = null, config = {} } = reqParams;

    return sendRequest('delete', `${url}/${id}`, data, config);
};

export const createCancelToken = () => axios.CancelToken.source();

export const checkCancelToken = (error) => {
    return axios.isCancel(error);
};

export default {
    get,
    post,
    put,
    del,
    delete: del,
};
