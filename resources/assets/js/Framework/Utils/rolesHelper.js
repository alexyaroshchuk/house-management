export const ROLES = {
    ADMIN: 'admin',
    LOGISTIC: 'logisticManager',
    SALES: 'salesManager',
    ACCOUNTANT: 'accountant',
};

export const ROLES_TEXT = {
    [ROLES.ADMIN]: 'Admin',
    [ROLES.LOGISTIC]: 'Logistic manager',
    [ROLES.SALES]: 'Sales manager',
    [ROLES.ACCOUNTANT]: 'Accountant',
};

const isAdminRole = (currentRole) => {
    return currentRole === ROLES.ADMIN;
};
const isLogisticRole = (currentRole) => {
    return currentRole === ROLES.LOGISTIC;
};
const isSalesRole = (currentRole) => {
    return currentRole === ROLES.SALES;
};
const isAccountantRole = (currentRole) => {
    return currentRole === ROLES.ACCOUNTANT;
};

export { isAdminRole, isLogisticRole, isSalesRole, isAccountantRole };
