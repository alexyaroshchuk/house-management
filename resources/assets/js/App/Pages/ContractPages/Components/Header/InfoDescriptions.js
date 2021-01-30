import React from 'react';

import { get, uniq } from 'lodash';

import Descriptions from '@Components/Descriptions/Descriptions';
import { formatDate } from '@Utils/formatHelpers';

export const InfoDescriptions = (props) => {
    const { contract } = props;

    const {
        number,
        exporters,
        date_start,
        commodities,
        seller_contracts,
        date_end,
        shipped_method,
        letter_of_credit,
    } = contract;

    const renderArrayTemplate = (array, key) => {
        const result = array.map((item) => get(item, `${key}`, ''));
        return uniq(result).join(', ');
    };

    const renderArrayTemplateWithLogo = (commodities) => {
        return commodities
            .map((commodity) => `${commodity.title} (${commodity.logo.title})`)
            .join(', ');
    };

    const renderObjectTemplate = (object, key) => {
        return get(object, `${key}`, '');
    };

    const info = [
        {
            label: 'Contract number',
            render: () => number,
        },
        {
            label: 'Payment method',
            render: () => shipped_method,
        },
        {
            label: 'Exporter',
            render: () => renderArrayTemplate(exporters, 'name'),
        },
        {
            label: 'Date start',
            render: () => formatDate(date_start),
        },
        {
            label: 'Letter of credit',
            render: () => (letter_of_credit ? letter_of_credit : '-'),
        },
        {
            label: 'Commodity',
            render: () => renderArrayTemplateWithLogo(commodities, 'title'),
        },
        {
            label: 'Seller',
            render: () => renderArrayTemplate(seller_contracts, 'seller.name'),
        },
        {
            label: 'Date end',
            render: () => (date_end ? formatDate(date_end) : '-'),
        },
    ];

    return (
        <Descriptions
            itemsList={info}
            size="default"
            layout="horizontal"
            colon={true}
            column={4}
        />
    );
};

export default InfoDescriptions;
