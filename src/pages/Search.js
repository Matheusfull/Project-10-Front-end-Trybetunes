import React from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      album: '',
      loading: false,
      artistaDaFetch: false,
      nomeDoArtista: '',
      listaDoAlbum: [],
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  enableSearch = () => {
    const numberMin = 1;
    const { album } = this.state;
    if (album.length > numberMin) return false;
    return true;
  }

  searchAlbum = async () => {
    this.setState({ loading: true });
    const { album } = this.state;
    /* Esaa parte do .then foi terrível, tive que ver umas PRs, pois não sabia como colocar o array da API no meu. */
    await searchAlbumsAPI(album).then((listaDoAlbum) => {
      this.setState({
        loading: false,
        artistaDaFetch: true,
        nomeDoArtista: album,
        album: '',
        listaDoAlbum,
      });
    });
    /* console.log(fetch); */
    /* this.setState({ loading: false, artistaDaFetch: true }); */
  }

  render() {
    const { album, loading, artistaDaFetch, nomeDoArtista, listaDoAlbum } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        {
          loading ? <Loading /> : (
            <>
              <label htmlFor="band">
                <input
                  type="text"
                  id="band"
                  name="album"
                  value={ album }
                  placeholder="Digite o nome da banda ou artista"
                  data-testid="search-artist-input"
                  onChange={ this.handleChange }
                />
              </label>
              <button
                data-testid="search-artist-button"
                type="button"
                disabled={ this.enableSearch() }
                onClick={ this.searchAlbum }
              >
                Pesquisar

              </button>
            </>
          )
        }
        {
          artistaDaFetch ? <p>{`Resultado de álbuns de: ${nomeDoArtista}`}</p> : ''
        }
        {
          listaDoAlbum.length > 0 ? (
            listaDoAlbum.map((music) => (
              <div key={ music.collectionId }>
                <img src={ music.artworkUrl100 } alt={ music.artistName } />
                <p>{music.collectionName}</p>
                <p>{music.artistName}</p>
                <Link
                  data-testid={ `link-to-album-${music.collectionId}` }
                  to={ `/album/${music.collectionId}` }
                >
                  Link para álbum
                </Link>
              </div>
            ))
          ) : <p>Nenhum álbum foi encontrado</p>
        }
      </div>
    );
  }
}

export default Search;

/*
Requisito 5
1 - Criação normal do formulário:
- Input de text e number
- No input de text tem a função handleChange que vai mudando o estado à medida que se digita
- A função enableSearch é responsavél por retornar true ou false dependendo da habilitação do campo input text com mais de 1 caracteres.
*/

/*
Requisito 6
1 - Ao clicar no botão de pesquisar, vamos executar a função searchAlbum
2 - Nela mudamos o loading para true a fim de fazer uma renderização condicional, ou seja, enquanto faz a requisição para trazer os álbuns, aparece na tela "carregando..."
3 - Na função assíncrona eu peguei o nome do álbum e passei como parâmetro e fiz umas alterações no state que só ocorrem depois da assincronicidade
4 - Mudei o loading para false a fim de que pare de renderizar o loading, pois os álbuns já chegaram
5 - Avisei que foi encontrado algo no requisição atraves da mudança do estado artistaDaFetch
6 - Passei o nome do artida ou da banda para outro estado (nomeDoArtista), pois o campo com o input que busca por ele precisa ser esvaziado
7 - Peguei a lista com os ĺabuns e coloquei em um array : listaDoAlbum

8 - Se nenhum álbum for encontrado para o nome pesquisado, vai aparecer que nehuma álbum foi encontrado e isso é oriundo da renderização condicional com a quantidade de  índices no array do estado  listaDoAlbum

9 - Encontrando os álbuns, vamos fazer um map para renderizar cada um deles do array. Atenção ao redicionamento, pois vamos mandar para a rota /album/:id, onde id é o collectionId de cada álbum.
*/
