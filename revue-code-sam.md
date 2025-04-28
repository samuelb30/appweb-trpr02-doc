# Revue de code de Samuel

### Par Dominic

## Semaine du 6 avril

**_Points positifs :_**

- Utilisation propre des interfaces TypeScript (Character, Ship, Ranking)
- Code cohérent et réutilisable pour les appels fetch
- Respect des types et usage de Ref de Vue 3

**_Points à améliorer_**

- Sam utilises les constructeurs de type (String, Number) au lieu des types primitifs (string et number) (sans les majuscules)
- Les types pourraient être refactor pour utiliser les types primitifs
- Pour éviter de répéter l’URL dans chaque fonction, on pourrait créer une instance Axios configurée :

```md
<script setup>
//Utiliser ceci pour éviter la duplication de l'url
const api = axios.create({
  baseURL: `http://${url}:${port}`,
})

//Utiliser ceci dans les url des méthodes async
const result = await api.get('/characters')
</script>
```

**_Gestion des erreurs_**

- Il n'y à pas de try catch, ce qui pourrait causé des problèmes si la ressource n'est pas disponible. Ce serait pertinent d'en rajouter.

## Semaine du 13 avril

## Composants

### App.vue

- Composant principal qui encapsule l’application avec ses éléments structurels (header, footer, fond animé, RouterView).

**_Points positifs :_**

- Structure de base claire et facile à lire.
- Très bonne séparation des responsabilités (chaque partie de la page est dans un composant distinct).
- Intégration propre de Bootstrap.

**_Points à améliorer :_**

- Ajouter un conteneur ou une classe de layout pour gérer les marges internes de la page si nécessaire.

### AnimatedBackground.vue

- Composant visuel pour le fond animé dynamique basé sur la position de la souris.

**_Points positifs :_**

- Très belle animation immersive qui enrichit l’expérience utilisateur.
- Code clair avec un bon usage de `onMounted` pour initier le comportement.
- Séparation nette entre la logique et le style.

**_Points à améliorer :_**

- Le `document.querySelector('.bg')` pourrait être remplacé par `ref` ou `template ref` de Vue pour éviter l'accès direct au DOM natif.
- Il manque un `onUnmounted` pour retirer l’écouteur `mousemove`, ce qui peut causer des fuites mémoire.

```ts
onUnmounted(() => {
  document.removeEventListener("mousemove" /* ... */)
})
```

### Footer.vue

- Composant pour afficher le pied de page de l’application.

**_Points positifs :_**

- Simple et fonctionnel.
- Respecte le design général de l'application.
- Utilise Bootstrap pour l’alignement.

**_Points à améliorer :_**

- Le positionnement `bottom: -10px` peut être imprécis selon la taille de l’écran, un `bottom: 0` ou un `padding` bien ajusté serait plus fiable.

### Header.vue

- Composant de navigation principal utilisant les routes enregistrées.

**_Points positifs :_**

- Utilisation dynamique des routes avec `router.getRoutes()` pour générer les liens de navigation.
- Bonne utilisation de Bootstrap pour la structure de la barre de navigation.
- Animation subtile sur hover qui ajoute du dynamisme.
- Le bug à bien été géré et réglé. Bravo!

**_Points à améliorer :_**

- Le style `transition: ease-out 1s;` pourrait être plus précis avec `transition: transform 0.3s ease-out;` pour une meilleure fluidité.

```css
.nav-button:hover {
  transform: scale(1.01);
  transition: transform 0.3s ease-out;
}
```

---

### Home.vue

- Vue d’accueil avec affichage du nom du jeu et bouton pour démarrer.

**_Points positifs :_**

- Interface claire et engageante.
- Bonne utilisation des classes utilitaires Bootstrap pour centrer et styliser.
- Le bouton "Jouer" est bien visible et intuitif.

**_Points à améliorer :_**

- La classe `.contentddd` semble être un reste de test ou à renommer pour la clarté. Manque de précision pour bien savoir de quoi il s'agit.

---

### router/index.ts

- Configuration des routes principales de l'application.

**_Points positifs :_**

- Routes bien nommées, ce qui permet une navigation explicite.
- Bonne organisation du fichier.
- Utilisation claire de `createWebHistory`.

**_Points à améliorer :_**

- La route `/creation-du-personnage` utilise le même composant que `/`. Pour l'instant c'est bon, mais lors du merge, il faudra modifier ceci.
- L'ajout d'un fallback ou redirection en cas de route non trouvée (404) pourrait être intéressant, mais pas nécessaire.

```ts
{
  path: '/:pathMatch(.*)*',
  redirect: '/'
}
```

---

### scripts/constants.ts

- Fichier contenant la constante du nom du jeu.

**_Point positif :_**

- Bonne pratique d’extraire les constantes dans un fichier séparé. Ça facilite la maintenance et l’évolution du projet.

```ts
export const GAME_NAME = "Super Space Balls"
```

---

### Style global

- Classes `.expandable-item` utilisées pour les effets d’interaction utilisateur.

**_Point positif :_**

- Animation fluide et discrète à l’interaction.
- Style réutilisable bien pensé.

**_Aucune amélioration nécessaire pour l’instant._**

```css
.expandable-item:hover {
  transform: scale(1.02);
  transition: ease-out 0.5s;
  background-color: rgb(187, 187, 187);
}

.expandable-item {
  transform: scale(1);
  transition: ease-out 0.5s;
}
```

---

### ScoreboardView.vue

- Vue qui redirige vers un composant unique (`Home.vue`).

**_Point positif :_**

- Implémentation simple et modulaire, permet de découpler l’interface.

**_Aucune amélioration nécessaire._**

---

### Image de background

- Image pertinante et utile pour l'ambiance du jeu.

**_Point positif :_**

- Image utile pour mettre le joueur dans l'ambiance et permet une immersion plus profonde dans le jeu.

**_Aucune amélioration nécessaire._**

## Semaine du 20 avril

### Header.vue

**_Points positifs :_**

- Bug réglé et affichage propre
- Structure HTML claire et bien organisée avec Bootstrap (`navbar`, `container-fluid`, `nav-item`).
- Style CSS simple et propre avec des effets de transition au survol (`hover`).
- L'ajout de la logique permettant d'exclure certaines routes (comme `/500` et `/game`) de l'affichage du menu est une bonne pratique pour éviter l'accès à des pages spécifiques via le header.
- La structure du code est claire et la logique d'exclusion est bien comprise dans le contexte des routes de l'application.

**_Points à améliorer_**

- Ajouter une clé unique (`:key`) dans le `v-for` pour éviter les avertissements Vue :

```vue
<template v-for="route in router.getRoutes()" :key="route.name"></template>
```

### db.json

- Rien à dire dessus. Simplement une copie de db.default.json. C'est une bonne pratique.
- Possiblité d'ajout de score qui fonctionne bien.

### App.vue

**_Points positifs :_**

**_Points positifs :_**

- Bonne utilisation de `<main>` pour structurer le contenu principal de la page.
- Application correcte des classes Bootstrap pour assurer un centrage à la fois horizontal et vertical (`d-flex`, `align-items-center`, `justify-content-center`).
- Respect des bonnes pratiques d’accessibilité en plaçant le contenu dans une balise `<main>`.

### AnimatedBackround.vue

- Rien à dire. Simple correction d'intentation et de style.

### RankingItems.vue

**_Points positifs :_**

- Utilisation propre de `defineProps` avec typage TypeScript (`Ranking`), ce qui améliore la robustesse du code.
- Structure HTML lisible pour afficher le nom et le score du joueur.
- Bon usage des classes Bootstrap (`d-flex`, `justify-content-between`, `align-items-center`, `me-2`, `mb-0`) pour un alignement élégant et responsive.

**_Points à améliorer_**

- Rien à dire. Ça semble bon dans son ensemble.

### Scoreboard.vue

**_Points positifs :_**

- Utilisation correcte de `defineProps` pour passer une liste typée (`Array<Ranking>`).
- Bonne organisation du layout avec des classes Bootstrap (`container`, `bg-white`, `bg-dark`, `rounded-top-3`, `rounded-bottom-3`).
- Utilisation du composant `RankingItem` pour une meilleure séparation des responsabilités (chaque item est géré individuellement).
- `scoped` CSS appliqué proprement pour éviter les conflits de styles globaux.

**_Points à améliorer_**

- Même problème que précédement. Dans `v-for`, il manque une clé (`:key`) pour chaque `ranking` pour optimiser le rendu et éviter des avertissements Vue :

```vue
<div class="m-2 mx-0 px-4 border border-light" v-for="ranking in rankings" :key="ranking.name">
</div>
```

### database.ts

**_Points positifs :_**

- Bonne pratique d'encapsulation d'un appel `POST` dans une fonction dédiée (`pushRanking`), ce qui rend le code plus réutilisable et clair.
- Le typage du paramètre `ranking: Ranking` assure que seules des données correctement formatées peuvent être envoyées.

**_Points à améliorer_**

- Pour une meilleure robustesse, il serait pertinent d'ajouter un bloc `try/catch` autour de l'appel `axios.post` pour capturer et traiter les erreurs réseau ou serveur :

```ts
export async function pushRanking(ranking: Ranking) {
  try {
    await axios.post(`http://${url}:${port}/ranking`, ranking)
  } catch (error) {
    console.error("Erreur lors de l'envoi du classement :", error)
    throw error
  }
}
```

### GameView

**_Points positifs :_**

- L'appel à la fonction `pushRanking` permet d'envoyer proprement les données du joueur (`name` et `score`), ce qui centralise la logique de mise à jour du classement.
- L'utilisation de `player.value.name` et `player.value.cg` montre que tu respectes la structure réactive de Vue 3 et accèdes correctement aux propriétés réactives du joueur.

**_Points à améliorer_**

- Il pourrait y avoir une gestion d'erreur avec un try catch.

### ScoreboardView.vue

**_Points positifs :_**

- Bonne utilisation de `ref` et `type Ref` pour gérer les données réactives de `rankings`.
- Le tri des `rankings` directement dans la template avec `rankings.sort()` est une bonne solution pour afficher les scores dans l'ordre décroissant.
- Le composant `Scoreboard` est bien utilisé pour afficher les classements, avec les bonnes pratiques d'injection des données via `props`.

**_Points à améliorer_**

- Rien à dire, ça semble correct.

### Gestion des appels à l'API (database.ts)

**_Points positifs :_**

- L'ajout du bloc `try/catch` pour capturer les erreurs d'API est une bonne idée.
- La redirection vers une page d'erreur (`/500?planned=true&code=503`) en cas de problème est une excellente approche pour informer le user d'un problème.
- La logique de mise à jour des classements (`pushRanking`) avec la vérification de l'existence du classement avant de faire un `DELETE` puis un `POST` assure que les données sont cohérentes et ne sont pas dupliquées dans la bd.

### ErrorView.vue

**_Points positifs :_**

- Le composant gère bien l'affichage des erreurs avec un code d'erreur et un message spécifique (`503` dans ce cas) pour informer l'utilisateur de la nature du problème.
- L'interface est claire et simple, avec un titre d'erreur grand et coloré pour attirer l'attention de l'utilisateur.
- La logique de redirection est bien pensée : si l'erreur n'est pas planifiée (`!props.planned`), l'utilisateur est renvoyé à la page d'accueil.

**_Points à améliorer_**

- Il pourrait y avoir un message d'erreur plus clair selon les cas.

## Tests

### ErrorView.vue (Tests)

**_Points positifs :_**

- **Test de redirection** : Le test pour vérifier que l'utilisateur est redirigé vers `/` si `planned` est `false` est bien implémenté.
- **Vérification du code d'erreur** : Le test qui s'assure que le bon code d'erreur est affiché est simple et efficace, vérifiant que le composant affiche correctement le message d'erreur en fonction de la valeur de `code`.
- **Test conditionnel de messages d'erreur** : Le test vérifiant la présence du message spécifique à l'erreur 503 est une bonne manière de garantir la gestion correcte de ce cas particulier. Bravo!

**_Points à améliorer_**

- **Tests supplémentaires pour `planned`** : Un test pour vérifier qu'aucune redirection n'est effectuée lorsque `planned` est `true` pourrait être utile pour garantir que le composant ne redirige pas dans ce cas.

  Exemple :

  ```ts
  it("Ne redirige pas si planned est true", () => {
    mount(ErrorView, {
      props: {
        planned: true,
        code: "500",
      },
    })
    expect(router.push).not.toHaveBeenCalled()
  })
  ```

### Tests de `Header.vue`

**_Points positifs :_**

- Test vérifiant que les routes exclues sont bien présentes dans le routage.
- Vérification que le texte du composant ne contient pas les routes exclues.

**_Améliorations possibles :_**

- Aucun point majeur à améliorer, le test est déjà assez direct et couvre les cas requis.

### Tests de `Ranking.vue`

**_Points positifs :_**

- Vérification que le titre "Tableau des scores" est affiché à l'initialisation.
- Test de tri des joueurs par score fonctionne correctement.
- Vérification que les informations des joueurs (nom et score) sont correctement affichées dans le HTML.

**_Améliorations possibles :_**

- Ajouter un test pour vérifier l'affichage des joueurs lorsque la liste est vide.
- Vérifier la gestion de cas où les scores sont égaux (ex: classement pour des scores identiques).

### Tests de `database.ts`

**_Points positifs :_**

- Vérification que `fetchCharacters` remplit correctement la liste des personnages lors d'un succès.
- Test que `fetchCharacters` redirige vers `/500` en cas d'échec.
- Test de l'ajout et de la mise à jour d'un classement avec `pushRanking` selon les conditions (nouveau joueur, meilleur score, score moins bon).
- Vérification que `fetchShips` et `fetchRankings` remplissent bien leurs listes respectives.
- Gestion correcte des erreurs avec redirection vers `/500` en cas d'erreur réseau.

**_Améliorations possibles :_**

- Tester le cas où les requêtes retournent des données vides, ou un tableau d'éléments invalides.
- Ajouter un test pour vérifier les appels API lors de la mise à jour des scores dans `pushRanking` si le joueur existe déjà.
