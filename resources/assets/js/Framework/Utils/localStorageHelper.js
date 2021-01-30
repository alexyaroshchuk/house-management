export const LocalStorageHelper = {
    set(key, value) {
        localStorage.setItem(
            key,
            typeof value === 'object' ? JSON.stringify(value) : value
        );
    },
    get(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            return localStorage.getItem(key);
        }
    },
    getFromObj(key, ObjKey) {
        try {
            const obj = JSON.parse(localStorage.getItem(key));
            return obj && ObjKey ? obj[ObjKey] : '';
        } catch (e) {
            return '';
        }
    },
    remove(key) {
        localStorage.removeItem(key);
    },
    update(key, value) {
        LocalStorageHelper.set(key, {
            ...LocalStorageHelper.get(key),
            ...value,
        });
    },
    clear() {
        localStorage.clear();
    },
};
