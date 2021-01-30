import { useState } from 'react';
import { useContractContext } from './useContractContext';
import { addNote, editNote, deleteNote } from '../Store/queries';
import { setContract } from '../Store/actions';

export const useNotesActions = () => {
    const { dispatch } = useContractContext();

    const [isModalLoading, setIsModalLoading] = useState(false);

    const [isSuccess, setIsSuccess] = useState(false);

    const addNoteRequest = (note, errorCallback = null) => {
        setIsModalLoading(true);
        addNote(note)
            .then((response) => {
                setIsModalLoading(false);
                setIsSuccess(true);
            })
            .catch(() => {
                setIsModalLoading(true);
                setIsSuccess(false);
            });
    };

    const editNoteRequest = (id, note, errorCallback = null) => {
        setIsModalLoading(true);
        editNote(id, note)
            .then((response) => {
                setIsModalLoading(false);
                setIsSuccess(true);
            })
            .catch(() => {
                setIsModalLoading(true);
                setIsSuccess(false);
            });
    };

    const deleteNoteRequest = (id) => {
        setIsModalLoading(true);
        deleteNote(id)
            .then((response) => {
                setIsModalLoading(false);
                setIsSuccess(true);
            })
            .catch(() => {
                setIsModalLoading(true);
                setIsSuccess(false);
            });
    };

    return {
        isModalLoading,
        isSuccess,
        setIsSuccess,
        addNote: addNoteRequest,
        editNote: editNoteRequest,
        deleteNote: deleteNoteRequest,
    };
};

export default useNotesActions;
