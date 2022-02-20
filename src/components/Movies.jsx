import React from 'react';
import PropTypes from 'prop-types';

import MovieCard from './MovieCard';

function Movies({ movies }) {
  return (
    <fieldset>
      <legend>Movie List</legend>
      {movies.map((movie) => <MovieCard movie={movie} />)}
    </fieldset>
  );
}

Movies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Movies;
