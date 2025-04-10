
# T4

- **Nom du groupe** : Timeliners
- **Membres du groupe** : Samuel Chanal, Nathan Bowman, priscilia Brucker, Clémence Boucher
- **Liens vers les évaluations T4** :
  - lien 1
  - lien 2

## Instructions de fork

- Forker ce dépôt
- Le nommer du code complet du groupe t4
- Ajouter le lien dans le doc des groupes
- Supprimer les instructions de fork du README.md

---

## Présentation du projet

Frise Service Public est une application web ludique et pédagogique dans laquelle les joueurs construisent une frise chronologique à partir d’événements liés à l’histoire des services publics en France.

## Captures d'écran

_(À insérer)_

## Procédures d'installation et d'exécution

- Cloner le dépôt
- Lancer l’application avec `npm install && npm run dev`
- Accès à l'application via navigateur : `http://localhost:5173` (ou autre selon config)

---

## Cahier des charges

### Objectifs pédagogiques

- **Connaître les grands moments du service public**  
  Découvrir l’évolution des institutions et services publics dans l’histoire de France.
- **Comprendre la temporalité historique**  
  Placer correctement un événement dans une chronologie.
- **Identifier les acteurs publics**  
  Associer chaque événement à un domaine ou un acteur du service public.

#### Objectifs pédagogiques avancés

- Relier un événement à un contexte historique plus large.
- Savoir expliquer un placement de carte.
- Jouer en coopération ou en opposition autour d'une culture historique.

#### Références

- [CSV source](https://docs.google.com/spreadsheets/d/e/2PACX-1vQlzxMUajqLjmCZ_I-NAie0g-ZxTsJqjOnj6R-w139EnpG-XY3DTJ4Hg5iTtzgnfQmSxJnhu0Tl502b/pub?gid=1517720865&single=true&output=csv)

---

## Description des fonctionnalités

### Simulation

- Début de partie avec une carte initiale sur la frise
- Tirage d'une carte à placer dans l’ordre chronologique
- Vérification de la validité du placement :
  - Si bon : le joueur marque un point
  - Si faux : la carte est replacée correctement, pas de point

- Fin de partie si score atteint ou toutes les cartes jouées

### Interface

- Frise centrale affichant les cartes placées
- Carte à jouer visible en bas de l’écran
- Boutons de placement (« + ») entre les cartes
- Bouton Valider pour confirmer le choix
- Scoreboard temps réel
- Paramètres de partie (nb de joueurs, score à atteindre)

### Actions du joueur

- Piocher une carte
- Choisir son emplacement
- Valider son placement

---

### Scénarios

- Mode classique (joueurs en opposition)
- Mode pédagogique (avec explications après validation)

---

### Contraintes de développement

- Application web responsive
- Lecture des données depuis un fichier CSV distant
---

### Fonctionnalités et scénarios avancés

- Multilingue
- Classements en ligne
- Mode enseignant avec éditeur de cartes
- Version Mobile
- Mode thématique (cartes d’un seul secteur)
