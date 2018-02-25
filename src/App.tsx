import * as React from 'react';
import FindFlightsForm from './flight/component/FindFlightsForm';
import Flights from './flight/component/Flights';
import './App.css';

const logo = require('./logo.svg');

interface Props {
}

interface State {
    from: string | null;
    to: string | null;
    date: string | null;
}

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onFindFlightsFormSubmit = this.onFindFlightsFormSubmit.bind(this);
        this.state = {
            from: null,
            to: null,
            date: null,
        };
    }

    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <FindFlightsForm onSubmit={this.onFindFlightsFormSubmit} />
                {this.state.from !== null &&
                    this.state.to !== null &&
                    this.state.date !== null &&
                    <Flights from={this.state.from} to={this.state.to} date={this.state.date} />}
            </div>
        );
    }

    private onFindFlightsFormSubmit(data: {from: string, to: string, date: string}) {
        this.setState({
            from: data.from,
            to: data.to,
            date: data.date,
        });
    }
}

export default App;
