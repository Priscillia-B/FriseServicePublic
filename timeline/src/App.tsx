import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Accueil from './Accueil'

function App() {

  return (
    <>
     <HashRouter>
        <Routes>
          <Route path="/" element={<Accueil />} />
          {/* <Route path="/game" element={<Game />} /> */}
        </Routes>
     </HashRouter>
    </>
  )
}

export default App;
