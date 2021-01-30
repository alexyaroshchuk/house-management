import { useState } from 'react';
import { get } from 'lodash';
import { useManagementContext } from './useManagementContext';
import { getManagementInfo } from '../Store/queries';
import { setManagementInfo } from '../Store/actions';

export const useGetManagementInfo = () => {
    const {
        state: { managementInfo },
        dispatch,
    } = useManagementContext();
    const [isLoading, setIsLoading] = useState(true);

    const getManagementInfoRequest = (id) => {
        setIsLoading(true);

        getManagementInfo(id)
            .then((response) => {
                const managementInfo = get(response, 'data.payload', []);
                dispatch(setManagementInfo(managementInfo));
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    };

    return {
        managementInfo,
        isLoading,
        getManagementInfo: getManagementInfoRequest,
    };
};

export default useGetManagementInfo;
