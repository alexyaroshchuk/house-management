import React, { Fragment, useEffect } from 'react';

import { isAdminRole } from '@Utils/rolesHelper';
import { checkIsContractFinished } from '@Utils/helpers';

import useGetBanks from '@Context/Contract/Hooks/useGetBanks';

import { Shipments } from '../Shipments/Shipments';
import { Expenses } from '../Expenses/Expenses';
import { Notes } from '../Notes/Notes';
import ManagementTable from '../ManagementTable/ManagementTable';

import './ContractContent.scss';

export const ContractContent = (props) => {
    const { currentRole, contract } = props;
    const { shipments, expenses, notes } = contract;

    const isFinishedContract = checkIsContractFinished(contract);

    const { banks, getBanks } = useGetBanks();

    const isAdmin = isAdminRole(currentRole);

    useEffect(() => {
        getBanks();
    }, []);

    const renderExpensesSection = () => {
        return (
            <Expenses
                currentRole={currentRole}
                expenses={expenses}
                shipments={shipments}
                isFinishedContract={isFinishedContract}
                banks={banks}
            />
        );
    };

    const renderShipmentsSection = () => {
        return (
            <Shipments
                currentRole={currentRole}
                shipments={shipments}
                isFinishedContract={isFinishedContract}
                banks={banks}
            />
        );
    };

    const renderNotesSection = () => {
        return <Notes notes={notes} isFinishedContract={isFinishedContract} />;
    };

    const renderContractInfo = () => {
        return (
            <Fragment>
                {renderShipmentsSection()}
                {renderExpensesSection()}
                {renderNotesSection()}
            </Fragment>
        );
    };

    return (
        <div className="contract-page-content">
            {isAdmin ? (
                <>
                    <ManagementTable />
                    {renderContractInfo()}
                </>
            ) : (
                renderContractInfo()
            )}
        </div>
    );
};
