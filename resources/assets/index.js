import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from './js/App/Context/Auth';
import { LogsContext } from '@Context/Logs';
import { App } from './js/App';

const app = (
    <AuthContext>
        <LogsContext>
            <Router>
                <App />
            </Router>
        </LogsContext>
    </AuthContext>
);

ReactDOM.render(app, document.getElementById('root'));
