import React from "react";
import { Link } from "react-router-dom";
import { getUser } from "../services/userAPI";

import "../style/Profile.css";

import placeholderProfilePicture from "../assets/placeholder-profile-picture.png";

import Header from "../components/Header";
import LoadingScreen from "../components/LoadingScreen";

class Profile extends React.Component {
  state = {
    isLoading: false,
    profileInfo: {},
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const data = await getUser();
    this.setState({
      profileInfo: data,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, profileInfo } = this.state;
    return (
      <div>
        <Header />
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <div className="profile__container">
            <h2>Perfil</h2>
            <div className="profile-picture__container">
              <div className="picture__container">
                <img
                  src={
                    JSON.parse(localStorage.getItem("user")).image === ""
                      ? placeholderProfilePicture
                      : profileInfo.image
                  }
                  alt={profileInfo.name}
                  className={
                    JSON.parse(localStorage.getItem("user")).image === ""
                      ? undefined
                      : "picture__container--img-shadow"
                  }
                />
              </div>
            </div>
            <div className="profile-info__container">
              <h4>Nome</h4>
              <p>{profileInfo.name}</p>
              <h4>E-mail</h4>
              <p>{profileInfo.email}</p>
              <h4>Descrição</h4>
              <p>{profileInfo.description}</p>
            </div>
            <div className="profile-edit-button__container">
              <Link to="/profile/edit">
                <button type="button" className="edit-profile-button">
                  Editar perfil
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
