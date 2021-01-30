import { useDirectoryContext } from './useDirectoryContext';
import * as queries from '../Store/queries';
import * as actions from '../Store/actions';
import { DIRECTORY_TYPE } from '@Context/Directory/Store/constants';

export const useGetDirectory = () => {
    const {
        state: { directory, directoryLoader, logos },
        dispatch,
    } = useDirectoryContext();

    const getDirectoryRequest = (directoryType) => {
        dispatch(actions.setDirectoryLoader(true));

        if (directoryType === DIRECTORY_TYPE.COMMODITIES) {
            queries
                .getDirectory(DIRECTORY_TYPE.LOGOS)
                .then((response) => {
                    const { payload } = response.data;
                    dispatch(actions.setLogos(payload));
                })
                .catch((error) => {});
        }

        queries
            .getDirectory(directoryType)
            .then((response) => {
                const { payload } = response.data;
                dispatch(actions.setDirectory(payload));
                dispatch(actions.setDirectoryLoader(false));
            })
            .catch((error) => {
                dispatch(actions.setDirectoryLoader(true));
            });
    };

    return { directory, directoryLoader, logos, getDirectoryRequest };
};

export default useGetDirectory;
