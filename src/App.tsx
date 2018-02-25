import * as React from 'react';
import Flights from './flight/component/Flights';
import './App.css';

const logo = require('./logo.svg');

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <Flights from={'prague'} to={'porto'} date={'2018-03-01'} />
            </div>
        );
    }
}

export default App;
