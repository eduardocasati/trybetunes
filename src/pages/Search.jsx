import React from 'react';
import { Link } from 'react-router-dom';

import '../style/Search.css';

import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen';
import SearchForm from '../components/SearchForm';

import searchAlbums from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      isLoading: false,
      albumsList: [],
      artistName: '',
      emptyAlbums: false,
    };
  }

  handleChange = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  handleClick = async () => {
    const { searchInput } = this.state;
    this.setState({ isLoading: true });
    const data = await searchAlbums(searchInput.normalize("NFD").replace(/[^a-zA-Z\s]/g, ""));
    this.setState({
      albumsList: data,
      isLoading: false,
      artistName: searchInput,
      searchInput: '',
    });
    if (data.length === 0) {
      this.setState({ emptyAlbums: true });
    }
  };

  render() {
    const { searchInput, isLoading, albumsList, artistName, emptyAlbums } = this.state;
    return (
      <>
        <Header />
        <div className="search-page__container">
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <SearchForm
              searchInput={ searchInput }
              handleChange={ this.handleChange }
              handleClick={ this.handleClick }
            />
          )}
          {albumsList.length > 0 && (
            <span className="search-result">
              Resultado de álbuns de:
              {' '}
              <span className="search-result-artist-name">{artistName}</span>
            </span>
          )}
          <div>
            <div className="albums-list__container">
              {albumsList.length > 0
                && albumsList.map((album, index) => (
                  <div key={ index } className="album__container">
                    <Link
                      to={ `/album/${album.collectionId}` }
                    >
                      <div>
                        <img
                          src={ album.artworkUrl100 }
                          alt={ album.collectionName }
                        />
                        <p>{album.collectionName}</p>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
            {emptyAlbums === true && (
              <p className="results-not-found">Nenhum álbum foi encontrado</p>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Search;
