import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { get, isEmpty } from 'lodash';

import { useCheckAuth } from '@Context/Auth/Hooks/useCheckAuth';
import { ContractContext } from '@Context/Contract';
import useGetContract from '@Context/Contract/Hooks/useGetContract';
import useNotesActions from '@Context/Contract/Hooks/useNotesActions';
import { CONTRACT_TYPE } from '@Context/Contract/Store/constants';

import Loader from '@Components/Loader/Loader';

import { ContractHeader } from '../Components/Header/ContractHeader';
import { ContractDashlets } from '../Components/Dashlets/ContractDashlets';
import { ContractContent } from '../Components/Content/ContractContent';

import './ContractPage.scss';

const ContractPage = () => {
    const { id } = useParams();
    const [user] = useCheckAuth();
    const userRole = get(user, 'role', '');
    const { contract, contractLoader, getContract } = useGetContract();

    useEffect(() => {
        getContract(CONTRACT_TYPE.BUYER, id);
    }, [id]);

    const renderContractContent = () => {
        return (
            <>
                <ContractHeader currentRole={userRole} contract={contract} />
                <ContractDashlets contract={contract} />
                <ContractContent currentRole={userRole} contract={contract} />
            </>
        );
    };

    const renderLoader = () => {
        return <Loader size="large" fullscreen style="white" />;
    };

    const isLoaderShow = contractLoader || isEmpty(contract);

    return (
        <div className="contract-page page">
            {isLoaderShow || isEmpty(contract)
                ? renderLoader()
                : renderContractContent()}
        </div>
    );
};

const ContractPageWithContext = () => () => {
    return (
        <ContractContext>
            <ContractPage />
        </ContractContext>
    );
};

export default ContractPageWithContext();
