import React from 'react';
import propTypes from 'prop-types';
import Navigation from '@Components/Navigation/Navigation';
import Badge from '@Components/Badge/Badge';
import UserInfo from '@Components/UserInfo/UserInfo';
import { Logo } from '@Components/Logo/Logo';
import './header.scss';

export const Header = (props) => {
    const { user, badgeDot, toggleDrawer } = props;
    const { role, email } = user;

    return (
        <header className="header">
            <div className="header-col">
                <Logo />
                <Navigation role={role} />
            </div>

            <div className="header-col">
                <Badge badgeDot={badgeDot} toggleDrawer={toggleDrawer} />
                <UserInfo email={email} />
            </div>
        </header>
    );
};

Header.defaultProps = {
    user: {},
};

Header.propTypes = {
    user: propTypes.shape({
        role: propTypes.string.isRequired,
        email: propTypes.string.isRequired,
    }),
};

export default Header;
