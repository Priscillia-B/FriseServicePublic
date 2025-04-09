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
