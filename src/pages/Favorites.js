import React from 'react';
import Header from './components/Header';

class Favorite extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1> Favorite</h1>
      </div>
    );
  }
}

export default Favorite;
