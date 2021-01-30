import { LocalStorageHelper } from '../../../Framework/Utils/localStorageHelper';

const USER_KEY = 'user';

export const userStorage = {
    setUser: (user) => LocalStorageHelper.set(USER_KEY, user),
    getUser: () => LocalStorageHelper.get(USER_KEY),
};
