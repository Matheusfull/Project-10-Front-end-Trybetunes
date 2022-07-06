import React from 'react';
import Header from './components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      album: '',
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

  render() {
    const { album } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
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
        >
          Pesquisar

        </button>
      </div>
    );
  }
}

export default Search;
