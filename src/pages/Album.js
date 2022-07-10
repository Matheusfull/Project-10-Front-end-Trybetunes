import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      listMusic: [],
      artistName: '',
      collectionName: '',
    };
  }

  componentDidMount() {
    this.musicsOfAlbum();
  }

  musicsOfAlbum = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const musics = await getMusics(id);
    /* console.log(musics); */
    this.setState({
      listMusic: musics,
      artistName: musics[0].artistName,
      collectionName: musics[0].collectionName,
    });
    /* console.log(this.state.listMusic[0].artistName); */
    /* console.log(this.state); */
  }

  render() {
    /* console.log(this.props.match.params); */
    const { artistName, collectionName, listMusic } = this.state;
    /* console.log(listMusic); */
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        <p data-testid="artist-name">{ artistName}</p>
        <p data-testid="album-name">{ collectionName}</p>
        {
          listMusic.filter((music, index) => index !== 0 && music)
            .map((music, index) => (
              <MusicCard
                key={ index }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                listMusic={ listMusic }
              />
            ))
        }
        {/* <MusicCard listMusic={ listMusic } /> */}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
export default Album;
