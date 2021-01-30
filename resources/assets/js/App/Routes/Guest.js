import LoginPage from '@Pages/LoginPage/Loadable';

export const Guest = [
    {
        exact: true,
        path: '/login',
        component: LoginPage,
    },
    {
        path: '*',
        redirectTo: '/login',
    },
];

export default Guest;
