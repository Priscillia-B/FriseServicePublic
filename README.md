# T4

- **Nom du groupe** : Undefined
- **Membres du groupe** : Samuel Chanal, Nathan Bowman, Priscillia Brucker, Clémence Boucher
- **Liens vers les évaluations T4** :
  - [Abdullah Nezami](evaluations-T2/evaluation-Abdullah_Nezami.md)
  - [Emre Sen](evaluations-T2/evaluation-Emre_Sen.md)
  - [Jules Wolff-Walk](evaluations-T2/evaluation-Jules_Wolff-Walk.md)
  - [Lohan Marchand](evaluations-T2/evaluation-Lohan_Marchand.md)
  - [Maoni Waldmann](evaluations-T2/evaluation-Maoni_Waldmann.md)
  - [Patrik Skâla](evaluations-T2/evaluation-Patrik_Skâla.md)
  - [Valentin Petit](evaluations-T2/evaluation-Valentin_Petit.md)

## Présentation du projet

Frise Service Public est une application web ludique et pédagogique dans laquelle les joueurs construisent une frise chronologique à partir d’événements liés à l’histoire des services publics en France.

Les cartes sont générées dynamiquement à partir [d'un Google Sheet](https://docs.google.com/spreadsheets/d/1flhwZlPYWQPWKSotmz7wDzBZnBYAL5JJHu_-vY38zcg/edit?gid=1517720865#gid=1517720865), permettant d'en ajouter ou de les modifier facilement, et transformé en CSV lisible par l'application [via un Google Script](https://script.google.com/d/1gwuul7SrT2ylcgBz2yme4bP4STouFFODZZVs17BmSuCBu98P3qJIIJen/edit?usp=sharing).

## Captures d'écran

_(À insérer)_

## Procédures d'installation et d'exécution

- Jouer directement : https://priscillia-b.github.io/FriseServicePublic/

Ou

(**Prérequis** : avoir npm sur sa machine)

- Cloner le dépôt
- Se placer dans [timeline/](timeline/)
- Lancer l’application avec `npm install && npm run dev`
- Accès à l'application via navigateur : `http://localhost:5173` (ou autre selon config)

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

## Description des fonctionnalités

### Simulation

- Début de partie avec une carte initiale sur la frise
- Tirage d'une carte à placer dans l’ordre chronologique
- Vérification de la validité du placement :

  - Si bon : ça passe au prochain joueur sans perte de point de vie.
  - Si faux : la carte est replacée correctement, perte d'un point de vie.

- Fin de partie si les points de vies de tout les joueurs sauf 1 atteint 0 ou toutes les cartes jouées

### Interface

- Frise centrale affichant les cartes placées
- Carte à jouer visible en bas de l’écran
- Boutons de placement (« + ») entre les cartes
- Bouton Valider pour confirmer le choix
- Scoreboard temps réel
- Paramètres de partie (nb de joueurs, score à atteindre)
- Bouton pour quiter la partie en cours

### Actions du joueur

- Piochage automatique une carte
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
