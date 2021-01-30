import { useContractContext } from './useContractContext';
import { getExpenseTypes } from '../Store/queries';
import { setExpenseTypes, setModalLoader } from '../Store/actions';
import { sortArrayByObjKey } from '@Utils/helpers';

const useGetExpenseTypes = () => {
    const {
        state: { expenseTypes },
        dispatch,
    } = useContractContext();

    const getExpenseTypesRequest = () => {
        dispatch(setModalLoader(true));

        getExpenseTypes()
            .then((response) => {
                const { payload } = response.data;
                const misc = 'misc';

                const sortedData = sortArrayByObjKey(payload, 'key', misc);

                dispatch(setExpenseTypes(sortedData));
                dispatch(setModalLoader(false));
            })
            .catch((error) => {
                dispatch(setModalLoader(false));
            });
    };

    return {
        expenseTypes,
        getExpenseTypes: getExpenseTypesRequest,
    };
};

export default useGetExpenseTypes;
