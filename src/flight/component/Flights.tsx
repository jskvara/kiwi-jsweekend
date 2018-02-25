import * as React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { FindFlightsQuery, FindFlightsQueryVariables } from '../../operation-result-types';
import Flight from './Flight';

const findFlightsQuery = gql`
  query FindFlights($from: String!, $to: String!, $date: Date!) {
    allFlights(
      search: {
        from: {location: $from}
        to: {location: $to}
        date: {exact: $date}
      }
      options: {currency: EUR}
      first: 5
    ) {
      edges {
        node {
          id
          departure {
            airport {
              name
            }
            time
          }
          arrival {
            airport {
              name
            }
            time
          }
          price {
            amount
            currency
          }
        }
      }
    }
  }
`;

class FlightsQuery extends Query<FindFlightsQuery, FindFlightsQueryVariables> {}

export interface FlightsProps {
    from: string;
    to: string;
    date: string;
}

export const Character: React.SFC<FlightsProps> = props => {
    const { from, to, date } = props;
    return (
        <FlightsQuery query={findFlightsQuery} variables={{from, to, date}}>
            {({ loading, data, error }) => {
                if (loading) {
                    return <div>Loading</div>;
                }
                if (error) {
                    return <div>Error</div>;
                }
                if (!data) {
                    return <div>No data</div>;
                }
                const { allFlights } = data;
                if (allFlights === null || allFlights.edges === null || allFlights.edges.length < 1) {
                    return <div>No data</div>;
                }

                return (
                    <div>
                        { allFlights.edges.map(edge => {
                            if (edge === null || edge.node === null) {
                                return null;
                            }

                            return <Flight key={edge.node.id} flight={edge.node} />;
                        })}
                    </div>
                );
            }}
        </FlightsQuery>
    );
};

export default Character;
