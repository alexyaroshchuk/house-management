import { useContractContext } from './useContractContext';
import { getDirectory } from '../Store/queries';
import { setContractDirectory, setModalLoader } from '../Store/actions';

export const useGetDirectory = () => {
    const {
        state: { contractDirectory, modalLoader },
        dispatch,
    } = useContractContext();

    const getDirectoryRequest = (callback = '') => {
        dispatch(setModalLoader(true));

        getDirectory()
            .then((response) => {
                const { payload } = response.data;
                dispatch(setContractDirectory(payload));
                dispatch(setModalLoader(false));
                callback && callback();
            })
            .catch((error) => {
                dispatch(setModalLoader(false));
            });
    };

    return { contractDirectory, modalLoader, getDirectoryRequest };
};

export default useGetDirectory;
