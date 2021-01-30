import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './SellerPage.scss';
import Loader from '@Components/Loader/Loader';
import SellerHeader from './Components/SellerHeader/SellerHeader';
import SellerContent from './Components/SellerContent/SellerContent';
import { SellerContext } from '@Context/Seller';
import { ContractContext } from '@Context/Contract';
import useGetSeller from '@Context/Seller/Hooks/useGetSeller';

const SellerPage = (props) => {
    const { id } = useParams();
    const { seller, isLoading, getSeller } = useGetSeller();

    useEffect(() => {
        getSeller(id);
    }, []);

    const refreshMainContracts = () => {
        getSeller(id);
    };

    const renderLoader = () => {
        return <Loader size="large" fullscreen style="white fill" />;
    };

    const renderSellerContent = () => {
        return (
            <>
                <SellerHeader seller={seller} />
                <ContractContext>
                    <SellerContent
                        seller={seller}
                        onRefreshMainContracts={refreshMainContracts}
                    />
                </ContractContext>
            </>
        );
    };

    return (
        <div className="seller-page">
            {isLoading ? renderLoader() : renderSellerContent()}
        </div>
    );
};

const ContractPageWithContext = () => () => {
    return (
        <SellerContext>
            <SellerPage />
        </SellerContext>
    );
};

export default ContractPageWithContext();
