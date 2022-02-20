import 'jsdom-global/register';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import reduxMockStore from 'redux-mock-store';
import { expect } from 'chai';
import React from 'react';
import MovieCard from './MovieCard';

Enzyme.configure({ adapter: new Adapter() });

const genres = { 11: 'Action' };
const movie = {
  title: 'The Bounty',
  genre_ids: [11],
  vote_average: 5,
  poster_path: 'a.jpg',
};

const mockStore = reduxMockStore();
const store = mockStore({
  genres,
});

function mountMovieCard(_movie = movie) {
  return Enzyme.mount(<MovieCard store={store} genres={genres} movie={_movie} />);
}

describe('#MovieCard', () => {
  it('should render without crashing', () => {
    Enzyme.shallow(<MovieCard store={store} genres={genres} movie={movie} />);
  });

  it('should render title', () => {
    const card = mountMovieCard();
    const title = <span className="title">The Bounty</span>;
    expect(card.contains(title)).to.equal(true);
  });

  it('should render genre', () => {
    const card = mountMovieCard();
    const genre = <span className="genres">Action</span>;
    expect(card.contains(genre)).to.equal(true);
  });

  it('should render stars', () => {
    const card = mountMovieCard();
    expect(card.find('.stars').getElement().props.style.height).to.equal('82.5px');
  });

  describe('when vote_average is 0', () => {
    it('should render stars with 0 height', () => {
      const card = mountMovieCard({ ...movie, vote_average: 0 });
      expect(card.find('.stars').getElement().props.style.height).to.equal('0px');
    });
  });

  describe('when vote_average is 10', () => {
    it('should render stars max 165px height', () => {
      const card = mountMovieCard({ ...movie, vote_average: 10 });
      expect(card.find('.stars').getElement().props.style.height).to.equal('165px');
    });
  });
});

