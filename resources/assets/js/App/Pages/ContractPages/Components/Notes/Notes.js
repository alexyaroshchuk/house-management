import React, { useState } from 'react';
import { Empty } from 'antd';
import { isEmpty, get } from 'lodash';
import { PlusOutlined } from '@ant-design/icons';
import { DeleteTwoTone } from '@ant-design/icons';

import { MODALS } from '../../constants';
import { CONTRACT_TYPE } from '@Context/Contract/Store/constants';
import useNotesActions from '@Context/Contract/Hooks/useNotesActions';
import useGetContract from '@Context/Contract/Hooks/useGetContract';

import Card from '@Components/Card/Card';
import Button from '@Components/Button/Button';
import List from '@Components/List/List';
import Dropdown from '@Components/Dropdown/Dropdown';

import AddNoteModal from './AddNoteModal/AddNoteModal';
import EditNoteModal from './EditNoteModal/EditNoteModal';
import DeleteNoteModal from './DeleteNoteModal/DeleteNoteModal';

import './Notes.scss';

export const Notes = (props) => {
    const { isFinishedContract } = props;
    const {
        isModalLoading,
        isSuccess,
        setIsSuccess,
        addNote,
        editNote,
        deleteNote,
    } = useNotesActions();

    const { contract, isNotesLoading, getContractNotes } = useGetContract();

    const [isShowModal, setIsShowModal] = useState(false);
    const [currentModal, setCurrentModal] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null);

    const openModal = (modal) => {
        setCurrentModal(modal);
        setIsShowModal(true);
    };

    const closeModal = () => {
        setCurrentModal(null);
        setIsShowModal(false);
        setIsSuccess(false);
    };

    const okHandler = () => {
        getContractNotes(CONTRACT_TYPE.BUYER, contract.id);
        closeModal();
    };

    const renderCardExtraTemplate = () => {
        return (
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => openModal(MODALS.ADD_NOTE)}
            >
                Add
            </Button>
        );
    };

    // const selectedDropdownValue = (value, note) => {
    //     openModal(MODALS.DELETE_NOTE);
    //     setSelectedNote(note);
    // };

    const deleteRowHandler = (note) => {
        openModal(MODALS.DELETE_NOTE);
        setSelectedNote(note);
    };

    const editRowHandler = (note) => {
        openModal(MODALS.EDIT_NOTE);
        setSelectedNote(note);
    };

    const renderListItemExtra = (note) => {
        return (
            <div className="actions">
                <Button type="link" onClick={() => editRowHandler(note)}>
                    Edit
                </Button>

                <Button type="link" onClick={() => deleteRowHandler(note)}>
                    Delete
                </Button>
            </div>
        );
    };

    const renderListItemTemplate = (result) => {
        const { key, description } = result;

        return {
            key,
            avatar: null,
            title: null,
            description: description,
            extra: !isFinishedContract ? renderListItemExtra(result) : null,
        };
    };

    const addNoteHandler = (values) => {
        const payload = {
            text: values.text,
            contract_id: contract.id,
        };
        addNote(payload);
    };

    const editNoteHandler = (values) => {
        const payload = {
            text: values.text,
            contract_id: contract.id,
        };
        const noteId = get(selectedNote, 'id', '');
        editNote(noteId, payload);
    };

    const deleteNoteHandler = () => {
        const noteId = get(selectedNote, 'id', 'dd');
        deleteNote(noteId);
    };

    const renderAddNoteModal = () => {
        return (
            <AddNoteModal
                isShowModal={isShowModal && currentModal === MODALS.ADD_NOTE}
                modalLoader={isModalLoading}
                success={isSuccess}
                closeModal={closeModal}
                onFinish={addNoteHandler}
                onOk={okHandler}
                className="add-note-modal note-modal"
            />
        );
    };

    const renderEditNoteModal = () => {
        return (
            <EditNoteModal
                isShowModal={isShowModal && currentModal === MODALS.EDIT_NOTE}
                modalLoader={isModalLoading}
                success={isSuccess}
                closeModal={closeModal}
                onFinish={editNoteHandler}
                onOk={okHandler}
                selectedNote={selectedNote}
                className="edit-note-modal note-modal"
            />
        );
    };

    const renderDeleteNoteModal = () => {
        return (
            <DeleteNoteModal
                isShowModal={isShowModal && currentModal === MODALS.DELETE_NOTE}
                modalLoader={isModalLoading}
                success={isSuccess}
                closeModal={closeModal}
                onFinish={deleteNoteHandler}
                onOk={okHandler}
                selectedNote={selectedNote}
            />
        );
    };

    const getNotes = () => {
        return contract.notes.map((item) => {
            return {
                ...item,
                description: item.text,
            };
        });
    };

    const renderNotesSection = () => {
        return (
            <List
                itemLayout="vertical"
                dataSource={getNotes()}
                renderItem={renderListItemTemplate}
                pagination={false}
                loading={isNotesLoading}
            />
        );
    };

    return (
        <div className="notes">
            <Card
                title="Notes"
                extra={!isFinishedContract ? renderCardExtraTemplate() : null}
            >
                {renderNotesSection()}
            </Card>

            {renderAddNoteModal()}
            {renderEditNoteModal()}
            {renderDeleteNoteModal()}
        </div>
    );
};
