import React from 'react';
import PropTypes from 'prop-types';

import '../style/Album.css';

import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      trackList: [],
      isLoading: false,
      artName: '',
      albumName: '',
      albumArt: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({ isLoading: true });
    const data = await getMusics(id.toString());
    const filteredData = Object.values(data).filter((tracks) => tracks.kind === 'song');
    this.setState({
      trackList: filteredData,
      isLoading: false,
      artName: data[0].artistName,
      albumName: data[0].collectionName,
      albumArt: data[0].artworkUrl100,
    });
  }

  render() {
    const { trackList, isLoading, artName, albumName, albumArt } = this.state;
    return (
      <>
        <Header />
        <div className="album-info__container">
          <div className="album-card__container">
            <h1>
              Álbum:
              {' '}
              <span>{albumName}</span>
            </h1>
            <h2>
              Artista:
              {' '}
              <span>{artName}</span>
            </h2>
            <div className="album-title-img__container">
              <img src={ albumArt } alt={ albumName } />
            </div>
          </div>
          {isLoading ? <Loading /> : <MusicCard trackList={ trackList } />}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape(
    PropTypes.shape(
      PropTypes.number.isRequired,
    ).isRequired,
  ).isRequired,
};

export default Album;
