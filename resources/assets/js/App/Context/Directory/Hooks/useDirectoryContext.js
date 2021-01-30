import { useContext } from 'react';
import { directoryStore } from '../DirectoryContext';

export const useDirectoryContext = () => useContext(directoryStore);

export default useDirectoryContext;
