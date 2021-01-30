import React, { Fragment } from 'react';

import './ActionsDrawer.scss';
import Drawer from '@Components/Drawer/Drawer';
import Button from '@Components/Button/Button';
import Timeline from '@Components/Timeline/Timeline';
import Empty from '@Components/Empty/Empty';

const renderBody = (action) => {
    const { type, name, contractNumber, createdAt } = action;

    return (
        <Fragment>
            <p className="action">
                {name} {type} {contractNumber}
            </p>
            <p className="date">{createdAt}</p>
        </Fragment>
    );
};

const renderDrawerTemplate = (actions) => {
    if (actions.length) {
        const items = actions.map((action) => {
            const { key } = action;

            return {
                key,
                render: () => renderBody(action),
            };
        });

        console.log(items);

        return <Timeline items={items} />;
    }

    return <Empty description="No data available" />;
};

const ActionsDrawer = (props) => {
    const { visible, data, toggleDrawer } = props;

    const renderDrawerFooter = () => <Button type="primary">View all</Button>;

    return (
        <Drawer
            title="Actions Log"
            visible={visible}
            placement="right"
            width={290}
            className="actions-drawer"
            onClose={toggleDrawer}
            footer={data.length ? renderDrawerFooter() : null}
        >
            {renderDrawerTemplate(data)}
        </Drawer>
    );
};

export default ActionsDrawer;
