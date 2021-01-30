import React, { useState } from 'react';

import { isAdminRole } from '@Utils/rolesHelper';
import { v4 as uuidv4 } from 'uuid';

import useGetQueryParams from '@Context/Contracts/Hooks/useGetQueryParams';
import PageHeader from '@Components/PageHeader/PageHeader';
import RadioGroup from '@Components/RadioGroup/RadioGroup';

export const ContractsHeader = (props) => {
    const { resetQueryParams } = useGetQueryParams();
    const { tabs, currentTab, handleTabChange, currentRole } = props;
    const isAdmin = isAdminRole(currentRole);

    const onTabChange = (ev) => {
        resetQueryParams();
        handleTabChange(ev);
    };

    const getTitle = () => (isAdmin ? 'Active contracts' : 'Contracts');

    const renderRadioGroup = () => (
        <RadioGroup
            key={uuidv4()}
            group={tabs}
            defaultGroupValue={currentTab}
            onChange={onTabChange}
        />
    );

    return (
        <PageHeader
            title={getTitle()}
            onBack={false}
            extra={[renderRadioGroup()]}
        />
    );
};

export default ContractsHeader;
