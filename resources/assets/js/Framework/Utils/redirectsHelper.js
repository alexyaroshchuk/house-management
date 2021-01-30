const redirectTo = (props, path) => {
    props.history.push(path);
};

const redirectToHome = (props) => {
    redirectTo(props, '/');
};

const redirectToLogin = (props) => {
    redirectTo(props, '/login');
};

export { redirectTo, redirectToHome, redirectToLogin };
