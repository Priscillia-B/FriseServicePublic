import { Carte } from "./types";

const URL = "https://script.google.com/macros/s/AKfycbyXG-LinGad2RRm_4Gz8S30HHuv3RI1E2Q7O7NLdi6rciikMgOI_b1w37EiP1xgDYeA8A/exec";

export default async function fetchData(): Promise<Carte[]> {
    const response = await fetch(URL);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.text();
    const rows = data.split("\n").slice(1); // Skip the header row
    const cartes: Carte[] = rows.map((row, i) => {
        const [thematique,date,titre,type,detail] = row.split(",");
        return {
            id: i,
            thematique,
            type,
            titre,
            date: parseInt(date),
            detail,
        };
    });

    const filteredCartes = cartes.filter(carte => carte.titre && carte.date);

    console.log("Filtered Cartes:", filteredCartes);
    console.log("Cartes:", cartes);

    return filteredCartes;
}