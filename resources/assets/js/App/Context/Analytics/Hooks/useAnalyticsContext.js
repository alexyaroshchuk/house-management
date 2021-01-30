import { useContext } from 'react';
import { analyticsStore } from '../AnalyticsContext';

export const useAnalyticsContext = () => useContext(analyticsStore);

export default useAnalyticsContext;
