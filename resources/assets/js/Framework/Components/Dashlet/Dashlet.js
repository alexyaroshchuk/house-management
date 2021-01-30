import React from 'react';
import propTypes, { shape } from 'prop-types';

import './Dashlet.scss';

const Dashlet = (props) => {
    const { dashlet, title } = props;
    const widthDashletItem = 100 / dashlet.length;

    return (
        <div className="dashlet">
            {title ? <p className="title">{title}</p> : null}

            <ul>
                {dashlet.map((item, index) => {
                    const { title, render } = item;

                    return (
                        <li
                            key={index}
                            className="dashlet-item"
                            style={{
                                width: `${widthDashletItem}%`,
                            }}
                        >
                            {title ? <p className="title">{title}</p> : null}
                            <div className="render">{render()}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

Dashlet.defaultProps = {
    title: '',
    dashlet: [],
};

Dashlet.propTypes = {
    title: propTypes.string,
    dashlet: propTypes.arrayOf(
        shape({
            title: propTypes.string,
            render: propTypes.func.isRequired,
        })
    ),
};

export default Dashlet;
