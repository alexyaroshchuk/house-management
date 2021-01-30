import React from 'react';

import ButtonsBar from './ButtonsBar/ButtonsBar';
import { CONTRACT_TYPE } from '@Context/Contract/Store/constants';

export const ContractSettings = () => {
    return <ButtonsBar contractType={CONTRACT_TYPE.BUYER} />;
};

export default ContractSettings;
