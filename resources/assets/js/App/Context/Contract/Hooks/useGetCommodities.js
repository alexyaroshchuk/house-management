import { useContractContext } from './useContractContext';
import { getCommodities } from '../Store/queries';
import { setCommodities } from '../Store/actions';

export const useGetCommodities = () => {
    const {
        state: { commodities },
        dispatch,
    } = useContractContext();

    const getCommoditiesRequest = (id) => {
        getCommodities(id)
            .then((response) => {
                const { payload } = response.data;
                dispatch(setCommodities(payload));
            })
            .catch((error) => {});
    };

    return {
        commodities,
        getCommodities: getCommoditiesRequest,
    };
};

export default useGetCommodities;
