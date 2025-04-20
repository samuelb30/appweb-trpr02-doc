# Revue du code de Dominic

### Par Samuel

## Semaine du 6 avril

## Les composants
### StartMenuForm.vue

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

## Semaine du 13 avril

## Branche R6-info-player  
## Les composants

### CharactersStats.vue
- Vue qui sert à afficher les statistiques du joueur.

**_Points positifs :_**

- Très simple et facile à comprendre.
- Peut être réutilisé sans problème.

**_Point à améliorer_**

- Utilisation d'un enum qui retourne un chiffre pour ensuite faire un switch case pour retourner un string. L'enum aurait juste pu retourner un string.

```md
// types.ts
export enum ExperienceLevel {
    Debutant = 1,
    Confirme = 2,
    Expert = 3,
    Maitre = 4,
}
export interface Character {
    name: string
    experience: ExperienceLevel  
    cg: number
    shipName: string
    healthPercentage: number
}
```

```md
<script setup lang="ts">
import type { Character } from "../scripts/types"


  const experienceLabel = computed(() => {
    switch (props.character.experience) {
      case 1:
        return "Débutant"
      case 2:
       return "Confirmé"
      case 3:
        return "Expert"
      case 4:enemies
        return "Maître"
      default:
        return "Inconnu"
  }
  })
//...
</script>
```
### MissionProgress.vue
- Rien à dire.

## Les vues

### CharacterCreationView.vue
- Vue qui gère la création du Character et commence la partie.
- Créé aussi les ennemies au hazard.

**_Points positifs :_**

- Relativement facile à comprendre
- Isolation d'une grosse partie de la vue dans un composant (StartMenuForm.vue).

**_Point à améliorer_**

- `randomEnemies `aurait pu être typer à la place d'utiliser `any`. Ceci aurait aidé à la lecture du code.

```md
<script setup lang="ts">
  const randomEnemies = ref<Array<any>>([]) //ici
</script>
```

### GameView.vue
- Code qui gère le contexte de la mission / niveau.

**_Points positifs :_**
- Utilisation d'emplacements dans le contexte pour remplacer le nom du joueur, de l'ennemie ou des vaisseaux (`{{playerName}}`, `{{playerShip}}`, etc..)
- Code bien structuré.

**_Point à améliorer_**
- La lisibilité du code aurait pu être meilleure pour les fonctions de la section script.

## Branche R9-R10-combat-action
## Les composants

### CombatAction.vue
- Vue qui se charge de faire le combat.
- Vue qui se charge d'afficher les logs du combat.

**_Points positifs :_**
- Code très lisible malgré le nombre de conditions à respecter.
- J'adore le combats logs, très bel ajout.

**_Points à améliorer_**
- Mettres les constantes dans un ficher constants.ts. Si on veut changer les valeurs de chances, ça va être beaucoup plus facile.
- Mettres les constantes en MAJUSCULE pour que les reconnaitres dans le code ça soit plus facile.

```md
<script setup lang="ts">
  //...
  const maxHeavyAttacks = 4
  //...
  const hitChanceBeginner = 0.2
  const hitChanceConfirmed = 0.35
  const hitChanceExpert = 0.5
  const hitChanceMaster = 0.7
</script>  
```
## Branche RU12
## Les composants

### ModalComponent.vue
- Composant pour un modal universel.

**_Points positifs :_**
- Peut être utilisé pour plus qu'une utilisation: alerte d'une route dont l'utilisateur n'a pas le droit d'accès, alerter le joueur qu'il a gagné, alerter le joueur qu'il a perdu.

**_Point à améliorer_**
- Les `v-if` pour le bouton aurait pu être remplacer par l'utilisation d'une enum de string à la place du type du genre action.forbiden = "Retour à la création". De plus, les boutons emit tous `confirm`.

```md
<script setup lang="ts">
  const props = defineProps<{
    title: string
    message: string
    show: boolean
    type: "forbiden" | "victory" | "defeat" | null // <---- ici enum
}>()
</script>
<template>
  <div class="modal-footer">
    <button v-if="type === 'forbiden'" class="btn btn-primary" @click="emit('confirm')">
      Retour à la création
    </button>
    <button v-if="type === 'victory'" class="btn btn-success" @click="emit('confirm')">
      Voir les scores
    </button>
    <button v-if="type === 'defeat'" class="btn btn-danger" @click="emit('confirm')">
      Continuer
    </button>
  </div>  
</template>
```




