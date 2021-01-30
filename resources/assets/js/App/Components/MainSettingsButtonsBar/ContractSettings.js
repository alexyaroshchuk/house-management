import React from 'react';

import ButtonsBar from './ButtonsBar/ButtonsBar';

export const ContractSettings = (props) => {
    const { contract, onOk } = props;

    return <ButtonsBar contract={contract} onOk={onOk} />;
};

export default ContractSettings;
