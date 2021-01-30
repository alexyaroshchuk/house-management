import React, { Fragment, useState } from 'react';
import propTypes from 'prop-types';

import Form from '../Form/Form';
import Button from '../Button/Button';
import './AddNewRow.scss';

const AddNewRow = (props) => {
    const { name, elements, layout, onAddnewRow } = props;
    const [isShowForm, setIsShowForm] = useState(false);

    const getFormConfig = () => {
        return {
            name,
            layout,
            onFinish: onSave,
        };
    };

    const getActions = () => {
        return [{ render: renderSaveButton }, { render: renderCancelButton }];
    };

    const renderSaveButton = () => <Button htmlType="submit">SAVE</Button>;

    const renderCancelButton = () => <Button onClick={onCanel}>CANCEL</Button>;

    const onCanel = (e) => {
        e.preventDefault();
        setIsShowForm(false);
    };

    const onSave = (values) => {
        onAddnewRow(values);
        setIsShowForm(false);
    };

    const showForm = () => setIsShowForm(true);

    const formConfig = getFormConfig();

    return (
        <Fragment>
            {isShowForm ? (
                <Form
                    formConfig={formConfig}
                    elements={elements}
                    actions={getActions()}
                />
            ) : null}
            <p className="add-row">
                <Button type="dashed" onClick={showForm}>
                    + Add
                </Button>
            </p>
        </Fragment>
    );
};

AddNewRow.defaultProps = {
    name: '',
    elements: [],
    layout: '',
    onAddnewRow: () => {},
};

AddNewRow.propTypes = {
    name: propTypes.string.isRequired,
    elements: propTypes.array.isRequired,
    layout: propTypes.string.isRequired,
    onAddnewRow: propTypes.func.isRequired,
};

export default AddNewRow;
