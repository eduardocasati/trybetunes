import React from 'react';
import PropTypes from 'prop-types';

import '../style/MusicCard.css';

import {
  addSong,
  getFavoriteSongs,
  removeSong,
} from '../services/favoriteSongsAPI';

import Loading from './Loading';

export default class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isFavorite: new Map(),
    };

    // this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  async componentDidMount() {
    const { isFavorite } = this.state;
    if (isFavorite.length !== 0) {
      this.setState({
        isLoading: true,
      });
      const fetchFavoriteSongs = await getFavoriteSongs();
      fetchFavoriteSongs.map((song) => this.setState((prevState) => ({
        isFavorite: prevState.isFavorite.set(song.trackName, true),
      })));
      this.setState({
        isLoading: false,
      });
    }
  }

  addFavoriteSong = async (songInfo) => {
    this.setState({ isLoading: true });
    await addSong(songInfo);
    this.setState({ isLoading: false });
  };

  removeFavoriteSong = async (songInfo) => {
    this.setState({ isLoading: true });
    await removeSong(songInfo);
    this.setState({ isLoading: false });
  };

  handleCheckboxChange = (event, song) => {
    const { updateTrackList } = this.props;
    const item = event.target.name;
    const isChecked = event.target.checked;
    this.setState((prevState) => ({
      isFavorite: prevState.isFavorite.set(item, isChecked),
    }));
    if (isChecked) {
      this.addFavoriteSong(song);
    } else {
      this.removeFavoriteSong(song);
    }
    if (updateTrackList) {
      updateTrackList();
    }
  };

  render() {
    const { trackList } = this.props;
    const { isLoading, isFavorite } = this.state;
    return (
      <div className="music-card__container">
        {isLoading ? (
          <Loading />
        ) : (
          <ol>
            {trackList.map((track, index) => (
              <li key={ index }>
                <p>{track.trackName}</p>
                <div className="player__container">
                  <audio
                    src={ track.previewUrl }
                    controls
                  >
                    <track kind="captions" />
                    O seu navegador não suporta o
                    elemento
                    {' '}
                    <code>audio</code>
                    .
                  </audio>
                </div>
                <div className="checkbox__container">
                  <input
                    checked={ isFavorite.get(track.trackName) }
                    onChange={ (event) => this.handleCheckboxChange(event, track) }
                    type="checkbox"
                    name={ track.trackName }
                    id={ track.trackName }
                  />
                  <label htmlFor={ track.trackName }>Favorita</label>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackList: PropTypes.arrayOf(
    PropTypes.shape({
      artistId: PropTypes.number.isRequired,
      artistName: PropTypes.string.isRequired,
      artistViewUrl: PropTypes.string.isRequired,
      artworkUrl30: PropTypes.string.isRequired,
      artworkUrl60: PropTypes.string.isRequired,
      artworkUrl100: PropTypes.string.isRequired,
      collectionCensoredName: PropTypes.string.isRequired,
      collectionExplicitness: PropTypes.string.isRequired,
      collectionId: PropTypes.number.isRequired,
      collectionName: PropTypes.string.isRequired,
      collectionPrice: PropTypes.number.isRequired,
      collectionViewUrl: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      discCount: PropTypes.number.isRequired,
      discNumber: PropTypes.number.isRequired,
      isStreamable: PropTypes.bool.isRequired,
      kind: PropTypes.string.isRequired,
      previewUrl: PropTypes.string.isRequired,
      primaryGenreName: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired,
      trackCensoredName: PropTypes.string.isRequired,
      trackCount: PropTypes.number.isRequired,
      trackExplicitness: PropTypes.string.isRequired,
      trackId: PropTypes.number.isRequired,
      trackName: PropTypes.string.isRequired,
      trackNumber: PropTypes.number.isRequired,
      trackPrice: PropTypes.number.isRequired,
      trackTimeMillis: PropTypes.number.isRequired,
      trackViewUrl: PropTypes.string.isRequired,
      wrapperType: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  updateTrackList: PropTypes.func.isRequired,
};
