import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorite: false,
      musicasFavoritas: [],
    };
  }

  componentDidMount() {
    this.fetchFavoritesMusic();
  }

verficaSeTemOId = () => {
  const { trackId } = this.props;
  const { musicasFavoritas } = this.state;
  /* console.log(trackId, musicasFavoritas); */
  if (musicasFavoritas.some((music) => music.trackId === trackId)) {
    this.setState({ favorite: true });
  }
}

  fetchFavoritesMusic = async () => {
    this.setState({
      loading: true,
    }, async () => {
      const musicsFavorites = await getFavoriteSongs();
      this.setState({
        musicasFavoritas: musicsFavorites,
        loading: false,
      });
      /* const { musicasFavoritas } = this.state; */
      /* console.log(musicasFavoritas); */
      this.verficaSeTemOId();
    });
  }

  favoriteMusic = async () => {
    this.setState({ loading: true });
    const { trackId } = this.props;
    console.log(trackId);
    await addSong(trackId);
    this.setState({ loading: false, favorite: true });
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
                  id="favorita"
                  data-testid={ `checkbox-music-${trackId}` }
                  onClick={ this.favoriteMusic }
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

/* const listFavorite = await getFavoriteSongs();
    console.log(listFavorite);
    const { trackId } = this.props;
    this.setState({ favorite: listFavorite.some((music) => music.trackId === trackId) });
    this.setState({ listFavorite });
    console.log(this.state); */
