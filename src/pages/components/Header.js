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
      <header data-testid="header-component" className="header">
        <div className="header_user">
          {
            loading ? <Loading /> : (
              <h1 data-testid="header-user-name">{user}</h1>
            )
          }
        </div>
        <div className="header_links">
          <Link data-testid="link-to-search" to="/search">search</Link>
          <br />
          <Link data-testid="link-to-favorites" to="/favorites">favorites</Link>
          <br />
          <Link data-testid="link-to-profile" to="/profile">profile</Link>
        </div>
      </header>
    );
  }
}

export default Header;

/*
Requisito 3
Vamos trazer o nome que foi digitado e colocar no header
1 - Usaremos a função getUser que simula o funcionamento de uma API, logo precisaremos do async/await
2 - Com o nome em 'mãos' vamos colocá-lo no estado a fim de que possamos recuperar lá no render e ser exibido na tela, noatributo de data-testid="header-user-name". Portanto criaremos um estado, cujo nome será user, e colocaremos a informação vinda da getUser nele.
3 - Enquanto a informação com o nome vem, precisa aparecer o loading..., logo vamos fazer uma renderização condicional. Nessa função que traz o nome, vamos de inicio colocar o estado do loadingo como true e depos que o nome chegar, mudaremos o estado para false, com isso a renderização estará parcialmente pronta.
4 - Afunção está perfeita, traz o nome e faz a mudança de estado do loading para que ocorra a renderização condicional, porém onde ela é chamada ??? kkkkkk
Isso tudo tem que acontecer quando a tela for montada, depois que tudo for organizado, ai as informações poderão ser expostas, logo, usaremos essa função getUser no COMPONENTDIDMOUNT...
*/

/*
Requisito 4
Dentro do componente Header teremos três link para redirecionamento para pesquisa, favoritas e perfil. Mole, só fazer os link com o endereço (to="/... e o endereço que você quer, que foi colocado lá no App.js, as rotas para cada componente")
*/
