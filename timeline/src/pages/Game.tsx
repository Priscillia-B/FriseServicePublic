// src/pages/Game.tsx
import { useState, useEffect, useRef } from "react";
import fetchData from "../api";
import { Carte } from "../types";
import { TimelineBoard } from "../components/TimelineBoard";
import Modal from "../components/modals/Modal";
import ExitGameModal from "../components/modals/ExitGameModal";
import VictoryModal from "../components/modals/VictoryModal";

export default function Game() {
  const [deck, setDeck] = useState<Carte[]>([]);
  const [placedCards, setPlacedCards] = useState<Carte[]>([]);
  const [tempIndex, setTempIndex] = useState<number>();
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [exitOpen, setExitOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [winnerId, setWinnerId] = useState<number>(-1);
  const [showModal, setShowModal] = useState(false);
  //TODO : implémenter les joueurs et les scores

  // Temporaire (peut-être)
  const hasPlacedCard = useRef(false);

  useEffect(() => {
    setTempIndex(0);
    fetchData().then((data) => {
      console.log("Data fetched:", data);
      setDeck(data);
      setCurrentCardIndex(Math.floor(Math.random() * data.length));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (deck.length > 0 && !hasPlacedCard.current) {
      handlePlaceCard();
      hasPlacedCard.current = true;
    }
  }, [deck]);

  const handleTempClick = (indexTo: number) => {
    setTempIndex(indexTo);
  };

  //Fonction qui prend un index de carte, et transfert la carte actuelle du deck vers placedCards à l'emplacement de l'index
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
  };

  //Fonction pour récupérer la carte en cours
  const getCurrentCard = () => {
    return deck[currentCardIndex];
  };

  return (
    <div className="flex flex-col items-center bg-white min-h-screen pt-12 pb-40">
      <h1 className="text-3xl font-bold mb-8">Jeu TimeLine</h1>
      {loading ? (
        <h1 className="text-3xl font-bold mb-8">Chargement...</h1>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-8">Jeu TimeLine</h1>
          <TimelineBoard
            cards={placedCards}
            onTempClick={handleTempClick}
            currentCard={getCurrentCard()}
            tempIndex={tempIndex}
          />
          <button
            onClick={handlePlaceCard}
            disabled={tempIndex === undefined}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Valider
          </button>
        </>
      )}

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

      {/* Test victoire */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition"
      >
        Victoire
      </button>

      {showModal && (
        <Modal>
          <VictoryModal winnerId={winnerId} />
        </Modal>
      )}
    </div>
  );
}
