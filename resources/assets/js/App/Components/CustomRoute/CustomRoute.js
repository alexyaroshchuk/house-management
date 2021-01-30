import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const CustomRoute = ({
    component: Component,
    redirectTo = '',
    path = '',
    ...rest
}) => (
    <Route
        {...rest}
        render={(props) =>
            !redirectTo ? (
                <Component {...props} />
            ) : (
                <Redirect from={path} to={redirectTo} />
            )
        }
    />
);

export default CustomRoute;
