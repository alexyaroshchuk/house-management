import React from 'react';

import { get } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { goBack } from '@Utils/helpers';

import PageHeader from '@Components/PageHeader/PageHeader';
import ButtonsBar from '@/App/Components/SettingsButtonsBar/BuyerButtonsBar';
import InfoDescriptions from './InfoDescriptions';
import SummaryDescriptions from './SummaryDescriptions';

import './BuyerHeader.scss';

export const BuyerHeader = (props) => {
    const { buyer } = props;

    const getTitle = () => {
        return `${get(buyer, 'name', '')}`;
    };

    return (
        <PageHeader title={getTitle()} onBack={goBack}>
            <div className="left">
                <InfoDescriptions buyer={buyer} />
            </div>
            <div className="right">
                <SummaryDescriptions buyer={buyer} />
            </div>
        </PageHeader>
    );
};

export default BuyerHeader;
