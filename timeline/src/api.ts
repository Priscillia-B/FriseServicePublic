import { Carte } from "./types";

const URL = "https://script.google.com/macros/s/AKfycbyPKW_hoThXNBeT8jwYU6k7oGMlYqVIFv0QYPPzZii-p9BAk_iyau538yEEFOB5QKq63w/exec";

export default async function fetchData(): Promise<Carte[]> {
    const response = await fetch(URL);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.text();
    const rows = data.split("µ").slice(1); // Skip the header row
    const cartes: Carte[] = rows.map((row, i) => {
        const [thematique,date,titre,type,detail] = row.split("§");
        const temp = date.match(/\b\d{4}\b/);
        return {
            id: i,
            thematique,
            type,
            titre,
            date: temp ? parseInt(temp[0]) : 0,
            detail,
        };
    });

    const filteredCartes = cartes.filter(carte => carte.titre && carte.date);

    return filteredCartes;
}