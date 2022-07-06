import React from 'react';
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
    console.log(data);
    this.setState({ user: data.name });
    /* const { loading } = this.state; */
    this.setState({ loading: false });
    console.log(this.state);
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
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
