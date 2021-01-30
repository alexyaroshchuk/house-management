import { useState } from 'react';
import { useDashboardContext } from './useDashboardContext';
import * as actions from '../Store/actions';
import { getPayments } from '../Store/queries';

export const useGetPayments = () => {
    const {
        state: { payments, params },
        dispatch,
    } = useDashboardContext();

    const [paginationLoader, setPaginationLoader] = useState(false);

    const getPaymentsRequest = (params) => {
        setPaginationLoader(true);

        getPayments(params)
            .then((response) => {
                const { payload } = response.data.payload;
                const { pagination } = response.data.payload;

                dispatch(actions.setPayments(payload));
                dispatch(actions.setPagination(pagination));
                setPaginationLoader(false);
            })
            .catch((error) => {
                setPaginationLoader(true);
            });
    };

    return {
        payments,
        params,
        paginationLoader,
        getPayments: getPaymentsRequest,
    };
};

export default useGetPayments;
