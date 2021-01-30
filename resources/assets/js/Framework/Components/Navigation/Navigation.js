import React from 'react';
import { NavLink } from 'react-router-dom';
import propTypes, { shape, string, element } from 'prop-types';
import { get } from 'lodash';

import { menuItemsMap } from '../../../App/Routes/mapRolesToMenu';

import './Navigation.scss';

export const Navigation = (props) => {
    const { role } = props;
    const menu = get(menuItemsMap, `${role}`, []);

    const renderMenuItems = () => {
        return menu.map((menuItem) => {
            const { key, icon, name } = menuItem;

            return (
                <NavLink
                    key={key}
                    activeClassName="is-active"
                    to={`/${key}`}
                    className="navigation-item"
                >
                    {icon}
                    {name}
                </NavLink>
            );
        });
    };

    return <nav className="navigation">{renderMenuItems()}</nav>;
};

Navigation.defaultProps = {
    role: '',
};

Navigation.propTypes = {
    role: propTypes.string.isRequired,
};

export default Navigation;
