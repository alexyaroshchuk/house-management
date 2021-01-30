import React, { useEffect, useState, useRef } from 'react';
import { Switch } from 'react-router-dom';
import { get } from 'lodash';

import { privateRoutes, publicRoutes } from './Routes';

import { CustomRoute } from './Components/CustomRoute';
import { Layout } from './Components/Layout';
import { useCheckAuth } from '@Context/Auth/Hooks/useCheckAuth';
import { useGetLastLogs } from '@Context/Logs/Hooks/useGetLastLogs';
import Loader from '@Components/Loader/Loader';

const usePrevious = (value) => {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
};

export const App = () => {
    const [user, isLoading, getUser] = useCheckAuth();
    const { logs, getLastLogs } = useGetLastLogs();
    const userRole = get(user, 'role', '');
    const authenticated = !!(userRole && privateRoutes[userRole]);
    const [badgeDot, setBadgeDot] = useState(true);

    const prevLogs = usePrevious(logs);

    useEffect(() => {
        getUser();
        getLastLogs();
    }, []);

    useEffect(() => {
        if (JSON.stringify(prevLogs) !== JSON.stringify(logs)) {
            setBadgeDot(true);
        }

        const timer = setTimeout(() => getLastLogs(), 15000);
        return () => clearTimeout(timer);
    }, [logs]);

    const renderRoutes = (routes) =>
        routes.map((r) => <CustomRoute key={r.path} {...r} />);

    const renderPublicRoutes = () => renderRoutes(publicRoutes);

    const renderPrivateRoutes = () => renderRoutes(privateRoutes[userRole]);

    const renderLoader = () => (
        <Loader size="large" fullscreen style="white fill" />
    );

    const renderLayout = () => (
        <Layout
            accessAllowed={authenticated}
            user={user}
            logs={logs}
            badgeDot={badgeDot}
            setBadgeDot={setBadgeDot}
        >
            <Switch>
                {authenticated ? renderPrivateRoutes() : renderPublicRoutes()}
            </Switch>
        </Layout>
    );

    return <>{isLoading ? renderLoader() : renderLayout()}</>;
};

export default App;
