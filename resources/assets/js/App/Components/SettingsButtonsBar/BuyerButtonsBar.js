import React, { Fragment } from 'react';

import { ClockCircleOutlined, EditOutlined } from '@ant-design/icons';
import Button from '@Components/Button/Button';

export const BuyerButtonsBar = () => {
    return (
        <Fragment>
            {/* <Button icon={<ClockCircleOutlined />} type="primary" ghost>
                Log
            </Button> */}
            <Button icon={<EditOutlined />} type="primary">
                Edit
            </Button>
        </Fragment>
    );
};

export default BuyerButtonsBar;
