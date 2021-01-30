import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import { goBack } from '@Utils/helpers';

import ButtonsBar from '@/App/Components/SettingsButtonsBar/BuyerButtonsBar';
import PageHeader from '@Components/PageHeader/PageHeader';

import InfoDescriptions from './InfoDescriptions';
import SummaryDescriptions from './SummaryDescriptions';

import './SellerHeader.scss';

const SellerHeader = (props) => {
    const { seller } = props;

    return (
        <PageHeader
            title={seller.name}
            onBack={goBack}
            className="seller-page-header"
        >
            <div className="left">
                <InfoDescriptions seller={seller} />
            </div>
            {/* <div className="right">
                <SummaryDescriptions seller={seller} />
            </div> */}
        </PageHeader>
    );
};

export default SellerHeader;
