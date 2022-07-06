import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
/* import { useHistory } from 'react-router-dom' */

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  isSaveButtonDisabled = () => {
    const { user } = this.state;
    const numberMin = 2;
    /* console.log(user.length); */
    if (user.length > numberMin) return false;
    return true;
  }

  handleClick = async () => {
    this.setState({ loading: true });
    const { user } = this.state;
    await createUser({ name: user });
    this.setState({ loading: false });
    const { history } = this.props;
    history.push('/search');
    /* Esse método eu não conhecia, de adicionar ao history o endereço para onde eu quero ir */
  }

  render() {
    const { user, loading } = this.state;
    /* if (loading) return <Loading />; */
    return (
      <div data-testid="page-login">
        {
          loading ? <Loading /> : (
            <>
              <h1> Login </h1>
              <form>
                <label htmlFor="name">
                  Nome:
                  <input
                    id="name"
                    type="text"
                    name="user"
                    value={ user }
                    data-testid="login-name-input"
                    onChange={ this.handleChange }
                  />
                </label>
                <button
                  type="button"
                  data-testid="login-submit-button"
                  disabled={ this.isSaveButtonDisabled() }
                  onClick={ this.handleClick }
                >
                  Entrar
                </button>
              </form>

            </>
          )
        }

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
