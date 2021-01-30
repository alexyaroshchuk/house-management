import React from 'react';
import { get } from 'lodash';
import { goBack } from '@Utils/helpers';

import './MainSellerHeader.scss';
import PageHeader from '@Components/PageHeader/PageHeader';
import SellerInfoDescriptions from './SellerInfoDescriptions';
import ButtonsBar from '../../../../Components/MainSettingsButtonsBar/ContractSettings';

export const MainSellerHeader = (props) => {
    const { contract, onOk } = props;
    const { seller, number } = contract;

    const getExtraBlock = () => {
        return (
            <ButtonsBar
                contract={contract}
                key="seller-buttons-bar"
                onOk={onOk}
            />
        );
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
        </PageHeader>
    );
};

export default MainSellerHeader;
