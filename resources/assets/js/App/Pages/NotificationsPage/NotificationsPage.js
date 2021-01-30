import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircleTwoTone, EditTwoTone } from '@ant-design/icons';
import moment from 'moment';

import './NotificationsPage.scss';
import PageHeader from '@Components/PageHeader/PageHeader';
import Input from '@Components/Input/Input';
import Select from '@Components/Select/Select';
import Button from '@Components/Button/Button';
import Dropdown from '@Components/Dropdown/Dropdown';
import Card from '@Components/Card/Card';
import List from '@Components/List/List';
import Avatar from '@Components/Avatar/Avatar';
import Filter from '../../Components/Filter/Filter';

import { LogsContext } from '@Context/Logs';
import { UsersContext } from '@Context/Users';
import { useGetLogs } from '@Context/Logs/Hooks/useGetLogs';
import { useGetUsers } from '@Context/Users/Hooks/useGetUsers';

const renderInput = (placeholder) => {
    return <Input type="text" placeholder={placeholder} />;
};

const renderSelect = (options) => {
    return <Select options={options} />;
};

const renderListItemExtra = (createdAt) => (
    <div className="extra-item">{createdAt}</div>
);

const renderListItemTemplate = (item) => {
    const {
        action,
        created_at,
        message,
        contract_number,
        table_name,
        item_id,
    } = item;
    const createdAt = moment(created_at).format('DD.MM.YYYY hh:mm');

    return {
        avatar: (
            <Avatar
                icon={
                    action === 'created' ? (
                        <PlusCircleTwoTone />
                    ) : (
                        <EditTwoTone twoToneColor="#FAAD14" />
                    )
                }
            />
        ),
        title: message,
        description: (
            <Link to={`/${table_name}/${item_id}`}>{contract_number}</Link>
        ),
        extra: renderListItemExtra(createdAt),
    };
};

const NotificationsPage = (props) => {
    const { logs, logsLoader, getLogs } = useGetLogs();
    const [users, usersLoader, getUsers] = useGetUsers();

    const [filters, setFilters] = useState([]);
    const [sort, setSort] = useState([]);
    const [initialValues, setInitialValues] = useState(null);

    const filtersQuery = 'filters';
    const sortingQuery = 'sorting';
    const sortingQueryString = `${sortingQuery}=[{"key":"created_at","order":1,"direction":"DESC"}]`;

    useEffect(() => {
        getLogs(sortingQueryString);
        getUsers();
    }, []);

    const onFinish = (values) => {
        const result = [];
        let queryString = '';

        if (values.employee) {
            result.push({
                key: 'user_id',
                comparator: '=',
                value: values.employee,
            });
        }

        if (values.buyer) {
            result.push({
                key: 'contract_number',
                comparator: 'ilike',
                value: values.buyer,
            });
        }

        if (values.action) {
            result.push({
                key: 'action',
                comparator: '=',
                value: values.action,
            });
        }

        queryString = `${filtersQuery}=${JSON.stringify(
            result
        )}&${sortingQueryString}`;

        // const filtersQueryString = `${filtersQuery}=${JSON.stringify(result)}`;

        // if (sort.length) {
        //     queryString = `${filtersQueryString}&${sortingQuery}=${JSON.stringify(
        //         sort
        //     )}`;
        // } else {
        //     queryString = filtersQueryString;
        // }

        setInitialValues(values);
        // setFilters(result);
        getLogs(queryString);
    };

    const formConfig = {
        name: 'notifications-form',
        onFinish: onFinish,
        layout: 'inline',
    };

    const usersOptions = users.map((user) => {
        const { id, name } = user;

        return {
            id,
            value: id + '',
            text: name,
        };
    });

    const actionOptions = [
        { id: 1, value: 'created', text: 'Created' },
        { id: 2, value: 'edited', text: 'Edited' },
    ];

    const elements = [
        {
            name: 'employee',
            label: 'Employee: ',
            render: () => renderSelect(usersOptions),
        },
        {
            name: 'buyer',
            label: 'Search: ',
            render: () => renderInput(),
        },
        {
            name: 'action',
            label: 'Action: ',
            render: () => renderSelect(actionOptions),
        },
    ];

    const clearHandler = () => {
        setInitialValues({
            employee: null,
            buyer: null,
            action: null,
        });
        getLogs(sortingQueryString);
    };

    const renderClearButton = () => {
        return (
            <Button type="default" htmlType="reset" onClick={clearHandler}>
                Clear
            </Button>
        );
    };

    const renderApplyButton = () => {
        return (
            <Button type="primary" htmlType="submit">
                Apply
            </Button>
        );
    };

    const actions = [
        { render: renderClearButton },
        { render: renderApplyButton },
    ];

    // const sortHandler = (key) => {
    //     const { text } = key.domEvent.target;
    //     const sorting = { key: 'created_at', order: 1, direction: text };
    //     const sortingArr = [sorting];
    //     const sortQueryString = `${sortingQuery}=${JSON.stringify(sortingArr)}`;

    //     let queryString = '';

    //     if (filters.length) {
    //         queryString = `${filtersQuery}=${JSON.stringify(
    //             filters
    //         )}&${sortQueryString}`;
    //     } else {
    //         queryString = sortQueryString;
    //     }

    //     setSort(sortingArr);
    //     getLogs(queryString);
    // };

    // const cardExtraTemplate = () => {
    //     const menuItems = [
    //         { key: '1', action: 'ASC' },
    //         { key: '2', action: 'DESC' },
    //     ];

    //     return (
    //         <Dropdown
    //             title="Sort by"
    //             menuItems={menuItems}
    //             onClick={sortHandler}
    //         />
    //     );
    // };

    return (
        <div className="notifications-page">
            <PageHeader title="Actions log" onBack={false} />

            <div className="container">
                <Filter
                    title="Filter by"
                    formConfig={formConfig}
                    elements={elements}
                    actions={actions}
                    initialValues={initialValues}
                />
                <Card
                    title="Results"
                    // extra={cardExtraTemplate()}
                    loading={logsLoader}
                >
                    <List
                        pagination={{
                            pageSize: 10,
                        }}
                        dataSource={logs}
                        renderItem={renderListItemTemplate}
                    />
                </Card>
            </div>
        </div>
    );
};

const NotificationsPageWithContext = () => () => {
    return (
        <LogsContext>
            <UsersContext>
                <NotificationsPage />
            </UsersContext>
        </LogsContext>
    );
};

export default NotificationsPageWithContext();
