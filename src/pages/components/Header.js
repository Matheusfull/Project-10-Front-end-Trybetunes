import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.handleName();
  }

  handleName = async () => {
    /* const { user } = this.state; */
    const data = await getUser();
    /* console.log(data); */
    this.setState({ user: data.name });
    /* const { loading } = this.state; */
    this.setState({ loading: false });
    /* console.log(this.state); */
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        <Link data-testid="link-to-search" to="/search">search</Link>
        <br />
        <Link data-testid="link-to-favorites" to="/favorites">favorites</Link>
        <br />
        <Link data-testid="link-to-profile" to="/profile">profile</Link>
        {
          loading ? <Loading /> : (
            <h1 data-testid="header-user-name">{user}</h1>
          )
        }
      </header>
    );
  }
}

export default Header;
