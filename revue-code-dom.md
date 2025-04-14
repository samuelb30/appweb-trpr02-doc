# Revue du code de Dominic

### Par Samuel

## Semaine du 6 avril

**_Points positifs :_**

- Code compréhensible et bien structuré
- Malgré la qualité de l'interface, il reste "<i>user friendly</i>"
- Respect des types et usage de Ref de Vue 3

**_Points à améliorer_**

- Le v-if pour les erreurs pourrait être enlever, car errors.value.[l'objet en question] est juste blanc quand il n'a pas d'érreur, donc il va seulement s'afficher quand sa valeur va être changer dans la vérification en partant.
- "player" serait un meilleur nom que "data" dans le emit. De cette façon celui qui utilise ce composant sait c'est quoi qui est retourné.
- Le \<div\> aurait pu être un \<template\> dans le HTML.

```md
<script setup lang="ts">
//...
  const localPlayerName = ref("")
  const localSelectedShip = ref<db.Ship>()
  const errors = ref({
    name: "", //Ici les variables sont vides, donc le <span> va juste être vide.
    ship: "",
  })
//...
</script>
```
```md
<template>
//...
<div v-if="errors.name" class="text-danger mt-2"> <!-- Ne va pas s'afficher sauf s'il y a une erreur -->
  <span>{{ errors.name }}</span> <!-- Va être vide sauf s'il y a une erreur -->
</div> <!-- Donc les 2 font la même chose -->
//...
</template>
```

**_Gestion des erreurs_**

- Très bonne gestion des erreurs ne général, mais `String(localSelectedShip.value).trim() === ""` va toujours retourner vrai, car c'est le type de l'objet qui va être retourner s'il est nul.
- Aucun try et catch sur le fetch de la BD, mais ceci serait à revoir pour savoir si le try catch devrait être fait dans la fonction elle-même pour directement ici. Je pense que c'est seulement un problême de communication entre moi et Dominic.
