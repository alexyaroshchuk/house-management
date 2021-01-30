import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.scss';

export const Logo = () => {
    return (
        <Link to="/" className="logo">
            CROWN
        </Link>
    );
};

export default Logo;
