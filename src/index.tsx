import * as React from 'react';
import { render } from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const httpLink = createHttpLink({
    uri: 'https://graphql.kiwi.com/',
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
});

const ApolloApp = (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);

render(ApolloApp, document.getElementById('root'));
registerServiceWorker();
