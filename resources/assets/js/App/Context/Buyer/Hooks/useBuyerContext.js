import { useContext } from 'react';
import { buyerStore } from '../BuyerContext';

export const useBuyerContext = () => useContext(buyerStore);

export default useBuyerContext;
