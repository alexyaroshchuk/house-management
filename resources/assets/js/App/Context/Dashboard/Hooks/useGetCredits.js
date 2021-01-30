import { useDashboardContext } from './useDashboardContext';
import * as actions from '../Store/actions';
import { getCredits } from '../Store/queries';

export const useGetCredits = () => {
    const {
        state: { credits },
        dispatch,
    } = useDashboardContext();

    const getCreditsRequest = () => {
        getCredits()
            .then((response) => {
                const { payload } = response.data;
                dispatch(actions.setCredits(payload));
            })
            .catch((error) => {});
    };

    return {
        credits,
        getCredits: getCreditsRequest,
    };
};

export default useGetCredits;
