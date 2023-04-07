import React from 'react';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';

import '../style/ProfileEdit.css';

import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen';

class ProfileEdit extends React.Component {
  state = {
    isLoading: false,
    nameInput: '',
    emailInput: '',
    descriptionInput: '',
    imageInput: '',
    btnDisabled: true,
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const data = await getUser();
    this.setState({
      nameInput: data.name,
      emailInput: data.email,
      descriptionInput: data.description,
      imageInput: data.image,
      isLoading: false,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      this.validateForm,
    );
  };

  validateForm = () => {
    const { nameInput, emailInput, descriptionInput, imageInput } = this.state;
    const emailFormat = /^\S+@\S+\.\S+$/;
    if (nameInput === '') {
      return this.setState({ btnDisabled: true });
    }
    if (descriptionInput === '') {
      return this.setState({ btnDisabled: true });
    }
    if (imageInput === '') {
      return this.setState({ btnDisabled: true });
    }
    if (!emailInput.match(emailFormat)) {
      return this.setState({ btnDisabled: true });
    }
    this.setState({ btnDisabled: false });
  };

  updateUserInfo = async () => {
    const { history } = this.props;
    const { nameInput, emailInput, imageInput, descriptionInput } = this.state;
    this.setState({
      isLoading: true,
    });
    await updateUser({
      name: nameInput,
      email: emailInput,
      image: imageInput,
      description: descriptionInput,
    });
    history.push('/profile');
  };

  render() {
    const {
      isLoading,
      btnDisabled,
      nameInput,
      emailInput,
      descriptionInput,
      imageInput,
    } = this.state;
    return (
      <div>
        <Header />
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <div className="profile-edit-form__container">
            <h2>Editar Perfil</h2>
            <input
              value={ nameInput }
              onChange={ this.handleChange }
              type="text"
              name="nameInput"
              id="nameInput"
              placeholder="Nome"
            />
            <input
              value={ emailInput }
              onChange={ this.handleChange }
              type="email"
              name="emailInput"
              id="emailInput"
              placeholder="E-mail"
            />
            <textarea
              value={ descriptionInput }
              onChange={ this.handleChange }
              name="descriptionInput"
              id="descriptionInput"
              placeholder="Descrição"
              maxLength="250"
            />
            <input
              value={ imageInput }
              onChange={ this.handleChange }
              type="url"
              name="imageInput"
              id="imageInput"
              placeholder="URL da imagem"
            />
            <button
              onClick={ this.updateUserInfo }
              disabled={ btnDisabled }
              type="button"
            >
              Salvar
            </button>
          </div>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileEdit;
