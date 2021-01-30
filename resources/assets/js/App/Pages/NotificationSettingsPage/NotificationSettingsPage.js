import React, { useState } from 'react';

import './NotificationSettingsPage.scss';
import Switch from '@Components/Switch/Switch';
import Table from '@Components/Table/Table';
import AddNewRow from '@Components/AddNewRow/AddNewRow';
import Input from '@Components/Input/Input';
import { mockSettings, mockTableData } from './mockData';

const renderInput = () => <Input type="text" />;

export const NotificationSettingsPage = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [settings, setSettings] = useState(mockSettings);
    const [tableData, setTableData] = useState(mockTableData);

    const renderSwitch = (checked, obj) => {
        return (
            <Switch
                checked={checked}
                onChange={(value) => {
                    const result = tableData.map((item) =>
                        item.key === obj.key
                            ? { ...item, checked: value }
                            : item
                    );
                    setTableData(result);
                }}
            />
        );
    };

    const columns = [
        {
            title: 'Notification type',
            dataIndex: 'notificationType',
            key: 'notificationType',
        },
        { title: 'Channel type', dataIndex: 'channelType', key: 'channelType' },
        { title: 'Channel data', dataIndex: 'channelData', key: 'channelData' },
        {
            title: 'On/Off',
            dataIndex: 'checked',
            key: 'checked',
            render: (checked, obj) => renderSwitch(checked, obj),
        },
    ];

    const renderAddNewRowSwitch = () => (
        <Switch checked={isChecked} onChange={(value) => setIsChecked(value)} />
    );

    const elements = [
        {
            name: 'notificationType',
            rules: [
                {
                    required: true,
                    message: 'Please input Notification Type',
                },
            ],
            render: renderInput,
        },
        {
            name: 'channelType',
            rules: [
                {
                    required: true,
                    message: 'Please input Channel Type',
                },
            ],
            render: renderInput,
        },
        {
            name: 'channelData',
            rules: [
                {
                    required: true,
                    message: 'Please input Channel Data',
                },
            ],
            render: renderInput,
        },
        {
            name: 'checked',
            render: renderAddNewRowSwitch,
        },
    ];

    const changeHandler = (val, key) => {
        const result = settings.map((setting) =>
            setting.key === key ? { ...setting, checked: val } : setting
        );
        setSettings(result);
    };

    const addNewRowHandler = (values) => {
        const { notificationType, channelType, channelData, checked } = values;
        setTableData([
            ...tableData,
            {
                key: String(Date.now()),
                notificationType,
                channelType,
                channelData,
                checked,
            },
        ]);
        setIsChecked(false);
    };

    return (
        <div className="notification-settings-page">
            <div className="container">
                <div className="default-settings">
                    <div className="title">Notifications Settings</div>
                    <ul className="settings">
                        {settings.map((setting) => {
                            const {
                                key,
                                title,
                                description,
                                checked,
                            } = setting;

                            return (
                                <li key={key} className="setting">
                                    <div className="wrapper">
                                        <div className="setting-title">
                                            {title}
                                        </div>
                                        <div className="setting-description">
                                            {description}
                                        </div>
                                    </div>
                                    <Switch
                                        checked={checked}
                                        onChange={(val) =>
                                            changeHandler(val, key)
                                        }
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="advanced-settings">
                    <div className="title">Advanced Notifications Settings</div>
                    <Table columns={columns} data={tableData} />
                    <AddNewRow
                        name="add-row-form"
                        elements={elements}
                        layout="inline"
                        onAddnewRow={addNewRowHandler}
                    />
                </div>
            </div>
        </div>
    );
};

export default NotificationSettingsPage;
