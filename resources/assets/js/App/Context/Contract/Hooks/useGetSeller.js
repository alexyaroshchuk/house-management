import { useContractContext } from './useContractContext';
import { getSellersByContractId } from '../Store/queries';
import { setModalLoader, setSellersByContractId } from '../Store/actions';

export const useGetSeller = () => {
    const {
        state: { sellersByContractId, modalLoader },
        dispatch,
    } = useContractContext();

    const getSellersByContractIdRequest = (id) => {
        dispatch(setModalLoader(true));

        getSellersByContractId(id)
            .then((response) => {
                const { payload } = response.data;
                dispatch(setSellersByContractId(payload));
                dispatch(setModalLoader(false));
            })
            .catch((error) => {
                dispatch(setModalLoader(false));
            });
    };

    return {
        sellersByContractId,
        modalLoader,
        getSellersByContractId: getSellersByContractIdRequest,
    };
};

export default useGetSeller;
