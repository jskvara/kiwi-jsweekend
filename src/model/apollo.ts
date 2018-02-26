import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
    uri: 'https://graphql.kiwi.com/',
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
});

export function getApolloClient(): ApolloClient<NormalizedCacheObject> {
    return client;
}
