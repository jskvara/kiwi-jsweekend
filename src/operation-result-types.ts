/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface FindFlightsQueryVariables {
  from: string,
  to: string,
  date: string,
  after?: string | null,
  first?: number | null,
};

export interface FindFlightsQuery {
  // Search for scheduled flights.
  allFlights:  {
    // A list of edges.
    edges:  Array< {
      // The item at the end of the edge
      node:  {
        // The ID of an object
        id: string,
        departure:  {
          airport:  {
            name: string | null,
          } | null,
          time: string | null,
        } | null,
        arrival:  {
          airport:  {
            name: string | null,
          } | null,
          time: string | null,
        } | null,
        // Total flight price.
        price:  {
          amount: number | null,
          // An ISO-4217 currency code.
          currency: string | null,
        } | null,
      } | null,
    } | null > | null,
    // Information to aid in pagination.
    pageInfo:  {
      // When paginating forwards, are there more items?
      hasNextPage: boolean,
      // When paginating forwards, the cursor to continue.
      endCursor: string | null,
    },
  } | null,
};

export interface FindLocationsQueryVariables {
  search: string,
};

export interface FindLocationsQuery {
  // Search for airports, cities, countries. You can search by location name, radius on the map or rectangle on the map. If you do not specify one of these search inputs then the alphabetical dump of all locations is returned.
  allLocations:  {
    // A list of edges.
    edges:  Array< {
      // The item at the end of the edge
      node:  {
        name: string | null,
      } | null,
    } | null > | null,
  } | null,
};
