/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface FindFlightsQueryVariables {
  from: string,
  to: string,
  date: string,
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
  } | null,
};
