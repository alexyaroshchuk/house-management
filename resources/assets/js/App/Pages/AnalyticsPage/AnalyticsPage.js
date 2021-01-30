import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './AnalyticsPage.scss';
import PageHeader from '@Components/PageHeader/PageHeader';
import RadioGroup from '@Components/RadioGroup/RadioGroup';
import Datepicker from '@Components/Datepicker/Datepicker';
import Loader from '@Components/Loader/Loader';

import { AnalyticsContext } from '@Context/Analytics';
import useGetAnalytics from '@Context/Analytics/Hooks/useGetAnalytics';

import MainInfo from './Components/MainInfo/MainInfo';
import PieCharts from './Components/PieCharts/PieCharts';
import Balance from './Components/Balance/Balance';
import Profit from './Components/Profit/Profit';

const AnalyticsPage = () => {
    const { analytics, params, isLoading, getAnalytics } = useGetAnalytics();
    const {
        data,
        contracts_chart,
        commodities_chart,
        plot_table,
        table_profit,
    } = analytics;

    const [timeGroupValue, setTimeGroupValue] = useState(params.filters.period);
    const [dateRangeValues, setDateRangeValues] = useState([]);

    useEffect(() => {
        getAnalytics(params);
    }, []);

    const renderLoader = () => {
        return <Loader size="large" fullscreen style="white" />;
    };

    const changeDateHandler = (e) => {
        const { value } = e.target;
        const params = {
            filters: {
                period: value,
            },
        };

        getAnalytics(params);
        setTimeGroupValue(value);
        setDateRangeValues([]);
    };

    const changeRangeDateHandler = (dates, dateString) => {
        const params = {
            filters: {
                period: {
                    dateStart: dateString[0],
                    dateEnd: dateString[1],
                },
            },
        };

        getAnalytics(params);
        setTimeGroupValue(null);
        setDateRangeValues(dates);
    };

    const renderPageHeader = () => {
        const timeGroup = [
            // { id: uuidv4(), value: 'month', text: 'Month' },
            { id: uuidv4(), value: 'year', text: 'Year' },
            { id: uuidv4(), value: 'all', text: 'All time' },
        ];

        const renderPageHeaderExtra = () => {
            return [
                <div className="page-header-wrapper" key="1">
                    <RadioGroup
                        group={timeGroup}
                        value={timeGroupValue}
                        onChange={changeDateHandler}
                    />
                    <Datepicker
                        range={true}
                        value={dateRangeValues}
                        onChange={changeRangeDateHandler}
                    />
                </div>,
            ];
        };

        return (
            <PageHeader
                title="Analytics"
                onBack={false}
                extra={renderPageHeaderExtra()}
            />
        );
    };

    const renderMainInfo = () => <MainInfo data={data} />;

    const renderPieCharts = () => (
        <PieCharts
            customers={contracts_chart}
            commodities={commodities_chart}
        />
    );

    const renderBalance = () => <Balance data={plot_table} />;

    const renderProfit = () => <Profit data={table_profit} />;

    const renderAnalyticsContent = () => {
        return (
            <>
                {renderPageHeader()}
                <div className="container">
                    {renderMainInfo()}
                    {renderPieCharts()}
                    {renderBalance()}
                    {renderProfit()}
                </div>
            </>
        );
    };

    return (
        <div className="analytics-page page">
            {isLoading ? renderLoader() : renderAnalyticsContent()}
        </div>
    );
};

const AnalyticsPageWithContext = () => () => {
    return (
        <AnalyticsContext>
            <AnalyticsPage />
        </AnalyticsContext>
    );
};

export default AnalyticsPageWithContext();
