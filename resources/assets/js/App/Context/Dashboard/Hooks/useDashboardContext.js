import { useContext } from 'react';
import { dashboardStore } from '../DashboardContext';

export const useDashboardContext = () => useContext(dashboardStore);

export default useDashboardContext;
