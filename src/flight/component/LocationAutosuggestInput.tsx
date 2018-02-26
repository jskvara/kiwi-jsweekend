import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import { getSuggestedLocations } from '../model/location';

interface Props {
    id: string | null;
    onChange: Function;
}

interface State {
    value: string;
    suggestions: string[];
}

class LocationAutosuggestInput extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.state = {
            value: '',
            suggestions: [],
        };
    }

    public render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            value,
            onChange: this.onChange,
        };
        const props: ({id?: string}) = {};
        if (this.props.id) {
            props.id = this.props.id;
        }

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
                {...props}
            />
        );
    }

    private getSuggestionValue(suggestion: string): string {
        if (suggestion.length > 0) {
            this.props.onChange(suggestion);
        }
        return suggestion;
    }

    private async getSuggestions(value: string): Promise<string[]> {
        const trimedValue = value.trim();
        if (trimedValue.length > 0) {
            try {
                return await getSuggestedLocations(trimedValue);
            } catch (e) {
                // ignore
            }
        }

        return [];
    }

    private renderSuggestion(suggestion: string) {
        return suggestion;
    }

    private onChange(event: React.FormEvent<HTMLElement>, data: Autosuggest.ChangeEvent) {
        this.setState({
            value: data.newValue,
        });
        if (data.newValue.length > 0) {
            this.props.onChange(data.newValue);
        }
    }

    private async onSuggestionsFetchRequested(data: Autosuggest.SuggestionsFetchRequestedParams) {
        try {
            this.setState({
                suggestions: await this.getSuggestions(data.value),
            });
        } catch (e) {
            this.onSuggestionsClearRequested();
        }
    }

    private onSuggestionsClearRequested() {
        this.setState({
            suggestions: []
        });
    }
}

export default LocationAutosuggestInput;
