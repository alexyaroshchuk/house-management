import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircleTwoTone, EditTwoTone } from '@ant-design/icons';
import moment from 'moment';

import './NotificationsDrawer.scss';
import Drawer from '@Components/Drawer/Drawer';
import List from '@Components/List/List';
import Avatar from '@Components/Avatar/Avatar';
import Button from '@Components/Button/Button';
import Empty from '@Components/Empty/Empty';

const NotificationsDrawer = (props) => {
    const { visible, data, onCloseDrawer, onViewAll } = props;

    const renderDrawerFooter = () => {
        return (
            <Fragment>
                <Button type="primary" onClick={onViewAll}>
                    View all
                </Button>
            </Fragment>
        );
    };

    const renderListItemExtra = (created) => (
        <div className="extra-item">{created}</div>
    );

    const renderListItemTemplate = (item) => {
        const {
            action,
            created_at,
            message,
            contract_number,
            table_name,
            item_id,
        } = item;
        const createdAt = moment(created_at).format('DD.MM.YYYY hh:mm');

        return {
            avatar: (
                <Avatar
                    icon={
                        action === 'created' ? (
                            <PlusCircleTwoTone />
                        ) : (
                            <EditTwoTone twoToneColor="#FAAD14" />
                        )
                    }
                />
            ),
            title: message,
            description: (
                <Link to={`/${table_name}/${item_id}`} onClick={onCloseDrawer}>
                    {contract_number}
                </Link>
            ),
            extra: renderListItemExtra(createdAt),
        };
    };

    const renderDrawerTemplate = (notifications) => {
        if (notifications.length) {
            return (
                <List
                    dataSource={notifications}
                    pagination={false}
                    renderItem={renderListItemTemplate}
                />
            );
        }

        return <Empty description="No data available" />;
    };

    const renderDrawer = () => {
        return (
            <Drawer
                title="Notifications"
                visible={visible}
                placement="right"
                width={385}
                className="notifications-drawer"
                onClose={onCloseDrawer}
                footer={data.length ? renderDrawerFooter() : null}
            >
                {renderDrawerTemplate(data)}
            </Drawer>
        );
    };

    return renderDrawer();
};

export default NotificationsDrawer;
