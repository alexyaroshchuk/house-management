import React, { Fragment, useEffect, useState } from 'react';
import { LockOutlined, DeleteTwoTone } from '@ant-design/icons';

import './RoleSettingsContent.scss';
import Card from '@Components/Card/Card';
import Table from '@Components/Table/Table';
import useGetUsers from '@Context/Users/Hooks/useGetUsers';
import useUserActions from '@Context/Users/Hooks/useUserActions';
import Loader from '@Components/Loader/Loader';
import Button from '@Components/Button/Button';
import Dropdown from '@Components/Dropdown/Dropdown';
import { ROLES, ROLES_TEXT } from '@Utils/rolesHelper';
import CreateUserModal from '../CreateUserModal/CreateUserModal';
import ChangeUserPasswordModal from '../ChangeUserPasswordModal/ChangeUserPasswordModal';
import DeleteUserModal from '../DeleteUserModal/DeleteUserModal';
import EditUserModal from '../EditUserModal/EditUserModal';
import { MODALS } from '../../constants';
import './RoleSettingsContent.scss';

const RoleSettingsContent = (props) => {
    const [users, usersLoader, getUsers] = useGetUsers();

    const [
        modalLoader,
        success,
        editUserRequest,
        deleteUserRequest,
        addUserRequest,
        setSuccess,
    ] = useUserActions();

    const [isShowModal, setIsShowModal] = useState(false);
    const [currentModal, setCurrentModal] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [errors, setErrors] = useState(null);

    const dropdownChangePassword = 'Change password';
    const dropdownDelete = 'Delete';

    const options = [
        { id: 1, value: ROLES.ADMIN, text: ROLES_TEXT[ROLES.ADMIN] },
        { id: 2, value: ROLES.LOGISTIC, text: ROLES_TEXT[ROLES.LOGISTIC] },
        { id: 3, value: ROLES.SALES, text: ROLES_TEXT[ROLES.SALES] },
        { id: 4, value: ROLES.ACCOUNTANT, text: ROLES_TEXT[ROLES.ACCOUNTANT] },
    ];

    const renderRoleColumn = (text) => {
        return ROLES_TEXT[text];
    };

    const selectedDropdownValue = (value, user) => {
        const changeUserPasswordValue = '0';
        const deleteUserValue = '1';

        if (value === changeUserPasswordValue) {
            openModal(MODALS.CHANGE_PASSWORD);
        } else if (value === deleteUserValue) {
            openModal(MODALS.DELETE_USER);
        }

        setSelectedUser(user);
    };

    const renderDropdown = (user) => {
        const menuItems = [
            {
                action: dropdownChangePassword,
                className: 'change-password',
                icon: <LockOutlined />,
            },
            {
                action: dropdownDelete,
                className: 'delete',
                icon: <DeleteTwoTone twoToneColor="#F86F76" />,
            },
        ];

        return (
            <Dropdown
                title="More"
                menuItems={menuItems}
                onClick={(e) => {
                    const { key } = e;
                    selectedDropdownValue(key, user);
                }}
                overlayClassName="role-settings-dropdown"
            />
        );
    };

    const editRowHandler = (user) => {
        openModal(MODALS.EDIT_USER);
        setSelectedUser(user);
    };

    const renderEditButton = (user) => {
        return (
            <Button type="link" onClick={() => editRowHandler(user)}>
                Edit
            </Button>
        );
    };

    const renderActions = (text, user) => {
        return (
            <div className="actions-wrapper">
                <Fragment>
                    {renderEditButton(user)}
                    {renderDropdown(user)}
                </Fragment>
            </div>
        );
    };

    const columns = [
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
            type: 'email',
            editable: true,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            type: 'select',
            editable: true,
            render: renderRoleColumn,
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            className: 'column-actions',
            render: renderActions,
        },
    ];

    useEffect(() => {
        getUsers();
    }, []);

    const openModal = (modal) => {
        setSuccess();
        setCurrentModal(modal);
        setIsShowModal(true);
    };

    const closeModal = () => {
        setCurrentModal(null);
        setIsShowModal(false);
        setErrors(null);
        setSelectedUser(null);
    };

    const renderCardExtra = () => {
        return (
            <Button
                type="primary"
                onClick={() => openModal(MODALS.CREATE_USER)}
            >
                Create user
            </Button>
        );
    };

    const errorHandler = (errors, user) => {
        setErrors(errors);
        setSelectedUser(user);
    };

    const addUserHandler = (values) => {
        addUserRequest(values, errorHandler);
    };

    const changeUserPasswordHandler = (values) => {
        const newData = {
            ...selectedUser,
            password: values.password,
        };

        editUserRequest(newData);
        setSelectedUser(null);
    };

    const deleteUserHandler = () => {
        deleteUserRequest(selectedUser.id);
    };

    const editUserHandler = (values) => {
        const newData = {
            ...selectedUser,
            ...values,
        };

        editUserRequest(newData, errorHandler);
    };

    const okHandler = () => {
        closeModal();
        getUsers();
    };

    const renderCreateUserModal = () => {
        return (
            <CreateUserModal
                options={options}
                isShowModal={isShowModal && currentModal === MODALS.CREATE_USER}
                modalLoader={modalLoader}
                success={success}
                closeModal={closeModal}
                onFinish={addUserHandler}
                onOk={okHandler}
                selectedUser={selectedUser}
                errors={errors}
            />
        );
    };

    const renderChangeUserPasswordModal = () => {
        return (
            <ChangeUserPasswordModal
                isShowModal={
                    isShowModal && currentModal === MODALS.CHANGE_PASSWORD
                }
                modalLoader={modalLoader}
                success={success}
                closeModal={closeModal}
                onFinish={changeUserPasswordHandler}
                onOk={okHandler}
            />
        );
    };

    const renderDeleteUserModal = () => {
        return (
            <DeleteUserModal
                isShowModal={isShowModal && currentModal === MODALS.DELETE_USER}
                modalLoader={modalLoader}
                success={success}
                closeModal={closeModal}
                onFinish={deleteUserHandler}
                onOk={okHandler}
            />
        );
    };

    const renderEditUserModal = () => {
        return (
            <EditUserModal
                isShowModal={isShowModal && currentModal === MODALS.EDIT_USER}
                modalLoader={modalLoader}
                success={success}
                closeModal={closeModal}
                onFinish={editUserHandler}
                onOk={okHandler}
                options={options}
                selectedUser={selectedUser}
                errors={errors}
            />
        );
    };

    return (
        <div className="role-settings page-content">
            <Card title="Role Settings" extra={renderCardExtra()}>
                <Table
                    pagination={false}
                    data={users}
                    columns={columns}
                    options={options}
                    loading={usersLoader}
                />
            </Card>

            {renderCreateUserModal()}
            {renderChangeUserPasswordModal()}
            {renderDeleteUserModal()}
            {renderEditUserModal()}
        </div>
    );
};

export default RoleSettingsContent;
