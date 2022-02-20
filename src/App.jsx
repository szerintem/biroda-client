import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchGenres, fetchMovies } from './actions';
import Searchbar from './components/Searchbar';
import Movies from './components/Movies';
import MovieDetailPanel from './components/MovieDetailPanel';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchGenres());
  }

  componentDidUpdate(previousProps) {
    const { dispatch, search } = this.props;
    if (previousProps.search !== search) {
      dispatch(fetchMovies(search));
    }
  }

  render() {
    const { movies, movie } = this.props;
    const hasMovies = movies.length !== 0;

    return (
      <div>
        <Searchbar />
        { movie ? <MovieDetailPanel movie={movie} /> : null }
        { hasMovies ? <Movies movies={movies} /> : null }
      </div>
    );
  }
}

App.propTypes = {
  movie: PropTypes.oneOfType([PropTypes.object]),
  search: PropTypes.string,
  movies: PropTypes.arrayOf(PropTypes.object),
  dispatch: PropTypes.func.isRequired,
};

App.defaultProps = {
  movie: {},
  search: null,
  movies: [],
};

export default connect((state) => state)(App);
