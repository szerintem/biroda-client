export const REQUEST_MOVIES = 'REQUEST_MOVIES';
export const RECEIVE_MOVIES = 'RECEIVE_MOVIES';
export const RECEIVE_GENRES = 'RECEIVE_GENRES';
export const SELECT_MOVIE = 'SELECT_MOVIE';
export const DESELECT_MOVIE = 'DESELECT_MOVIE';

const requestMoviesDispatch = (search) => ({
  type: REQUEST_MOVIES,
  search,
});

const receiveMoviesDispatch = (movies) => ({
  type: RECEIVE_MOVIES,
  movies,
});

const receiveGenresDispatch = (genres) => ({
  type: RECEIVE_GENRES,
  genres,
});

const selectMovieDispatch = (movie, details) => ({
  type: SELECT_MOVIE,
  movie,
  details,
});

const deselectMovieDispatch = () => ({
  type: DESELECT_MOVIE,
});

export const fetchMovies = (query) => (dispatch) => {
  dispatch(requestMoviesDispatch(query));
  return fetch(`http://localhost:3001/tmdb/search?${new URLSearchParams({ query })}`)
    .then((response) => response.json())
    .then((json) => dispatch(receiveMoviesDispatch(json)));
};

export const fetchGenres = () => (dispatch) => fetch('http://localhost:3001/tmdb/genres')
  .then((response) => response.json())
  .then((json) => dispatch(receiveGenresDispatch(json)));

export const selectMovie = (movie) => (dispatch) => {
  const year = (new Date(movie.release_date)).getFullYear();
  const title = `${movie.title} (${year})`;
  return fetch(`http://localhost:3001/wiki/movie?${new URLSearchParams({ title })}`)
    .then((response) => response.json())
    .then((details) => dispatch(selectMovieDispatch(movie, details)));
};

export const deselectMovie = () => (dispatch) => dispatch(deselectMovieDispatch());
