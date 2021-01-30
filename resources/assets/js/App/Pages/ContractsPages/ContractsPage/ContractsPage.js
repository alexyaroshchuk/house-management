import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ContractsContext } from '@Context/Contracts';
import { CONTRACTS_TYPE } from '@Context/Contracts/Store/constants';
import { ContractContext } from '@Context/Contract';
import { useUserRole } from '@Context/Auth/Hooks/useUserRole';

import ContractsHeader from '../Components/ContractsHeader/ContractsHeader';
import ContractsContent from '../Components/ContractsContent/ContractsContent';
import { isSalesRole } from '@Utils/rolesHelper';
import { useQueryString, CONTRACTS_STATUS_TABS } from '@Utils/queryString';

import './ContractsPage.scss';

const ContractsPage = () => {
    const userRole = useUserRole();
    const { params } = useParams();

    const isSalesManager = isSalesRole(userRole);
    const [currentTab, setCurrentTab] = useState(
        CONTRACTS_STATUS_TABS[0].value
    );

    const [value, onSetValue] = useQueryString('currentTab');

    useEffect(() => {
        const abortController = new AbortController();

        onSetValue(value);
        setCurrentTab(value);

        return function cleanup() {
            abortController.abort();
        };
    }, []);

    const handleTabChange = (e) => {
        const { value } = e.target;
        setCurrentTab(value);
        onSetValue(value);
    };

    const getContractType = () => {
        return isSalesManager ? CONTRACTS_TYPE.SELLER : CONTRACTS_TYPE.BUYER;
    };

    return (
        <div className="contracts-page page">
            <ContractsHeader
                currentRole={userRole}
                tabs={CONTRACTS_STATUS_TABS}
                currentTab={currentTab}
                handleTabChange={handleTabChange}
            />

            <ContractContext>
                <ContractsContent
                    currentRole={userRole}
                    currentTab={currentTab}
                    contractType={getContractType()}
                />
            </ContractContext>
        </div>
    );
};

const ContractsPageWithContext = () => () => {
    return (
        <ContractsContext>
            <ContractsPage />
        </ContractsContext>
    );
};

export default ContractsPageWithContext();
