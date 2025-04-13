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
