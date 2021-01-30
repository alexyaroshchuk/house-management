import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import { get } from 'lodash';
import { goBack } from '@Utils/helpers';

import PageHeader from '@Components/PageHeader/PageHeader';
import SellerInfoDescriptions from './SellerInfoDescriptions';
import SellerSummaryDescriptions from './SellerSummaryDescriptions';
import ButtonsBar from '../../../../Components/SettingsButtonsBar/SellerContractSettings';

import './ContractHeader.scss';

export const SellerContractHeader = (props) => {
    const { contract } = props;
    const { seller, number } = contract;

    const getExtraBlock = () => {
        return <ButtonsBar key="seller-buttons-bar" />;
    };

    const getTitle = () => {
        return `${get(seller, 'name', '')} (${number})`;
    };

    return (
        <PageHeader
            title={getTitle()}
            onBack={goBack}
            extra={[getExtraBlock()]}
            className="seller-contract-header"
        >
            <div className="left">
                <SellerInfoDescriptions contract={contract} />
            </div>
            <div className="right">
                <SellerSummaryDescriptions contract={contract} />
            </div>
        </PageHeader>
    );
};

export default SellerContractHeader;
