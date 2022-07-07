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
                  placeholder="Digite o nome do álbum"
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
