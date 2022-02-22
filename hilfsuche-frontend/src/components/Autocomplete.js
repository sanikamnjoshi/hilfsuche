import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      filteredContent :[],
      filteredId: [],
      showSuggestions: false,
      userInput: ""
    };
  }

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;
    
    const filteredSuggestions = Object.keys(suggestions).filter(key =>
      suggestions[key].content.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    )

    const filteredContent = filteredSuggestions.map((key) => { return suggestions[parseInt(key)].content; });
    const filteredId = filteredSuggestions.map((key) => { return suggestions[parseInt(key)].id; });

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      filteredContent,
      filteredId,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredContent } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
      });

      if(this.state.filteredSuggestions.length != 0) {
        this.props.filteredIdsNav(this.state.filteredSuggestions)
      } else if(this.state.filteredSuggestions.length == 0) {
        this.props.filteredIdsNav(["-1"])
      }
    }
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredContent.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }

    
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        filteredContent,
        showSuggestions,
        userInput
      }
    } = this;

    return (
      <Fragment>
        <input
          type="text"
          placeholder="Enter keywords"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
      </Fragment>
    );
  }
}

export default Autocomplete;
