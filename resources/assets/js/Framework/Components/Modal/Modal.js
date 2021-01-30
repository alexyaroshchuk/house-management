import React from 'react';
import { Modal as ModalAnt } from 'antd';
import propTypes from 'prop-types';

import './Modal.scss';

const Modal = (props) => {
    const { children } = props;

    return (
        <ModalAnt
            closable={false}
            maskClosable={false}
            keyboard={false}
            {...props}
        >
            {children}
        </ModalAnt>
    );
};

Modal.defaultProps = {
    title: '',
    visible: false,
    onOk: () => {},
    onCancel: () => {},
    destroyOnClose: false,
    className: '',
};

Modal.propTypes = {
    title: propTypes.string.isRequired,
    visible: propTypes.bool.isRequired,
    footer: propTypes.oneOfType([propTypes.bool, propTypes.array]),
    onOk: propTypes.func,
    onCancel: propTypes.func,
    destroyOnClose: propTypes.bool,
    className: propTypes.string,
    width: propTypes.number,
};

export default Modal;
