import React, { Component } from 'react';
import './App.css';
import MemeCard from './components/Main/memecard/memecard';
import Header from './components/Header/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Header />

       <MemeCard />
       
      </div>
    );
  }
}

export default App;
