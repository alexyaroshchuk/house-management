import { useState } from 'react';
import { useAnalyticsContext } from './useAnalyticsContext';
import * as actions from '../Store/actions';
import { getAnalytics } from '../Store/queries';

export const useGetAnalytics = () => {
    const {
        state: { analytics, params },
        dispatch,
    } = useAnalyticsContext();

    const [isLoading, setIsLoading] = useState(true);

    const getAnalyticsRequest = (params) => {
        setIsLoading(true);

        getAnalytics(params)
            .then((response) => {
                const { payload } = response.data;
                dispatch(actions.setAnalytics(payload));
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
            });
    };

    return {
        analytics,
        params,
        isLoading,
        getAnalytics: getAnalyticsRequest,
    };
};

export default useGetAnalytics;
