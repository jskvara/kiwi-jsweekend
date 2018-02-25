import * as React from 'react';
import * as moment from 'moment';

interface Flight {
    id: string;
    departure: {
        airport:  {
            name: string | null,
        } | null,
        time: string | null,
    } | null;
    arrival: {
        airport:  {
            name: string | null,
        } | null,
        time: string | null,
    } | null;
    price:  {
        amount: number | null,
        currency: string | null,
    } | null;
}

interface Props {
    flight: Flight;
}

class FlightComponent extends React.Component<Props, {}> {

    public render() {
        const { flight } = this.props;
        let departureAirport = null;
        let departureTime = null;
        if (flight.departure && flight.departure.airport && flight.departure.airport.name) {
            departureAirport = flight.departure.airport.name;
        }
        if (flight.departure && flight.departure.time) {
            departureTime = moment(flight.departure.time).format('D.M.YYYY H:mm');
        }

        let arrivalAirport = null;
        let arrivalTime = null;
        if (flight.arrival && flight.arrival.airport && flight.arrival.airport.name) {
            arrivalAirport = flight.arrival.airport.name;
        }
        if (flight.arrival && flight.arrival.time) {
            arrivalTime = moment(flight.arrival.time).format('D.M.YYYY H:mm');
        }

        let price = null;
        let currency = null;
        if (flight.price && flight.price.amount) {
            price = flight.price.amount;
        }
        if (flight.price && flight.price.currency) {
            currency = flight.price.currency;
        }

        return (
            <div>
                Departure: {departureAirport} - {departureTime}<br />
                Arrival: {arrivalAirport} - {arrivalTime}<br />
                Price: {price} {currency}<br />
                <br />
            </div>
        );
    }
}

export default FlightComponent;
