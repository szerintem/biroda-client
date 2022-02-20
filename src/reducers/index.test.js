import reducer from './index'
import { SELECT_MOVIE } from "../actions";

describe('#reducer', () => {
  describe('when no action triggered', function() {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual({
          genres: {},
          movie: null,
          movies: [],
        }
      )
    })
  })

  describe('when action is SELECT_MOVIE', function() {
    it('should reduce movie with its details', () => {
      const action = {
        type: 'SELECT_MOVIE',
        movie: {
          title: "asd",
        },
        details: {
          description: "ada",
          imdbLink: "http://imdb.com/asd",
          wikiLink: "http://wikipedia.com/asd",
        },
      }

      expect(reducer(undefined, action)).toEqual({
          genres: {},
          movie: {
            description: "ada",
            title: "asd",
            imdbLink: "http://imdb.com/asd",
            wikiLink: "http://wikipedia.com/asd",
          },
          movies: [],
        }
      )
    })
  })

  describe('when action is DESELECT_MOVIE', function() {
    it('should set movie to null', () => {
      const initialState = {
        genres: {},
        movie: {
          description: "ada",
          title: "asd",
          imdbLink: "http://imdb.com/asd",
          wikiLink: "http://wikipedia.com/asd",
        },
        movies: [],
      }
      const action = {
        type: 'DESELECT_MOVIE'
      }
      expect(reducer(initialState, action)).toEqual({
          genres: {},
          movie: null,
          movies: [],
        }
      )
    })
  })

  describe('when action is RECEIVE_GENRES', function() {
    it('should reduce genres', () => {

      const action = {
        type: 'RECEIVE_GENRES',
        genres: [
          { id: 12, name: 'a' },
          { id: 24, name: 'b' },
        ],
      }

      expect(reducer(undefined, action)).toEqual({
          genres: {
            12: "a",
            24: "b",
          },
          movie: null,
          movies: [],
        }
      )
    })
  })

  describe('when action is REQUEST_MOVIES', function() {
    it('should set state.movies to an empty array', () => {

      const action = {
        type: 'REQUEST_MOVIES',
      }

      const initialState = {
        genres: {},
        movie: {},
        movies: [
          { title: 'movie1' },
          { title: 'movie2' },
        ],
      }

      expect(reducer(initialState, action)).toEqual({
          genres: {},
          movie: {},
          movies: [],
        }
      )
    })
  })

  describe('when action is RECEIVE_MOVIES', function() {
    it('should set state.movies from action.movies', () => {

      const action = {
        type: 'RECEIVE_MOVIES',
        movies: [
          { title: 'movie1' },
          { title: 'movie2' },
        ],
      }

      expect(reducer(undefined, action)).toEqual({
          genres: {},
          movie: null,
          movies: [
            { title: "movie1" },
            { title: "movie2" },
          ],
        }
      )
    })
  })

})
