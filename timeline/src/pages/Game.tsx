// src/pages/Game.tsx
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import fetchData from "../api";
import { Joueur, Carte } from "../types";
import { TimelineBoard } from "../components/TimelineBoard";
import Modal from "../components/modals/Modal";
import ExitGameModal from "../components/modals/ExitGameModal";

export default function Game() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Récupérer nbPlayers et nbPoints depuis Accueil (avec des valeurs par défaut si absents)
  const { nbPlayers = 2, nbPoints = 5 } =
    (location.state as { nbPlayers: number; nbPoints: number }) || {};

  // Initialiser le tableau de joueurs
  const [players, setPlayers] = useState<Joueur[]>(() => {
    const arr: Joueur[] = [];
    for (let i = 0; i < nbPlayers; i++) {
      arr.push({ id: i, score: 0 });
    }
    return arr;
  });

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [deck, setDeck] = useState<Carte[]>([]);
  const [placedCards, setPlacedCards] = useState<Carte[]>([]);
  const [tempIndex, setTempIndex] = useState<number | undefined>();
  const [exitOpen, setExitOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Pour garantir une première pose automatique
  const hasPlacedCard = useRef(false);

  useEffect(() => {
    fetchData()
      .then((data) => {
        console.log("Data fetched:", data);
        setDeck(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors de fetchData :", err);
        setLoading(false);
      });
  }, []);

  // Pose automatique d'une première carte si le deck est chargé
  useEffect(() => {
    if (deck.length > 0 && !hasPlacedCard.current) {
      handlePlaceCard();
      hasPlacedCard.current = true;
    }
  }, [deck]);

  // Met à jour la position temporaire (lorsqu'un joueur choisit un emplacement)
  const handleTempClick = (indexTo: number) => {
    setTempIndex(indexTo);
  };

  // On fixe la carte courante à la première du deck
  const getCurrentCard = () => {
    return deck[0];
  };

  // Logique de placement de carte et gestion du score
  const handlePlaceCard = () => {
    if (tempIndex === undefined) {
      console.error("Temp index is undefined");
      return;
    }
    const cardToPlace = getCurrentCard();
    // Retirer la carte du deck (toujours la première)
    const newDeck = [...deck];
    newDeck.splice(0, 1);
    setDeck(newDeck);

    // Calculer la position correcte dans placedCards, en fonction de la date
    const newPlacedCards = [...placedCards];
    let correctIndex = newPlacedCards.findIndex((card) => card.date > cardToPlace.date);
    if (correctIndex === -1) {
      correctIndex = newPlacedCards.length;
    }
    newPlacedCards.splice(correctIndex, 0, cardToPlace);
    setPlacedCards(newPlacedCards);

    // Si la position choisie par le joueur (tempIndex) correspond à l'index correct, incrémenter le score
    const updatedPlayers = [...players];
    if (tempIndex === correctIndex) {
      updatedPlayers[currentPlayerIndex].score++;
    }
    setPlayers(updatedPlayers);
    setTempIndex(undefined);

    // Vérifier si le joueur courant a atteint le nombre de points cible
    if (updatedPlayers[currentPlayerIndex].score >= nbPoints) {
      alert(`Le joueur ${currentPlayerIndex + 1} remporte la partie !`);
      navigate("/"); // Fin de partie, redirection vers l'accueil (ou autre logique)
      return;
    }

    // Si plus de cartes dans le deck, déterminer le gagnant
    if (newDeck.length === 0) {
      const maxScore = Math.max(...updatedPlayers.map((p) => p.score));
      const winners = updatedPlayers.filter((p) => p.score === maxScore);
      if (winners.length === 1) {
        alert(`Le joueur ${winners[0].id + 1} remporte la partie !`);
      } else {
        alert(`Égalité entre les joueurs : ${winners.map((w) => w.id + 1).join(", ")}`);
      }
      navigate("/");
      return;
    }

    // Passer au joueur suivant (en ordre circulaire)
    setCurrentPlayerIndex((prev) => (prev + 1) % nbPlayers);
  };

  return (
    <div className="flex flex-col items-center bg-white min-h-screen pt-12 pb-40 relative">
      <h1 className="text-3xl font-bold mb-8">Jeu TimeLine</h1>
      {loading ? (
        <h1 className="text-3xl font-bold mb-8">Chargement...</h1>
      ) : (
        <>
          {/* Scoreboard et joueur courant */}
          <div className="mb-4">
            <p className="text-lg">Joueur courant : {currentPlayerIndex + 1}</p>
            <div className="flex gap-2 mt-2">
              {players.map((p, idx) => (
                <div
                  key={p.id}
                  className={`px-4 py-2 rounded ${idx === currentPlayerIndex ? "bg-blue-200" : "bg-gray-200"}`}
                >
                  Joueur {p.id + 1} : {p.score} points
                </div>
              ))}
            </div>
          </div>

          {/* Affichage de la timeline avec toutes les cartes placées */}
          <TimelineBoard
            cards={placedCards}
            onTempClick={handleTempClick}
            currentCard={getCurrentCard()}
            tempIndex={tempIndex}
          />

          {/* Bouton pour valider le placement */}
          <button
            onClick={handlePlaceCard}
            disabled={tempIndex === undefined}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Valider
          </button>
        </>
      )}

      {/* Bouton pour quitter la partie */}
      <button
        className="absolute top-0 left-0 text-white font-semibold bg-red-500 py-1 px-2 rounded m-4 cursor-pointer"
        onClick={() => setExitOpen(true)}
      >
        Quitter la partie
      </button>

      {exitOpen && (
        <Modal>
          <ExitGameModal setExitOpen={setExitOpen} />
        </Modal>
      )}
    </div>
  );
}
