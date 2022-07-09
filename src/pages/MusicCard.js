import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { listMusic } = this.props;
    const array = listMusic.filter((music, index) => index !== 0 && music);
    console.log(array);
    return (
      <>
        <p>Músicas...</p>
        {
          array.length > 0 ? (
            array.map((music) => (
              <div key={ music.trackName }>
                {/* <img src={ music.artworkUrl100 } alt={ music.artistName } /> */}
                <p>{music.artistName}</p>
                <p>{music.collectionName}</p>
                <p>{music.trackName}</p>
                <audio data-testid="audio-component" src={ music.previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  {' '}
                  <code>audio</code>
                  .
                </audio>
              </div>
            ))
          ) : <p>Nenhuma músic foi encontrada</p>
        }
      </>
    );
  }
}

MusicCard.propTypes = {
  listMusic: PropTypes.arrayOf.isRequired,
};

export default MusicCard;
