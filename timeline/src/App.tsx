// src/App.tsx
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Accueil from './Accueil';
import Game from './game';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
