import * as React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { getApolloClient } from './model/apollo';
import './index.css';

const ApolloApp = (
    <ApolloProvider client={getApolloClient()}>
        <App />
    </ApolloProvider>
);

render(ApolloApp, document.getElementById('root'));
registerServiceWorker();
