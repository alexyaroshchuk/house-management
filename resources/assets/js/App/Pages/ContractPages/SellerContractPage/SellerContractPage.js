import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { isEmpty } from 'lodash';

import { CONTRACTS_TYPE } from '@Context/Contracts/Store/constants';
import { ContractContext } from '@Context/Contract';
import useGetContract from '@Context/Contract/Hooks/useGetContract';
import Loader from '@Components/Loader/Loader';

import SellerContractHeader from '../Components/Header/SellerContractHeader';
import SellerContractInfoPanel from '../Components/InfoPanel/SellerContractInfoPanel';
import SellerContractDashlets from '../Components/Dashlets/SellerContractDashlets';
import SellerContractContent from '../Components/Content/SellerContractContent';

import './SellerContractPage.scss';

const SellerContractPage = () => {
    const { contract, isLoading, getContract } = useGetContract();
    const { id } = useParams();

    useEffect(() => {
        getContract(CONTRACTS_TYPE.SELLER, id);
    }, [id]);

    const renderContractContent = () => {
        return (
            <>
                <SellerContractHeader contract={contract} />
                {/* <SellerContractInfoPanel contract={contract} /> */}
                <SellerContractDashlets contract={contract} />
                <SellerContractContent contract={contract} />
            </>
        );
    };

    const renderLoader = () => {
        return <Loader size="large" fullscreen style="white" />;
    };

    const isLoaderShow = isLoading || isEmpty(contract);

    return (
        <div className="contract-page page sales-manager-contract">
            {isLoaderShow ? renderLoader() : renderContractContent()}
        </div>
    );
};

const SellerContractPageWithContext = () => () => {
    return (
        <ContractContext>
            <SellerContractPage />
        </ContractContext>
    );
};

export default SellerContractPageWithContext();
