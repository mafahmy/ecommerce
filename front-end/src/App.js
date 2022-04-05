import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Slider } from "./components/Slider";
import Slider1 from "./components/Slider1";
import Categories from "./components/Categories";
import HomePage from "./screens/HomePage";
import ProductScreen from "./screens/ProductScreen";
//import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="App-header">
        <Navbar />
        {/* <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span> */}
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/product/:id" element={<ProductScreen />} />
        </Routes>
    
      
        
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
