import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectMovie } from '../actions';
import './MovieCard.css';

function MovieCard({ movie, genres, dispatch }) {
  const genre = genres[movie.genre_ids[0]];

  return (
    <div
      className="movie"
      style={{ backgroundImage: `url(https://www.themoviedb.org/t/p/w200/${movie.poster_path})` }}
      role="button"
      onClick={() => dispatch(selectMovie(movie))}
      onKeyPress={() => dispatch(selectMovie(movie))}
      tabIndex={0}
    >
      <span className="title">{movie.title}</span>
      <span className="genres">{genre}</span>
      <div
        className="stars"
        style={{ height: `${165 * (movie.vote_average / 10)}px` }}
      >
        {'⭐'.repeat(10)}
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.oneOfType([PropTypes.object]).isRequired,
  genres: PropTypes.oneOfType([PropTypes.object]).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect((state) => ({ dispatch: state.dispatch, genres: state.genres }))(MovieCard);
