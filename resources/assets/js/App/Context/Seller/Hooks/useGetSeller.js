import { useState } from 'react';
import { useSellerContext } from './useSellerContext';
import * as queries from '../Store/queries';
import * as actions from '../Store/actions';

export const useGetSeller = () => {
    const {
        state: { seller },
        dispatch,
    } = useSellerContext();
    const [isLoading, setIsLoading] = useState(true);

    const getSeller = (id) => {
        setIsLoading(true);

        queries
            .getSeller(id)
            .then((response) => {
                setIsLoading(false);
                const { payload } = response.data;
                dispatch(actions.setSeller(payload));
            })
            .catch((error) => {
                setIsLoading(false);
            });
    };

    return { seller, isLoading, getSeller };
};

export default useGetSeller;
