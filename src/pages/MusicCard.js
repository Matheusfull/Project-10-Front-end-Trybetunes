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

   favoriteMusic = async ({ target }) => {
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
   }

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
      /* this.verficaSeTemOId(); */
    });
  }

  favoriteMusic = async ({ target }) => {
    const { checked } = target;
    this.setState({ loading: true });
    const { objetoMusic } = this.props;
    console.log(objetoMusic);
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
