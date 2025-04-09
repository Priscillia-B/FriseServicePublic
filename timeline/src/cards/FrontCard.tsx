import React from "react";
import { Carte } from "../types";

export default function Card({ card }: { card: Carte }) {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg p-6 text-white w-full max-w-md">
      <h2 className="text-xl font-bold text-center mb-4">{card.titre}</h2>

      <div className="flex flex-col gap-2 text-sm">
        <div>
          <span className="font-semibold">Thématique :</span> {card.thematique}
        </div>
        <div>
          <span className="font-semibold">Type :</span> {card.type}
        </div>
        <div>
          <span className="font-semibold">Date :</span>{" "}
          {new Date(card.date).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
