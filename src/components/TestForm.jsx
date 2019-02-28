import React, {Component} from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

class AutoCompleteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: ''
    }
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    this.setState({ address })
  };

  render() {
    return (
      <form onSubmit={(ev) => {
        ev.preventDefault()
        if (this.state.address !== '') {
          this.props.setOriginDestination(this.state.address);
          this.setState({ address: '' })
        }
        }}>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className='input-and-auto'>
              <input
                {...getInputProps({
                  placeholder: 'Where to?',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className=suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <button>GO</button>
      </form>
    );
  }
}

export default AutoCompleteInput
