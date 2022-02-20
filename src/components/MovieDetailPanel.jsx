import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deselectMovie } from '../actions';
import './MovieDetailPanel.css';

function MovieDetailPanel({ movie, dispatch }) {
  return (
    <fieldset>
      <legend>
        {movie.title}
        <button type="button" className="closeButton" onClick={() => dispatch(deselectMovie())}>✖️</button>
      </legend>
      <div className="description">
        {movie.description}
      </div>
      <div className="links">
        <ul>
          <li><a href={movie.imdbLink} target="_blank" rel="noreferrer">IMDB</a></li>
          <li><a href={movie.wikiLink} target="_blank" rel="noreferrer">WikiPedia</a></li>
        </ul>
      </div>
    </fieldset>
  );
}

MovieDetailPanel.propTypes = {
  movie: PropTypes.oneOfType([PropTypes.object]).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect((state) => ({
  movie: state.movie,
  dispatch: state.dispatch,
}))(MovieDetailPanel);
