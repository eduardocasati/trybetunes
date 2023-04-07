import React from 'react';
import PropTypes from 'prop-types';

export default class SearchForm extends React.Component {
  render() {
    const { searchInput, handleChange, handleClick } = this.props;
    const lintNoMagicNumber = 2;
    return (
      <div className="search-form__container">
        <input
          value={ searchInput }
          onChange={ handleChange }
          type="text"
          name="searchInput"
          id="searchInput"
          placeholder="Nome do artista"
        />
        <button
          onClick={ handleClick }
          disabled={ searchInput.length < lintNoMagicNumber }
          type="button"
        >
          PESQUISAR
        </button>
      </div>
    );
  }
}

SearchForm.propTypes = {
  searchInput: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};
