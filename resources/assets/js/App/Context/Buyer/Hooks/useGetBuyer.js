import { useState } from 'react';
import { get } from 'lodash';
import { useBuyerContext } from './useBuyerContext';
import { getBuyer } from '../Store/queries';
import { setBuyer } from '../Store/actions';

export const useGetBuyer = () => {
    const {
        state: { buyer },
        dispatch,
    } = useBuyerContext();
    const [isLoading, setIsLoading] = useState(true);

    const getBuyerRequest = (id) => {
        setIsLoading(true);

        getBuyer(id)
            .then((response) => {
                const newBuyer = get(response, 'data.payload', []);
                dispatch(setBuyer(newBuyer));
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    };

    return { buyer, isLoading, getBuyer: getBuyerRequest };
};

export default useGetBuyer;
