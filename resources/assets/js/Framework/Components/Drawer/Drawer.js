import React from 'react';
import { Drawer as DrawerAnt } from 'antd';
import propTypes from 'prop-types';

import './Drawer.scss';

const Drawer = (props) => {
    const { children, ...args } = props;

    return <DrawerAnt {...args}>{children}</DrawerAnt>;
};

Drawer.defaultProps = {
    title: '',
    placement: '',
    closable: true,
    onClose: () => {},
    visible: false,
    className: '',
};

Drawer.propTypes = {
    title: propTypes.string.isRequired,
    placement: propTypes.string.isRequired,
    closable: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired,
    visible: propTypes.bool.isRequired,
    className: propTypes.string.isRequired,
    width: propTypes.number.isRequired,
};

export default Drawer;
