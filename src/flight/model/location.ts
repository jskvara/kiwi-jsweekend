import { getApolloClient } from '../../model/apollo';
import gql from 'graphql-tag';
import { FindLocationsQuery } from '../../operation-result-types';
import { ApolloQueryResult } from 'apollo-client';

const findLocationsQuery = gql`
  query FindLocations($search: String!) {
    allLocations(search: $search) {
      edges {
        node {
          name
        }
      }
    }
  }
`;

export async function getSuggestedLocations(value: string): Promise<string[]> {
    return getApolloClient().query({
        query: findLocationsQuery,
        variables: {
            search: value
        },
    }).then((result: ApolloQueryResult<FindLocationsQuery>) => {
        if (result.data.allLocations === null || result.data.allLocations.edges === null ||
            result.data.allLocations.edges.length < 1) {
            return [];
        }

        const locations = result.data.allLocations.edges.map(location => {
            if (location === null || location.node === null) {
                return null;
            }
            return location.node.name;
        });

        return locations.filter((locationValue: string | null) => locationValue !== null) as string[];
    });
}
