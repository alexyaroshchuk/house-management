import { useState } from 'react';
import { useContractContext } from './useContractContext';
import { addEditPlan, deletePlan } from '../Store/queries';
import { setModalLoader } from '../Store/actions';

export const usePlannedShipmentsActions = () => {
    const {
        dispatch,
        state: { modalLoader },
    } = useContractContext();
    const [isSuccess, setIsSuccess] = useState(false);

    const addEditPlanRequest = (id, plan) => {
        dispatch(setModalLoader(true));

        addEditPlan(id, plan)
            .then((response) => {
                dispatch(setModalLoader(false));
                setIsSuccess(true);
            })
            .catch((error) => {
                dispatch(setModalLoader(false));
                setIsSuccess(false);
            });
    };

    const deletePlanRequest = (id, plan) => {
        dispatch(setModalLoader(true));

        deletePlan(id, plan)
            .then((response) => {
                dispatch(setModalLoader(false));
                setIsSuccess(true);
            })
            .catch((error) => {
                dispatch(setModalLoader(false));
                setIsSuccess(false);
            });
    };

    return {
        modalLoader,
        isSuccess,
        setIsSuccess,
        addEditPlan: addEditPlanRequest,
        deletePlan: deletePlanRequest,
    };
};

export default usePlannedShipmentsActions;
