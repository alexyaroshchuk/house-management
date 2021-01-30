import { useState } from 'react';
import { useSellerContext } from './useSellerContext';
import * as queries from '../Store/queries';
import * as actions from '../Store/actions';

export const useGetSellerContracts = () => {
    const {
        state: { sellerContracts },
        dispatch,
    } = useSellerContext();
    const [isLoading, setIsLoading] = useState(false);

    const getSellerContractsRequest = () => {
        setIsLoading(true);

        queries
            .getSellerContracts()
            .then((response) => {
                const { payload } = response.data;
                dispatch(actions.setSellerContracts(payload));
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(true);
            });
    };

    return {
        sellerContracts,
        isLoading,
        getSellerContracts: getSellerContractsRequest,
    };
};

export default useGetSellerContracts;
