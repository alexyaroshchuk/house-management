import React from 'react';

import {
    formatDate,
    formatCurrency,
    formatWeightMTS,
} from '@Utils/formatHelpers';
import { checkIsContractFinished } from '@Utils/helpers';

import Card from '@Components/Card/Card';
import Table from '@Components/Table/Table';
import Button from '@Components/Button/Button';
import Containers from './Containers';
import Planned from '../Planned/Planned';
import './ContractContent.scss';

export const SellerContractContent = (props) => {
    const { contract } = props;
    const { shipments, planned } = contract;

    const isFinishedContract = checkIsContractFinished(contract);

    return (
        <div className="contract-page-content">
            <Planned data={planned} isFinishedContract={isFinishedContract} />
            <Containers data={shipments} />
        </div>
    );
};

export default SellerContractContent;
