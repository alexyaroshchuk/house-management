import { BASE_API_URL, APP_PREFIXES } from './constants';

export const getPrefix = (apiPrefix) => {
    let prefix = APP_PREFIXES.V_1;

    switch (apiPrefix) {
        case 'v2':
            prefix = APP_PREFIXES.V_2;
            break;
        case 'v3':
            prefix = APP_PREFIXES.V_3;
            break;
        case 'none':
            prefix = '';
            break;
        default:
            prefix = APP_PREFIXES.V_1;
            break;
    }

    return prefix;
};

export const formatAppUrl = (url, apiPrefix) => {
    const prefix = getPrefix(apiPrefix);

    if (prefix) {
        return `${BASE_API_URL}/${prefix}/${url}`;
    }

    return `${BASE_API_URL}/${url}`;
};

export const getUrl = (url, apiPrefix) => {
    if (url.includes('http')) {
        return url;
    }

    return formatAppUrl(url, apiPrefix);
};

export default getUrl;
