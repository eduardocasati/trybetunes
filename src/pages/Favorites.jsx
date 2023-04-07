import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

import '../style/FavoriteSongs.css';
import '../style/MusicCard.css';

import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      trackList: [],
    };
  }

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const data = await getFavoriteSongs();
    this.setState({
      trackList: data,
      isLoading: false,
    });
  }

  updateTrackList = async () => {
    const data = await getFavoriteSongs();
    this.setState({
      trackList: data,
    });
  };

  render() {
    const { isLoading, trackList } = this.state;
    return (
      <>
        <Header />
        <div className="favorite-songs__container">
          <h2>Músicas Favoritas</h2>
          {isLoading ? (
            <Loading />
          ) : (
            <MusicCard
              trackList={ trackList }
              updateTrackList={ this.updateTrackList }
            />
          )}
        </div>
      </>
    );
  }
}

export default Search;
