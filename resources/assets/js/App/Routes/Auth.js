import AnalyticsPage from '@Pages/AnalyticsPage/Loadable';
import ContractsPage from '@Pages/ContractsPages/ContractsPage/Loadable';
import SellerContractsPage from '@Pages/ContractsPages/SellerContractsPage/Loadable';
import DashboardPage from '@Pages/Dashboard/Loadable';
import NotFoundPage from '@Pages/NotFoundPage/Loadable';
import BuyerPage from '@Pages/BuyerPage/Loadable';
import NotificationSettingsPage from '@Pages/NotificationSettingsPage/Loadable';
import ContractPage from '@Pages/ContractPages/ContractPage/Loadable';
import SellerContractPage from '@Pages/ContractPages/SellerContractPage/Loadable';
import MainSellerPage from '@Pages/MainSellerPage/Loadable';
import NotificationsPage from '@Pages/NotificationsPage/Loadable';
import RoleSettingsPage from '@Pages/RoleSettingsPage/Loadable';
import DirectoryPage from '@Pages/DirectoryPage/Loadable';
import SellerPage from '@Pages/SellerPage/Loadable';

const basedRoutes = [
    // {
    //     path: '/buyers/:id',
    //     component: BuyerPage,
    // },
    {
        exact: true,
        path: '/contracts/buyers/:id',
        component: BuyerPage,
    },
    {
        exact: true,
        path: '/login',
        redirectTo: '/',
    },
    {
        exact: true,
        path: '/notification-settings',
        component: NotificationSettingsPage,
    },
    {
        exact: true,
        path: '/notifications',
        component: NotificationsPage,
    },
    {
        exact: true,
        path: '/directory',
        component: DirectoryPage,
    },
    {
        path: '*',
        component: NotFoundPage,
    },
];

const generalRoutes = [
    {
        exact: true,
        path: '/',
        redirectTo: '/contracts',
    },
    {
        exact: true,
        path: '/analytics',
        component: AnalyticsPage,
    },
    {
        exact: true,
        path: '/contracts',
        component: ContractsPage,
    },
    {
        exact: true,
        path: '/contracts/:id',
        component: ContractPage,
    },
];

const adminRoutes = [
    {
        exact: true,
        path: '/',
        redirectTo: '/dashboard',
    },
    {
        exact: true,
        path: '/dashboard',
        component: DashboardPage,
    },
    {
        exact: true,
        path: '/analytics',
        component: AnalyticsPage,
    },
    {
        exact: true,
        path: '/contracts',
        component: ContractsPage,
    },
    {
        exact: true,
        path: '/contracts/:id',
        component: ContractPage,
    },
    {
        exact: true,
        path: '/seller-contracts',
        component: SellerContractsPage,
    },
    {
        exact: true,
        path: '/seller-contracts/:id',
        component: SellerContractPage,
    },
    {
        exact: true,
        path: '/main-seller-contracts/:id',
        component: MainSellerPage,
    },
    {
        path: '/seller/:id',
        component: SellerPage,
    },
    {
        exact: true,
        path: '/role-settings',
        component: RoleSettingsPage,
    },
    ...basedRoutes,
];

const logisticManagerRoutes = [
    {
        exact: true,
        path: '/',
        redirectTo: '/contracts',
    },
    {
        exact: true,
        path: '/contracts',
        component: ContractsPage,
    },
    {
        exact: true,
        path: '/contracts/:id',
        component: ContractPage,
    },
    {
        exact: true,
        path: '/seller-contracts',
        component: SellerContractsPage,
    },
    {
        exact: true,
        path: '/seller-contracts/:id',
        component: SellerContractPage,
    },
    {
        exact: true,
        path: '/main-seller-contracts/:id',
        component: MainSellerPage,
    },
    {
        path: '/seller/:id',
        component: SellerPage,
    },
    ...basedRoutes,
];

const salesManagerRoutes = [
    {
        exact: true,
        path: '/',
        redirectTo: '/seller-contracts',
    },
    {
        exact: true,
        path: '/analytics',
        component: AnalyticsPage,
    },
    {
        exact: true,
        path: '/seller-contracts',
        component: SellerContractsPage,
    },
    {
        exact: true,
        path: '/seller-contracts/:id',
        component: SellerContractPage,
    },
    {
        exact: true,
        path: '/main-seller-contracts/:id',
        component: MainSellerPage,
    },
    {
        path: '/seller/:id',
        component: SellerPage,
    },
    ...basedRoutes,
];

const accountantRoutes = [
    ...generalRoutes,
    {
        exact: true,
        path: '/seller-contracts',
        component: SellerContractsPage,
    },
    {
        exact: true,
        path: '/seller-contracts/:id',
        component: SellerContractPage,
    },
    {
        exact: true,
        path: '/main-seller-contracts/:id',
        component: MainSellerPage,
    },
    {
        path: '/seller/:id',
        component: SellerPage,
    },
    ...basedRoutes,
];

const userRoutes = [...generalRoutes, ...basedRoutes];

export const Auth = {
    admin: [...adminRoutes],
    // logisticManager: [...userRoutes],
    logisticManager: [...logisticManagerRoutes],
    // salesManager: [...salesManagerRoutes],
    accountant: [...accountantRoutes],
};

export default Auth;
