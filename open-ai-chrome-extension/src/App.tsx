import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    exampleRequest();
  }, []);

  const exampleRequest = async () => {
    const response = await fetch('http://localhost:3002/highlights');
    console.log(response);
    const body = await response.json();
    console.log(body);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edita <code>src/App.tsx</code> and save to reload.
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
