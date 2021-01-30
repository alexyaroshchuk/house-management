import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import './Payments.scss';
import Card from '@Components/Card/Card';
import Accordion from '@Components/Accordion/Accordion';
import Pagination from '@Components/Pagination/Pagination';
import Loader from '@Components/Loader/Loader';
import Empty from '@Components/Empty/Empty';

import { formatDate, formatCurrency, oneHundred } from '@Utils/formatHelpers';

const accordionHeaderTemplate = (date, payments, expenses) => {
    return (
        <div className="panel">
            <div className="date">
                <div className="title">Date</div>
                <div className="value">{formatDate(date)}</div>
            </div>
            <div className="wrapper">
                <div className="income">
                    <div className="title">Income</div>
                    <div className="value">
                        {formatCurrency(payments / oneHundred)}
                    </div>
                </div>
                <div className="expenses">
                    <div className="title">Expenses</div>
                    <div className="value">
                        {formatCurrency(expenses / oneHundred)}
                    </div>
                </div>
            </div>
        </div>
    );
};

const accordionRenderTemplate = (contracts) => {
    return (
        <ul className="contracts">
            {contracts.map((contract) => {
                const { id, number, amount } = contract;

                return (
                    <li key={id} className="contract">
                        <div className="title">
                            Contract number:{' '}
                            <Link to={`/contracts/${id}`}>{number}</Link>
                        </div>
                        <div
                            className={`sum ${
                                amount / oneHundred > 0
                                    ? 'positive'
                                    : 'negative'
                            }`}
                        >
                            {formatCurrency(amount / oneHundred)}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

const accordionTemplate = (data) => {
    const panels = data.map((panel, idx) => {
        const { date, payments, expenses, contract } = panel;

        return {
            key: String(idx),
            header: accordionHeaderTemplate(date, payments, expenses),
            render: accordionRenderTemplate(contract),
        };
    });

    return panels;
};

const Payments = (props) => {
    const { payments, params, paginationLoader, onChange } = props;
    const { page, pageSize, total } = params.pagination;

    const panels = accordionTemplate(payments);

    return (
        <div className="dashboard-payments">
            <Card title="Money management">
                {payments.length ? (
                    <Fragment>
                        {paginationLoader ? (
                            <Loader size="large" style="white" />
                        ) : (
                            <Accordion panels={panels} />
                        )}
                        <Pagination
                            showQuickJumper
                            total={total}
                            current={page}
                            defaultPageSize={pageSize}
                            onChange={onChange}
                        />
                    </Fragment>
                ) : (
                    <Empty description="No data available" />
                )}
            </Card>
        </div>
    );
};

export default Payments;
