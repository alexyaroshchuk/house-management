import { useContractContext } from './useContractContext';
import { getBuyers } from '../Store/queries';
import { setBuyers, setModalLoader } from '../Store/actions';

export const useGetBuyers = () => {
    const {
        state: { buyers, modalLoader },
        dispatch,
    } = useContractContext();

    const getBuyersRequest = (id) => {
        dispatch(setModalLoader(true));

        getBuyers(id)
            .then((response) => {
                const { payload } = response.data;
                dispatch(setBuyers(payload));
                dispatch(setModalLoader(false));
            })
            .catch((error) => {
                dispatch(setModalLoader(false));
            });
    };

    return {
        buyers,
        modalLoader,
        getBuyers: getBuyersRequest,
    };
};

export default useGetBuyers;
