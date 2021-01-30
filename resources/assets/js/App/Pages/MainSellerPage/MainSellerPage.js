import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';

import './MainSellerPage.scss';
import Loader from '@Components/Loader/Loader';
import MainSellerHeader from './Components/MainSellerHeader/MainSellerHeader';
import MainSellerDashlets from './Components/MainSellerDashlets/MainSellerDashlets';
import MainSellerContent from './Components/MainSellerContent/MainSellerContent';

import { ContractContext } from '@Context/Contract';
import { SellerContext } from '@Context/Seller';

import { useGetMainSellerContract } from '@Context/Seller/Hooks/useGetMainSellerContract';

const MainSellerPage = (props) => {
    const { id } = useParams();

    const {
        mainSellerContract,
        isLoading,
        getMainSellerContract,
    } = useGetMainSellerContract();

    useEffect(() => {
        getMainSellerContract(id);
    }, []);

    const okHandler = () => {
        getMainSellerContract(id);
    };

    const renderContractContent = () => {
        return (
            <>
                <MainSellerHeader
                    contract={mainSellerContract}
                    onOk={okHandler}
                />
                <MainSellerDashlets contract={mainSellerContract} />
                <MainSellerContent contract={mainSellerContract} />
            </>
        );
    };

    const renderLoader = () => {
        return <Loader size="large" fullscreen style="white" />;
    };

    const isLoaderShow = isLoading || isEmpty(mainSellerContract);

    return (
        <div className="main-seller-page">
            {isLoaderShow ? renderLoader() : renderContractContent()}
        </div>
    );
};

const MainContractPageWithContext = () => () => {
    return (
        <ContractContext>
            <SellerContext>
                <MainSellerPage />
            </SellerContext>
        </ContractContext>
    );
};

export default MainContractPageWithContext();
