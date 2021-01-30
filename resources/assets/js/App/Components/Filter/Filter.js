import React from 'react';

import Form from '@Components/Form/Form';
import './Filter.scss';

const Filter = (props) => {
    const { title, formConfig, elements, actions, initialValues } = props;

    return (
        <div className="filter">
            <div className="title">{title}</div>
            <Form
                formConfig={formConfig}
                elements={elements}
                actions={actions}
                initialValues={initialValues}
            />
        </div>
    );
};

export default Filter;
