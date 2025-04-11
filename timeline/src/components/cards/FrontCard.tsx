import { useState } from "react";
import { Carte } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Modal from "../modals/Modal";
import DetailsCardModal from "../modals/DetailsCardModal";

export default function FrontCard({ card }: { card: Carte }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="bg-[#E5ECF4] rounded-2xl shadow-lg text-black flex flex-col items-center justify-start gap-2 text-sm w-52 h-60 text-center">
      <div className="bg-[#2D2DA0] font-semibold rounded-t-2xl py-2 mt-0 text-white w-full overflow-hidden whitespace-nowrap text-ellipsis">
        {card.thematique}
      </div>

      <div className="bg-[#E63946] font-semibold rounded-2xl py-1 mb-1 text-white w-16">
        {card.date}
      </div>

      <div className="font-bold text-center text-[#E63946] break-words limit-lines text-base pb-1 whitespace-normal mx-0.5">
        {card.titre}
      </div>

      <p className="italic text-[#E63946] w-full overflow-hidden whitespace-nowrap text-ellipsis">
        {card.type}
      </p>

      <button
        className="group flex items-center bg-[#2D2DA0] text-white font-semibold rounded-full overflow-hidden transition-all duration-300 h-8 w-9 hover:w-40 px-2 mb-2"
        onClick={() => setShowModal(true)}
      >
        <FontAwesomeIcon icon={faCircleInfo} className="text-lg mr-3" />
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap cursor-pointer">
          Description
        </span>
      </button>
      {showModal && (
        <Modal>
          <DetailsCardModal card={card} onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  );
}
