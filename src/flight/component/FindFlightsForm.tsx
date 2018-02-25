import * as React from 'react';

interface Props {
    onSubmit: (data: object) => void;
}

interface State {
    from: string | null;
    to: string | null;
    date: string | null;
    errors: string[];
}

class FindFlightsForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onFromChange = this.onFromChange.bind(this);
        this.onToChange = this.onToChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            from: null,
            to: null,
            date: null,
            errors: [],
        };
    }

    public render() {
        return (
            <form onSubmit={this.onSubmit}>
                <br />
                <div>
                    <label htmlFor="from">From: </label>
                    <input id="from" type="text" onChange={this.onFromChange} />
                </div>
                <div>
                    <label htmlFor="to">To: </label>
                    <input id="to" type="text" onChange={this.onToChange}/>
                </div>
                <div>
                    <label htmlFor="date">Date: </label>
                    <input id="date" type="date" onChange={this.onDateChange}/>
                </div>
                <div>
                    <input type="submit"/>
                </div>
                <div style={{color: 'red'}}>
                    {this.state.errors.map((error, key) => <div key={key}>{error}</div>)}
                </div>
                <br />
            </form>
        );
    }

    private onFromChange(event: React.SyntheticEvent<HTMLInputElement>) {
        this.setState({
            from: event.currentTarget.value,
        });
    }

    private onToChange(event: React.SyntheticEvent<HTMLInputElement>) {
        this.setState({
            to: event.currentTarget.value,
        });
    }

    private onDateChange(event: React.SyntheticEvent<HTMLInputElement>) {
        this.setState({
            date: event.currentTarget.value,
        });
    }

    private onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        const errors: string[] = [];

        if (this.state.from === null) {
            errors.push('From field can\'t be empty.');
        }
        if (this.state.to === null) {
            errors.push('To field can\'t be empty.');
        }
        if (this.state.date === null) {
            errors.push('Date field can\'t be empty.');
        }
        this.setState({errors});

        if (errors.length < 1) {
            this.props.onSubmit({
                from: this.state.from,
                to: this.state.to,
                date: this.state.date,
            });
        }
        event.preventDefault();
    }
}

export default FindFlightsForm;
