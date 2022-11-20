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
        <div className="album_musics">
          <div className="album_info">
            <h1>Album</h1>
            <p data-testid="artist-name">{ artistName}</p>
            <p data-testid="album-name">{ collectionName}</p>
          </div>
          <div className="musics">
            {
              listMusic.filter((music, index) => index !== 0 && music)
                .map((music, index) => (
                  <MusicCard
                    key={ index }
                    trackName={ music.trackName }
                    previewUrl={ music.previewUrl }
                    trackId={ music.trackId }
                    /* listMusic={ listMusic } */
                    objetoMusic={ music }
                  />
                ))
            }
          </div>
        </div>
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

/*
Requisito 7
1 - A função  collectionId, usa a getMusics que vamos pegar o id do álbum na URL por meio dos this.props.match.parms.id e jogar como parâmetro da getMusics.
2 - Vindo as músicas da getMusics com o parâmetro passado, vamos pegar esse array e jogar no estado listMusic. O primeiro índice do array é apenas informativo, para pegarmos o nome do artista e coleção.
3 - Como não vamos chamar em função em nenhum click ou onchange, essas músicas aparecerão após a telar ser montada, portanto a função collectionId será chamada no componentDidMount.
4 - Vamos renderizar o nome do artista e da coleção nos parágrafos
5 - Vamos listar as músicas, porém cuidado: vamos fazer um filtro para passar todos os índices do array, exceto o primeiro[0] listMusic.filter((music, index) => index !== 0 && music)
6 - Agora sim podemos fazer um map para o componente MusicCard, passando como props o trackName, previewUrl, trackId e objetoMusic.
*/
