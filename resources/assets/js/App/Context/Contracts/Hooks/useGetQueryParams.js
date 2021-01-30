import { useContractsContext } from './useContractsContext';
import * as actions from '../Store/actions';

export const useGetQueryParams = () => {
    const {
        state: { params },
        dispatch,
    } = useContractsContext();

    const resetQueryParams = () => {
        dispatch(actions.resetQueryParams());
    };

    return { params, resetQueryParams };
};

export default useGetQueryParams;
