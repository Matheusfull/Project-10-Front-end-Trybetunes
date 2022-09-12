import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorite: false,
      /* musicasFavoritas: [], */
    };
  }

  async componentDidMount() {
    this.fetchFavoritesMusic();
    const musics = await getFavoriteSongs();
    const { trackId } = this.props;
    this.setState({ favorite: musics.find((music) => music.trackId === trackId) });
  }

  /* favoriteMusic = async ({ target }) => {
     const { checked } = target;
     console.log(checked);
     const { objetoMusic } = this.props;
     this.setState({ loading: true, favorite: checked });
     if (!checked) {
       await removeSong(objetoMusic);
     } else {
       await addSong(objetoMusic);
     }
     this.setState({ loading: false });
   } */

  /* verficaSeTemOId = () => {
    const { trackId } = this.props;
    const { musicasFavoritas } = this.state;
    console.log(trackId, musicasFavoritas);
    if (musicasFavoritas.find((music) => music.trackId === trackId)) {
      this.setState({ favorite: true });
    }
  } */

  fetchFavoritesMusic = async () => {
    this.setState({
      loading: true,
    }, async () => {
      const musicsFavorites = await getFavoriteSongs();
      this.setState({
        musicasFavoritas: musicsFavorites,
        loading: false,
      });
      const { musicasFavoritas } = this.state;
      console.log(musicasFavoritas);
      // this.verficaSeTemOId();
    });
  }

  favoriteMusic = async ({ target }) => {
    const { checked } = target;
    // console.log(checked);
    this.setState({ loading: true });
    const { objetoMusic } = this.props;
    // console.log(objetoMusic);
    /* console.log(nodeValue); */
    if (!checked) {
      await removeSong(objetoMusic);
    } else {
      await addSong(objetoMusic);
      /* console.log(nodeValue); */
    }
    this.setState({ loading: false, favorite: checked });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { favorite, loading } = this.state;
    /* const { listMusic } = this.props;
    console.log(listMusic); */
    /* const array = listMusic.filter((music, index) => index !== 0 && music); */
    /* console.log(array); */
    return (
      <>
        <p>Músicas...</p>
        <div key={ trackName }>
          {/* <img src={ music.artworkUrl100 } alt={ music.artistName } /> */}
          <p>{trackName}</p>
          {/* <p>{music.collectionName}</p>
          <p>{music.trackName}</p> */}
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
          {
            loading ? <Loading /> : (
              <label htmlFor="favorita">
                Favorita
                <input
                  type="checkbox"
                  id={ trackId }
                  data-testid={ `checkbox-music-${trackId}` }
                  onChange={ this.favoriteMusic }
                  checked={ favorite }
                />
              </label>
            )
          }
        </div>
      </>
    );
  }
}

MusicCard.propTypes = {
  /* listMusic: PropTypes.arrayOf.isRequired, */
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;

MusicCard.propTypes = {
  objetoMusic: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

/* const listFavorite = await getFavoriteSongs();
console.log(listFavorite);
const { trackId } = this.props;
this.setState({ favorite: listFavorite.some((music) => music.trackId === trackId) });
this.setState({ listFavorite });
console.log(this.state); */

/*
Requisito 7
7 - vai receber as props trackName, previewUrl. Aquela vai renderizar o nome do artista ou banda e esta será o endereço para tocar a música por 30 segundos.
*/

/*
Requisito 8
1 - Vamos criar um input do tipo checkbox e ele receberá através de props o trackId oriundo da simulação de API da função getMusics. Isso na verdade serve para passar no teste da trybe para ver se está fazendo o projeto certinho
2 - Nesse input, teremos a função favoriteMusic que faz:
-- 1 - Pegaremos o checked para saber se aquela música foi clicada como favorita ou não, usaremos então o target
-- 2 - Colocaremos o loading true para indicar a renderização condicional.
-- 3 - Traz o objeto com todas as infomações da música clicada com o fim de ser favoritada. Esse objeto será recuperado por uma props que vem lá do componente Albúm e essas música vem da simulação de uma requisição feita ajuda do id que fica na URL.
-- 4 - Lembra do passo 2.1 de pegar o checked para saber se a música foi clicada com a intenção de ser favoritada ? Então, se ele não foi clicada para ser favoritada, usaremos a função removeSong como parâmetro essa mśuica. Caso contrário, se ela for clicada como favoritada, usaremos a função addSong como parâmetro essa mesma música.
-- 5 -Voltaremos o loadingo para false a fim de que o loading pare de ser renderizado.
*/

/*
Requisito 9
1 - Vamos colocar a lógica do requisito 9 no componentDidMount, pois a músicas favoritadas deverão aparecer assim que o componente for montado.
2 - Pegaremos todas as músicas daquele artista/álbum que foram favoritadas, atrvés da função getFavoriteSongs() e pegaremos trackId da música clicada. Se o id da música clicada for igual a algum id da lista de  mśuicas favoritadas, então o estado favorite muda para true.
----const musics = await getFavoriteSongs();
    const { trackId } = this.props;
    this.setState({ favorite: musics.find((music) => music.trackId === trackId) });
*/

/*
Requisito 10

1 - Assim que o componente for montado, vamos trazer a lista de músicas favoritadas pela função assíncrona fetchFavoritesMusic
2 - Nessa função, ela vai mudar apenas o estado para modificar o loading e para atualizar as músicas favoritadas.
3 - Mudamos o estado de loading para true e isso garante que a callback assíncrona vai pegar as músicas atualizadas pela função getFavoriteSongs, jogar no estado musicasFavoritas e mudar o loading para false.
*/
