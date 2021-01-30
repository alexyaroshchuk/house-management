import React from 'react';
import { Collapse } from 'antd';
import propTypes, { shape } from 'prop-types';

const { Panel } = Collapse;

import './Accordion.scss';

const Accordion = (props) => {
    const { panels } = props;

    return (
        <Collapse accordion>
            {panels.map((panel, index) => {
                const { header, render, extra, disabled } = panel;

                return (
                    <Panel
                        header={header}
                        key={index}
                        extra={extra}
                        disabled={disabled}
                    >
                        {render}
                    </Panel>
                );
            })}
        </Collapse>
    );
};

Accordion.defaultProps = {
    panels: [],
};

Accordion.propTypes = {
    panels: propTypes.arrayOf(
        shape({
            key: propTypes.string,
            header: propTypes.oneOfType([propTypes.string, propTypes.element]),
            render: propTypes.element,
            extra: propTypes.element,
        })
    ).isRequired,
};

export default Accordion;
