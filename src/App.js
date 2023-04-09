import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

import { createUser } from './services/userAPI';

class App extends React.Component {
  state = {
    loginNameInput: '',
    isLoading: false,
    isLoggedIn: false,
  };

  handleChange = (event) => {
    this.setState({
      loginNameInput: event.target.value,
    });
  };

  handleLogInBtn = () => {
    const { loginNameInput } = this.state;
    this.setState(() => ({
      isLoading: true,
    }), () => createUser({ name: loginNameInput })
      .then(() => this.setState({ isLoggedIn: true })));
  };

  render() {
    const { loginNameInput, isLoading, isLoggedIn } = this.state;

    return (
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/search" /> : <Login
            loginNameInput={loginNameInput}
            handleChange={this.handleChange}
            handleLogInBtn={this.handleLogInBtn}
            isLoading={isLoading}
          />}
        </Route>
        <Route exact path="/album/:id" component={Album} />
        <Route exact path="/favorites" component={Favorites} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profile/edit" component={ProfileEdit} />
        <Route exact path="/search" component={Search} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default App;
