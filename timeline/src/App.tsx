// src/App.tsx
import { HashRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Game from "./pages/Game";

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
