import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchMovies } from '../actions';

class Searchbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };

    this.updateInput = this.updateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  handleKeydown(event) {
    const { search } = this.state;
    if (event.code === 'Enter') {
      this.handleSubmit(search);
    }
  }

  handleSubmit(search) {
    const { dispatch } = this.props;
    dispatch(fetchMovies(search));
  }

  updateInput(event) {
    this.setState({ search: event.target.value });
  }

  render() {
    const { search } = this.state;
    return (
      <fieldset>
        <legend>Searchbar</legend>
        <input type="text" onChange={this.updateInput} onKeyDown={this.handleKeydown} />
        <input type="button" value="Search" onClick={() => this.handleSubmit(search)} />
      </fieldset>
    );
  }
}

Searchbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Searchbar);
