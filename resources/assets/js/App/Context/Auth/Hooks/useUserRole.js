import { useAuthContext } from './useAuthContext';
import { get } from 'lodash';

export const useUserRole = () => {
    const {
        state: { user },
    } = useAuthContext();
    return get(user, 'role', '');
};

export default useUserRole;
