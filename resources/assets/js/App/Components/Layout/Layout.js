import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Header } from '../Header';
import './Layout.scss';
import NotificationsDrawer from '../Drawers/NotificationsDrawer/NotificationsDrawer';

export const Layout = (props) => {
    const {
        accessAllowed,
        user,
        logs,
        children,
        badgeDot,
        setBadgeDot,
    } = props;
    const history = useHistory();

    const [isShowDrawer, setIsShowDrawer] = useState(false);

    const openDrawerHandler = () => {
        setIsShowDrawer(true);
    };

    const closeDrawerHandler = () => {
        setIsShowDrawer(false);
        setBadgeDot(false);
    };

    const toggleDrawerHandler = () => setIsShowDrawer(!isShowDrawer);

    const viewAllHandler = () => {
        history.push('/notifications');
        toggleDrawerHandler();
    };

    return (
        <Fragment>
            <div className="layout">
                {accessAllowed && (
                    <div className="layout-header">
                        <Header
                            user={user}
                            badgeDot={badgeDot}
                            toggleDrawer={openDrawerHandler}
                        />
                    </div>
                )}

                <div className="layout-content">{children}</div>
            </div>
            <NotificationsDrawer
                visible={isShowDrawer}
                data={logs}
                onCloseDrawer={closeDrawerHandler}
                onViewAll={viewAllHandler}
            />
            {/* <ActionsDrawer
                visible={isShowDrawer}
                data={data.actions}
                toggleDrawer={toggleDrawerHandler}
            /> */}
        </Fragment>
    );
};

export default Layout;
