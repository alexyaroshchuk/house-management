import { useContractContext } from './useContractContext';
import { getSellers } from '../Store/queries';
import { setModalLoader, setSellers } from '../Store/actions';

export const useGetSellers = () => {
    const {
        state: { sellers, modalLoader },
        dispatch,
    } = useContractContext();

    const getSellersRequest = (id, callback = '') => {
        dispatch(setModalLoader(true));

        getSellers(id)
            .then((response) => {
                const { payload } = response.data;
                dispatch(setSellers(payload));
                dispatch(setModalLoader(false));
                callback && callback();
            })
            .catch((error) => {
                dispatch(setModalLoader(false));
            });
    };

    return { sellers, modalLoader, getSellersRequest };
};

export default useGetSellers;
