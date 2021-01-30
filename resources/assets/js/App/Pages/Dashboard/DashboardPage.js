import React, { useEffect } from 'react';

import Loader from '@Components/Loader/Loader';

import MainInfo from './Components/MainInfo/MainInfo';
import Charts from './Components/Charts/Charts';
import Debts from './Components/Debts/Debts';
import Payments from './Components/Payments/Payments';
import CreditLinesManagement from './Components/CreditLinesManagement/CreditLinesManagement';

import './DashboardPage.scss';

import { DashboardContext } from '@Context/Dashboard';
import { ContractContext } from '@Context/Contract';
import useGetDashboard from '@Context/Dashboard/Hooks/useGetDashboard';
import useGetPayments from '@Context/Dashboard/Hooks/useGetPayments';
import useGetCredits from '@Context/Dashboard/Hooks/useGetCredits';

const DashboardPage = () => {
    const { dashboard, isLoading, getDashboard } = useGetDashboard();
    const {
        payments,
        params,
        paginationLoader,
        getPayments,
    } = useGetPayments();
    const { credits, getCredits } = useGetCredits();

    const { data, additional_data, banks_chart, shipments_chart } = dashboard;

    useEffect(() => {
        getDashboard();
        getPayments(params);
        getCredits();
    }, []);

    const okHandler = () => {
        getCredits();
        getDashboard();
    };

    const changePaginationHandler = (page, pageSize) => {
        const paymentsParams = {
            pagination: {
                page,
                pageSize,
                total: params.total,
            },
        };
        getPayments(paymentsParams);
    };

    const renderLoader = () => {
        return <Loader size="large" fullscreen style="white" />;
    };

    const renderMainInfo = () => {
        return <MainInfo data={data} />;
    };

    const renderCharts = () => {
        return <Charts finance={banks_chart} shipments={shipments_chart} />;
    };

    const renderDebts = () => {
        return <Debts data={additional_data} />;
    };

    const renderMoneyManagement = () => {
        return (
            <Payments
                payments={payments}
                params={params}
                paginationLoader={paginationLoader}
                onChange={changePaginationHandler}
            />
        );
    };

    const renderCreditLinesManagement = () => {
        return <CreditLinesManagement credits={credits} onOk={okHandler} />;
    };

    const renderDashboardContent = () => {
        return (
            <>
                {renderMainInfo()}
                {renderCharts()}
                {renderDebts()}
                {renderMoneyManagement()}
                {renderCreditLinesManagement()}
            </>
        );
    };

    return (
        <div className="dashboard-page page">
            {isLoading ? renderLoader() : renderDashboardContent()}
        </div>
    );
};

const DashboardPageWithContext = () => () => {
    return (
        <DashboardContext>
            <ContractContext>
                <DashboardPage />
            </ContractContext>
        </DashboardContext>
    );
};

export default DashboardPageWithContext();
