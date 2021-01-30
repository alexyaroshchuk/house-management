import React from 'react';

import './MainSellerContent.scss';
import Contracts from '../Contracts/Contracts';
import Planned from '@Pages/ContractPages/Components/Planned/Planned';
import Containers from '@Pages/ContractPages/Components/Content/Containers';

const MainSellerContent = (props) => {
    const { contract } = props;
    const { seller_contracts } = contract;

    const planned = seller_contracts
        .map((sellerContract) => sellerContract.planned)
        .flat();
    const shipments = seller_contracts
        .map((sellerContract) => sellerContract.shipments)
        .flat();

    return (
        <div className="main-seller-content">
            <Contracts data={seller_contracts} />
            <Planned data={planned} isFinishedContract={true} />
            <Containers data={shipments} />
        </div>
    );
};

export default MainSellerContent;
