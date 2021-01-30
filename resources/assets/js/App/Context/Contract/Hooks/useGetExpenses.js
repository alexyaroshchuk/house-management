import { useContractContext } from './useContractContext';
import { getExpenses } from '../Store/queries';
import { setModalLoader, setExpenses } from '../Store/actions';

const useGetExpenses = () => {
    const {
        state: { expenses, modalLoader },
        dispatch,
    } = useContractContext();

    const getExpensesRequest = () => {
        dispatch(setModalLoader(true));

        getExpenses()
            .then((response) => {
                const { payload } = response.data;
                dispatch(setExpenses(payload));
                dispatch(setModalLoader(false));
            })
            .catch((error) => {
                dispatch(setModalLoader(false));
            });
    };

    return {
        expenses,
        modalLoader,
        getExpenses: getExpensesRequest,
    };
};

export default useGetExpenses;
