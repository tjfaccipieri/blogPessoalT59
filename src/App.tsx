import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  let nome = 'Thiago';
  let idade = 36;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Oi... meu nome é {nome}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
