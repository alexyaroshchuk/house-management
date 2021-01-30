import { useState } from 'react';
import { useSellerContext } from './useSellerContext';
import * as queries from '../Store/queries';
import * as actions from '../Store/actions';

export const useGetMainSellerContract = () => {
    const {
        state: { mainSellerContract },
        dispatch,
    } = useSellerContext();
    const [isLoading, setIsLoading] = useState(true);

    const getMainSellerContractRequest = (id) => {
        setIsLoading(true);

        queries
            .getMainSellerContract(id)
            .then((response) => {
                setIsLoading(false);
                const { payload } = response.data;
                dispatch(actions.setMainSellerContract(payload));
            })
            .catch((error) => {
                setIsLoading(true);
            });
    };

    return {
        mainSellerContract,
        isLoading,
        getMainSellerContract: getMainSellerContractRequest,
    };
};

export default useGetMainSellerContract;
