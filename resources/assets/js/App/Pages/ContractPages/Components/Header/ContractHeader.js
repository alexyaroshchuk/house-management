import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import { goBack } from '@Utils/helpers';

import PageHeader from '@Components/PageHeader/PageHeader';

import ButtonsBar from '@/App/Components/SettingsButtonsBar/ContractSettings';
import InfoDescriptions from './InfoDescriptions';
import SummaryDescriptions from './SummaryDescriptions';

import './ContractHeader.scss';

export const ContractHeader = (props) => {
    const { contract, currentRole } = props;
    const { buyer } = contract;

    const getExtraBlock = () => {
        return <ButtonsBar key="buyer-buttons-bar" />;
    };

    const getTitle = () => {
        return `${buyer.name} (${contract.number})`;
    };

    return (
        <PageHeader
            title={getTitle()}
            onBack={goBack}
            extra={[getExtraBlock()]}
        >
            <div className="left">
                <InfoDescriptions contract={contract} />
            </div>
            <div className="right">
                <SummaryDescriptions
                    contract={contract}
                    currentRole={currentRole}
                />
            </div>
        </PageHeader>
    );
};
