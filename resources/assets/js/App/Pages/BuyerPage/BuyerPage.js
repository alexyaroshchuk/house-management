import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { isEmpty } from 'lodash';

import useGetBuyer from '@Context/Buyer/Hooks/useGetBuyer';
import { BuyerContext } from '@Context/Buyer';
import { ContractContext } from '@Context/Contract';

import Loader from '@Components/Loader/Loader';
import BuyerHeader from './Components/Header/BuyerHeader';
import BuyerContent from './Components/Content/BuyerContent';

const BuyerPage = () => {
    const { id } = useParams();
    const { buyer, isLoading, getBuyer } = useGetBuyer();
    useEffect(() => {
        getBuyer(id);
    }, [id]);

    const editHandler = () => {
        getBuyer(id);
    };

    const renderContractContent = () => {
        return (
            <>
                <BuyerHeader buyer={buyer} />
                <ContractContext>
                    <BuyerContent buyer={buyer} onEdit={editHandler} />
                </ContractContext>
            </>
        );
    };

    const renderLoader = () => {
        return <Loader size="large" fullscreen style="white" />;
    };

    const isLoaderShow = isLoading || isEmpty(buyer);

    return (
        <div className="buyer-page page">
            {isLoaderShow ? renderLoader() : renderContractContent()}
        </div>
    );
};

const BuyerPageWithContext = () => () => {
    return (
        <BuyerContext>
            <BuyerPage />
        </BuyerContext>
    );
};

export default BuyerPageWithContext();
