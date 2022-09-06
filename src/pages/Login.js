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
    /* Esse método eu não conhecia, de adicionar ao history o endereço para onde eu quero ir
    Hoje revisando o código vejo que fui muito menino, foi dado em aula, mas garoto novo, programando, passou batido. Hoje já sou matuto kkkk sqn kkkk */
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

/*
Requisito 2
1 - Criação padrão do input de name e botão (vale a pena já controlar os campos através das criação do estado e função que vai 'guardar' o que é digitado - a famosa handleChange):
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
  value={ user }
  onChange={ this.handleChange }

2 - Habilitação do botão é feita pelo retorno da função que verifica a quantidade de carcteres digitado no nome.

3 - Assim que eu clicar no Entrar, vamos pegar o nome que foi digitado e jogar na função createUser, porém vamos colocá-lo em um objeto {name: nome_digitado(this.state.user)}.
obs: essa função simula o funcionamento de uma API, logo vamos precisar do async/await

4 - Para dar uma senção que o nome foi salvo, vamos fazer uma renderização condicional, ou seja, ao clicarmos no Entrar mudamos o estado loading para true, salvamos o nome na createUser e depois mudamos o estado loading para false.

5- Pega a prop history do Route e encaminha para a página de pesquisa, ou seja dá um push para serach ('/serach')
*/
