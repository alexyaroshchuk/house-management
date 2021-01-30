import {
    SET_DIRECTORY_LOADER,
    SET_DIRECTORY,
    SET_MODAL_LOADER,
    SET_LOGOS,
} from './constants';

export const initialState = {
    directory: [],
    directoryLoader: false,
    modalLoader: false,
    logos: [],
};

const normaliseData = (data) => {
    return data.map((item) =>
        item.title ? { ...item, name: item.title } : item
    );
};

export const reducer = (state, action) => {
    const newState = state ? { ...state } : { ...initialState };

    switch (action.type) {
        case SET_DIRECTORY_LOADER:
            newState.directoryLoader = action.directoryLoader;
            break;
        case SET_DIRECTORY:
            newState.directory = normaliseData(action.directory);
            break;
        case SET_MODAL_LOADER:
            newState.modalLoader = action.modalLoader;
            break;
        case SET_LOGOS:
            newState.logos = action.logos;
            break;
        default:
            break;
    }

    return newState;
};
