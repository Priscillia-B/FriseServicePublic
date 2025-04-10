// src/pages/Game.tsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import fetchData from "../api";
import { Carte, Joueur } from "../types";
import { TimelineBoard } from "../components/TimelineBoard";
import Modal from "../components/modals/Modal";
import ExitGameModal from "../components/modals/ExitGameModal";
import BackCard from "../components/cards/BackCard";
import VictoryModal from "../components/modals/VictoryModal";

export default function Game() {
  const location = useLocation();
  // Récupération de nbPlayers et nbPoints depuis Accueil (avec des valeurs par défaut)
  const { nbPlayers = 2, nbPoints = 5 } =
    (location.state as { nbPlayers: number; nbPoints: number }) || {};

  // Initialisation des joueurs (score initial = 0)
  const [players, setPlayers] = useState<Joueur[]>(() => {
    const arr: Joueur[] = [];
    for (let i = 0; i < nbPlayers; i++) {
      arr.push({ id: i, score: 0 });
    }
    return arr;
  });

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [deck, setDeck] = useState<Carte[]>([]);
  const [placedCards, setPlacedCards] = useState<Carte[]>([]);
  const [tempIndex, setTempIndex] = useState<number | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [winnerId, setWinnerId] = useState<number>(-1);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [exitOpen, setExitOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchData()
      .then((data) => {
        console.log("Data fetched:", data);
        // Choix aléatoire d'un index pour la première carte
        const firstCardIndex = Math.floor(Math.random() * data.length);
        setCurrentCardIndex(firstCardIndex);

        // Placement manuel de la première carte
        const firstCard = data[firstCardIndex];
        const remainingDeck = [...data];
        remainingDeck.splice(firstCardIndex, 1);
        setDeck(remainingDeck);
        setPlacedCards([firstCard]);

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

    // Mettre à jour le score : si tempIndex correspond à l'index d'insertion correct, incrémenter le score
    const updatedPlayers = [...players];
    if (tempIndex === (insertIndex === -1 ? newPlacedCards.length - 1 : insertIndex)) {
      updatedPlayers[currentPlayerIndex].score++;
    }
    setPlayers(updatedPlayers);

    // Vérifier si le joueur courant atteint le score cible
    if (updatedPlayers[currentPlayerIndex].score >= nbPoints) {
      setWinnerId(currentPlayerIndex);
      setShowVictoryModal(true);
      return;
    }

    // S'il n'y a plus de cartes dans le deck
    if (newDeck.length === 0) {
      const maxScore = Math.max(...updatedPlayers.map((p) => p.score));
      const winners = updatedPlayers.filter((p) => p.score === maxScore);
      if (winners.length === 1) {
        setWinnerId(winners[0].id);
        setShowVictoryModal(true);
      } else {
        //Possibilité de créer un Modal en cas d'égalité
        setWinnerId(winners[0].id);
        setShowVictoryModal(true);
      }
      return;
    }

    // Passer au joueur suivant (ordre circulaire)
    setCurrentPlayerIndex((prev) => (prev + 1) % nbPlayers);
  };

  return (
    <div className="flex flex-col items-center bg-white min-h-screen pt-12 pb-40 relative">
      <h1 className="text-3xl font-bold mb-8">Jeu TimeLine</h1>
      {loading ? (
        <h1 className="text-3xl font-bold mb-8">Chargement...</h1>
      ) : (
        <>
          <div className="mb-4">
            <p className="text-lg">
              Joueur courant : {currentPlayerIndex + 1}
            </p>
            <div className="flex gap-2 mt-2">
              {players.map((p, idx) => (
                <div
                  key={p.id}
                  className={`px-4 py-2 rounded ${
                    idx === currentPlayerIndex ? "bg-blue-200" : "bg-gray-200"
                  }`}
                >
                  Joueur {p.id + 1} : {p.score} points
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
          <BackCard card={getCurrentCard()} />
          <button
            onClick={handlePlaceCard}
            disabled={tempIndex === undefined}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4" >Valider</button>
        

          <button
            className="absolute top-0 left-0 text-white font-semibold bg-red-500 py-1 px-2 rounded m-4 cursor-pointer"
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
          <VictoryModal winnerId={winnerId} />
        </Modal>
      )}
    </div>
  );
}
