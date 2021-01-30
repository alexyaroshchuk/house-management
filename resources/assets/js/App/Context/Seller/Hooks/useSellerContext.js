import { useContext } from 'react';
import { sellerStore } from '../SellerContext';

export const useSellerContext = () => useContext(sellerStore);

export default useSellerContext;
