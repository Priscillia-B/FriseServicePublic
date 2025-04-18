// src/pages/Game.tsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import fetchData from "../api";
import { Carte, Joueur } from "../types";
import { TimelineBoard } from "../components/TimelineBoard";
import Modal from "../components/modals/Modal";
import ExitGameModal from "../components/modals/ExitGameModal";
import BackCard from "../components/cards/BackCard";
import VictoryModal from "../components/modals/VictoryModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faSpinner);

import {
  faBalanceScale,
  faHeartbeat,
  faHouse,
  faGraduationCap,
  faShieldHalved,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

export default function Game() {
  const location = useLocation();
  // Récupération de nbPlayers et nbPoints depuis Accueil (avec des valeurs par défaut)
  const { nbPlayers = 2, nbPoints = 5 } =
    (location.state as { nbPlayers: number; nbPoints: number }) || {};

  // Initialisation des joueurs (score initial = 0)
  const [players, setPlayers] = useState<Joueur[]>(() => {
    const arr: Joueur[] = [];
    for (let i = 0; i < nbPlayers; i++) {
      arr.push({ id: i, pv: nbPoints });
    }
    return arr;
  });

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [deck, setDeck] = useState<Carte[]>([]);
  const [placedCards, setPlacedCards] = useState<Carte[]>([]);
  const [tempIndex, setTempIndex] = useState<number | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [winnerId, setWinnerId] = useState<number>(-1); // null si pas encore de gagnant
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [exitOpen, setExitOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchData()
      .then((data) => {
        console.log("Data fetched:", data);
        // Choix aléatoire d'un index pour la première carte
        const firstCardIndex = Math.floor(Math.random() * data.length);

        // Placement manuel de la première carte
        const firstCard = data[firstCardIndex];
        const remainingDeck = [...data];
        remainingDeck.splice(firstCardIndex, 1);
        setDeck(remainingDeck);
        setPlacedCards([firstCard]);

        setCurrentCardIndex(Math.floor(Math.random() * data.length));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors de fetchData :", err);
        setLoading(false);
      });
  }, []);

  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);

  const handleTempClick = (indexTo: number) => {
    setTempIndex(indexTo);
  };

  // Récupère la carte courante (selon l'index courant, comme dans votre code de base)
  const getCurrentCard = () => {
    return deck[currentCardIndex];
  };

  // Passe au joueur suivant de manière circulaire dont le score actuel n'est pas 0
  const nextPlayer = () => {
    setCurrentPlayerIndex((prev) => {
      let nextIndex = (prev + 1) % nbPlayers;
      let activePlayers = players.filter((p) => p.pv > 0).length;
      console.log("Active players:", activePlayers);

      // Si un seul joueur reste actif, il gagne
      if (activePlayers === 1) {
        const remainingPlayer = players.find((p) => p.pv > 0);
        console.log("Remaining player:", remainingPlayer);
        setWinnerId(remainingPlayer ? remainingPlayer.id : -2); //Si ça fait -2, c'est pas normal
        setShowVictoryModal(true);
        return prev;
      }

      // Trouver le prochain joueur actif
      while (players[nextIndex].pv <= 0) {
        nextIndex = (nextIndex + 1) % nbPlayers;
      }
      return nextIndex;
    });
  };

  // Logique de placement
  const handlePlaceCard = () => {
    if (tempIndex === undefined) {
      console.error("Temp index is undefined");
      return;
    }
    const cardToPlace = getCurrentCard();
    const newDeck = [...deck];
    newDeck.splice(currentCardIndex, 1);
    setDeck(newDeck);

    const newPlacedCards = [...placedCards];
    const insertIndex = newPlacedCards.findIndex(
      (card) => card.date > cardToPlace.date
    );
    if (insertIndex === -1) {
      newPlacedCards.push(cardToPlace);
    } else {
      newPlacedCards.splice(insertIndex, 0, cardToPlace);
    }
    setPlacedCards(newPlacedCards);
    setCurrentCardIndex(Math.floor(Math.random() * newDeck.length));
    setTempIndex(undefined);

    // Mettre à jour les vies : si tempIndex est incorrect, diminuer les vies
    const updatedPlayers = [...players];
    if (
      tempIndex !==
      (insertIndex === -1 ? newPlacedCards.length - 1 : insertIndex)
    ) {
      updatedPlayers[currentPlayerIndex].pv--;
    }
    setPlayers(updatedPlayers);

    // Vérifier si toutes les cartes sont épuisées
    if (newDeck.length === 0) {
      const maxScore = Math.max(...updatedPlayers.map((p) => p.pv));
      const winners = updatedPlayers.filter((p) => p.pv === maxScore);
      if (winners.length === 1) {
        setWinnerId(winners[0].id);
        setShowVictoryModal(true);
      } else {
        // Possibilité de créer un Modal en cas d'égalité
        setWinnerId(winners[0].id);
        setShowVictoryModal(true);
      }
      return;
    }

    // Passer au joueur suivant
    nextPlayer();
  };

  return (
    <div className="flex flex-col items-center bg-[#cfd8e8] h-screen pt-10 relative">
      {/* Icônes de fond réparties sur toute la surface */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <FontAwesomeIcon
          icon={faBalanceScale}
          className="absolute top-10 left-10 text-6xl text-[#2D2DA0] opacity-10"
        />
        <FontAwesomeIcon
          icon={faHeartbeat}
          className="absolute top-10 right-10 text-6xl text-[#2D2DA0] opacity-10"
        />
        <FontAwesomeIcon
          icon={faHouse}
          className="absolute bottom-10 left-10 text-6xl text-[#2D2DA0] opacity-10"
        />
        <FontAwesomeIcon
          icon={faGraduationCap}
          className="absolute bottom-10 right-10 text-6xl text-[#2D2DA0] opacity-10"
        />
        <FontAwesomeIcon
          icon={faShieldHalved}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-6xl text-[#2D2DA0] opacity-10"
        />
      </div>

      <h1 className="text-5xl font-extrabold mb-12 flex justify-center space-x-4">
        <span className="text-[#2D2DA0]">Frise</span>
        <span className="text-white">Service</span>
        <span className="text-[#E63946]">Public</span>
      </h1>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-full w-full z-10">
          <p className="text-3xl text-gray-700 font-semibold mb-10">Chargement...</p>
          <FontAwesomeIcon
            icon="spinner"
            spin
            className="text-6xl text-gray-700 mb-4"
          />
        </div>
      ) : (
        <>
          <div className="mb-10 w-full max-h-30 overflow-x-auto flex flex-col items-center scrollbar-custom">
            <p className="text-xl font-semibold mb-4">Joueur courant : {currentPlayerIndex + 1}</p>
            <div className="flex gap-2 mt-2 flex-wrap justify-center">
              {players.map((p, idx) => (
                <div
                  key={p.id}
                  className={`min-w-[140px] px-4 py-2 rounded text-sm text-center whitespace-nowrap 
          ${idx === currentPlayerIndex
                      ? "bg-[#E63946] text-white font-bold shadow-xl transform transition-all duration-300 transform-origin-center" // Joueur courant sans agrandissement dynamique
                      : "bg-gray-200 text-black border-2 border-gray-400" // Autres joueurs
                    }`}
                >
                  {/* Joueur avec une bordure spéciale et un texte plus grand si c'est le joueur courant */}
                  Joueur {p.id + 1} : <span className="font-extrabold">{p.pv} vies</span>
                </div>
              ))}
            </div>
          </div>



          <TimelineBoard
            cards={placedCards}
            onTempClick={handleTempClick}
            currentCard={getCurrentCard()}
            tempIndex={tempIndex}
          />
          <div className="mt-10">
            {" "}
            <BackCard card={getCurrentCard()} />{" "}
          </div>

          <button
            onClick={handlePlaceCard}
            disabled={tempIndex === undefined}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 text-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer hover:bg-blue-600 shadow-md"
          >
            Valider
          </button>

          <button
            className="absolute top-1 right-5 text-white font-semibold bg-red-500 py-1 px-2 rounded m-4 cursor-pointer text-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-red-600 shadow-md"
            onClick={() => setExitOpen(true)}
          >
            Quitter la partie
          </button>
        </>
      )}

      {exitOpen && (
        <Modal>
          <ExitGameModal setExitOpen={setExitOpen} />
        </Modal>
      )}

      {showVictoryModal && (
        <Modal>
          <VictoryModal winnerId={winnerId + 1} />
        </Modal>
      )}
    </div>
  );
}
