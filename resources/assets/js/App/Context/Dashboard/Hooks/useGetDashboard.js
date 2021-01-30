import { useState } from 'react';
import { useDashboardContext } from './useDashboardContext';
import * as actions from '../Store/actions';
import { getDashboard } from '../Store/queries';

export const useGetDashboard = () => {
    const {
        state: { dashboard },
        dispatch,
    } = useDashboardContext();

    const [isLoading, setIsLoading] = useState(true);

    const getDashboardRequest = () => {
        setIsLoading(true);

        getDashboard()
            .then((response) => {
                const { payload } = response.data;
                dispatch(actions.setDashboard(payload));
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
            });
    };

    return {
        dashboard,
        isLoading,
        getDashboard: getDashboardRequest,
    };
};

export default useGetDashboard;
