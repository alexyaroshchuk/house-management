import { createNotification } from '../Utils/notification';
import { get } from 'lodash';

export const errorResponseHandler = (error) => {
    // check for errorHandle config
    if (
        error.config &&
        error.config.hasOwnProperty('errorHandle') &&
        error.config.errorHandle === false
    ) {
        return Promise.reject(error);
    }

    // if has response show the error
    if (error.response) {
        const message = get(error, 'response.data.message', 'Error');

        createNotification('error', message);
    }

    throw error;
};
