import { useContractContext } from './useContractContext';
import { getBanks } from '../Store/queries';
import { setBanks, setModalLoader } from '../Store/actions';

const useGetBanks = () => {
    const {
        state: { banks, modalLoader },
        dispatch,
    } = useContractContext();

    const getBanksRequest = (callback = '') => {
        dispatch(setModalLoader(true));

        getBanks()
            .then((response) => {
                const { payload } = response.data;
                dispatch(setBanks(payload));
                dispatch(setModalLoader(false));
                callback && callback();
            })
            .catch((error) => {
                dispatch(setModalLoader(false));
            });
    };

    return {
        banks,
        modalLoader,
        getBanks: getBanksRequest,
    };
};

export default useGetBanks;
