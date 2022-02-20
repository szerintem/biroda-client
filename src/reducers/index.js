import { combineReducers } from 'redux';
import {
  REQUEST_MOVIES,
  RECEIVE_MOVIES,
  RECEIVE_GENRES,
  SELECT_MOVIE,
  DESELECT_MOVIE,
} from '../actions';

function createReducer(initialState, handlers) {
  // eslint-disable-next-line default-param-last
  return function reducer(state = initialState, action) {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

const requestMovies = () => ([]);
const receiveMovies = (state, action) => action.movies;
const receiveGenres = (state, action) => action.genres.reduce((accumulator, current) => {
  accumulator[current.id] = current.name;
  return accumulator;
}, {});

const selectMovie = (state, { movie, details }) => {
  const selectedMovie = { ...movie };
  selectedMovie.imdbLink = details?.imdbLink || null;
  selectedMovie.wikiLink = details?.wikiLink || null;
  selectedMovie.description = details?.description || null;
  return selectedMovie;
};
const deselectMovie = () => null;

const genresReducer = createReducer({}, {
  [RECEIVE_GENRES]: receiveGenres,
});

const moviesReducer = createReducer([], {
  [REQUEST_MOVIES]: requestMovies,
  [RECEIVE_MOVIES]: receiveMovies,
});

const movieReducer = createReducer(null, {
  [SELECT_MOVIE]: selectMovie,
  [DESELECT_MOVIE]: deselectMovie,
});

export default combineReducers({
  genres: genresReducer,
  movies: moviesReducer,
  movie: movieReducer,
});
