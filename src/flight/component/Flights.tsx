import * as React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { FindFlightsQuery, FindFlightsQueryVariables } from '../../operation-result-types';
import Flight from './Flight';
import { FLIGHTS_COUNT } from './constants';

const findFlightsQuery = gql`
  query FindFlights($from: String!, $to: String!, $date: Date!, $after: String, $first: Int) {
    allFlights(
      search: {
        from: {location: $from}
        to: {location: $to}
        date: {exact: $date}
      }
      options: {currency: EUR}
      after: $after
      first: $first
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
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

class FlightsQuery extends Query<FindFlightsQuery, FindFlightsQueryVariables> {}

interface Props {
    from: string;
    to: string;
    date: string;
}

interface State {
    after: string | null;
}

class Flights extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            after: null,
        };
    }

    public render() {
        const {from, to, date} = this.props;
        const {after} = this.state;
        return (
            <FlightsQuery query={findFlightsQuery} variables={{from, to, date, after, first: FLIGHTS_COUNT}}>
                {({loading, data, error}) => {
                    if (loading) {
                        return <div>Loading</div>;
                    }
                    if (error) {
                        return <div>Error</div>;
                    }
                    if (!data) {
                        return <div>No data</div>;
                    }
                    const {allFlights} = data;
                    if (allFlights === null || allFlights.edges === null || allFlights.edges.length < 1) {
                        return <div>No data</div>;
                    }

                    return (
                        <div>
                            {allFlights.edges.map(edge => {
                                if (edge === null || edge.node === null) {
                                    return null;
                                }

                                return <Flight key={edge.node.id} flight={edge.node}/>;
                            })}
                            <div>
                                {allFlights.pageInfo && allFlights.pageInfo.hasNextPage &&
                                    <a href="#" onClick={this.onNextClick.bind(this, allFlights.pageInfo.endCursor)}>
                                        Next &gt;
                                    </a>}
                            </div>
                        </div>
                    );
                }}
            </FlightsQuery>
        );
    }

    public componentWillReceiveProps(nextProps: Props): void {
        if (this.props.from !== nextProps.from ||
            this.props.to !== nextProps.to ||
            this.props.date !== nextProps.date
        ) {
            this.setState({
                after: null,
            });
        }
    }

    private onNextClick(endCursor: string, event: React.SyntheticEvent<HTMLLinkElement>) {
        this.setState({
            after: endCursor,
        });
        event.preventDefault();
    }
}

export default Flights;
