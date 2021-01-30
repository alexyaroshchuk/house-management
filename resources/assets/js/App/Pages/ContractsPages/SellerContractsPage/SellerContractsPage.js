import React, { useState, useEffect } from 'react';

import { ContractsContext } from '@Context/Contracts';
import { CONTRACTS_TYPE } from '@Context/Contracts/Store/constants';
import { useUserRole } from '@Context/Auth/Hooks/useUserRole';
import { ContractContext } from '@Context/Contract';

import ContractsHeader from '../Components/ContractsHeader/ContractsHeader';
import ContractsContent from '../Components/ContractsContent/ContractsContent';

import { useQueryString, CONTRACTS_STATUS_TABS } from '@Utils/queryString';

const SellerContractsPage = () => {
    const userRole = useUserRole();
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
        return CONTRACTS_TYPE.SELLER;
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

const SellerContractsPageWithContext = () => () => {
    return (
        <ContractsContext>
            <SellerContractsPage />
        </ContractsContext>
    );
};

export default SellerContractsPageWithContext();
