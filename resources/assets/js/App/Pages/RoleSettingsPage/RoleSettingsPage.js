import React from 'react';

import { UsersContext } from '@Context/Users';

import './RoleSettingsPage.scss';
import RoleSettingsContent from './Components/RoleSettingsContent/RoleSettingsContent';

export const RoleSettingsPage = (props) => {
    return (
        <UsersContext>
            <div className="role-settings-page">
                <div className="container">
                    <RoleSettingsContent />
                </div>
            </div>
        </UsersContext>
    );
};

export default RoleSettingsPage;
