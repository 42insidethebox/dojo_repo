```ad-info
title: Info
Ce document explique de manière exhaustive et détaillée la création d’une **file (queue)** en C, conformément aux conventions et pratiques attendues à **42 School**. Nous couvrirons la structure de la file, son initialisation, et ses propriétés. Une file suit une logique **FIFO (First-In, First-Out)**, ce qui signifie que le premier élément ajouté est le premier à être retiré. Cette opération est souvent utilisée dans des algorithmes comme le parcours en largeur (BFS) ou pour gérer des processus dans un système d’exploitation.
```

---

# 🏆 Contexte et Objectif

La **file (queue)** est une structure de données linéaire où les éléments sont ajoutés à une **extrémité** (queue, ou arrière) et retirés par l’autre **extrémité** (front, ou avant). Contrairement à une pile, où les ajouts et les retraits se font au sommet, une file suit la logique d’une file d’attente réelle : **premier arrivé, premier servi**.

### **Objectifs de ce code :**

1. Créer une file vide.
2. Définir une structure `t_queue` adaptée.
3. Respecter les conventions de la **42 School** :
    - Préfixes `t_` pour les types typedef.
    - Gestion rigoureuse des erreurs d’allocation.
    - Code propre, modulaire, et extensible.

---

# 🎯 Propriétés Clés

1. **Opérations fondamentales (pas implémentées ici)** :
    - **Enqueue** (ajouter) : insérer un élément à l’arrière de la file.
    - **Dequeue** (retirer) : retirer un élément à l’avant.
    - **Peek** (consulter) : voir l’élément à l’avant sans le retirer.
2. **Complexité** :
    - Initialisation : O(1).
    - Enqueue/Dequeue : O(1) si bien conçu.
3. **Utilisations communes** :
    - Parcours en largeur (BFS) dans les graphes.
    - Gestion des tâches dans les systèmes multitâches.
    - Gestion des files d’attente dans des systèmes réels (serveurs, impressions).

---

# 🎨 Conception de la File

Une file est composée de deux extrémités :

- **front** : le premier élément, celui que l’on retire.
- **rear** : le dernier élément, celui où l’on ajoute.

Nous utiliserons une liste chaînée pour implémenter la file :

- Chaque nœud (`t_node`) contient une donnée (`data`) et un pointeur vers le nœud suivant.
- La structure `t_queue` contiendra deux pointeurs :
    - `front` : pointe vers le premier nœud.
    - `rear` : pointe vers le dernier nœud.

**Cas initial (file vide)** :

```
front -> NULL
rear  -> NULL
```

---

# 💻 Code Complet Ultra-Commenté

Fichier : `10-create-queue.c`

```c
#include <stdlib.h> // pour malloc, free, exit
#include <stdio.h>  // pour printf, perror
#include <unistd.h> // parfois utile dans les projets 42

// Définition du nœud (élément de la file)
typedef struct s_node
{
    int             data;   // Donnée stockée dans le nœud
    struct s_node   *next;  // Pointeur vers le nœud suivant
}               t_node;

// Définition de la file
typedef struct s_queue
{
    t_node *front;  // Pointeur vers le premier nœud de la file
    t_node *rear;   // Pointeur vers le dernier nœud de la file
}               t_queue;

// Fonction pour créer une file vide
static t_queue   *create_queue(void)
{
    t_queue *queue = malloc(sizeof(t_queue));
    if (!queue)
    {
        perror("Erreur d’allocation mémoire pour la file");
        exit(EXIT_FAILURE);
    }
    queue->front = NULL; // Initialement, aucun élément
    queue->rear = NULL;  // Initialement, aucun élément
    return queue;
}

// Fonction pour afficher la file (pour vérification ou débogage)
static void       print_queue(const t_queue *queue)
{
    if (!queue || !queue->front)
    {
        printf("File vide\n");
        return;
    }
    const t_node *current = queue->front;
    printf("État de la file :\n");
    while (current)
    {
        printf("%d <- ", current->data); // Affiche chaque élément avec une flèche
        current = current->next;
    }
    printf("NULL (fin de la file)\n");
}

// Fonction pour libérer la mémoire associée à une file
static void       free_queue(t_queue *queue)
{
    if (!queue)
        return;
    t_node *current = queue->front;
    t_node *next_node;
    while (current)
    {
        next_node = current->next;
        free(current); // Libération de chaque nœud
        current = next_node;
    }
    free(queue); // Libération de la structure de la file
}

// main : Démonstration de la création et de l’affichage d’une file vide
int main(void)
{
    // Création d’une file vide
    t_queue *my_queue = create_queue();
    printf("File créée avec succès !\n");

    // Affichage initial de la file (elle est vide)
    print_queue(my_queue);

    // Libération des ressources
    free_queue(my_queue);
    printf("File libérée avec succès !\n");

    return 0;
}
```

---

# 🔎 Analyse Ligne par Ligne et Concepts Clés

1. **typedef struct s_node { ... } t_node;**
    
    - Chaque nœud représente un élément de la file, avec :
        - `data` : la donnée stockée.
        - `next` : le pointeur vers le prochain nœud.
2. **typedef struct s_queue { ... } t_queue;**
    
    - La file contient deux pointeurs :
        - `front` : pointe vers le premier nœud.
        - `rear` : pointe vers le dernier nœud.
3. **create_queue()**
    
    - Alloue dynamiquement une file.
    - Initialise `front` et `rear` à `NULL`, indiquant que la file est vide.
4. **print_queue()**
    
    - Parcourt la file du `front` au `rear`, affichant chaque élément.
    - Gère le cas où la file est vide (`front == NULL`).
5. **free_queue()**
    
    - Libère chaque nœud, puis la structure `t_queue`.
6. **main()**
    
    - Montre la création d’une file vide et sa libération.

---

# 🎨 Visualisation avec Emojis

1. **File vide** (après `create_queue()`) :
    
    ```
    front -> NULL
    rear  -> NULL
    ```
    
2. **File avec des éléments** (si des opérations `enqueue` étaient implémentées) :
    
    ```
    front -> [🔷(10)] -> [🟨(20)] -> [🟦(30)] -> NULL
                          ^
                         rear
    ```
    

---

# ⚙️ Complexité

|Opération|Complexité|Explication|
|---|---|---|
|**Création**|O(1)|Alloue simplement la structure et initialise les pointeurs.|
|**Affichage**|O(n)|Parcourt tous les éléments de la file pour les afficher.|
|**Libération**|O(n)|Parcourt et libère chaque nœud un par un.|

---

# 🧠 Bonnes Pratiques et Conseils

1. **Robustesse Allocation** :
    
    - Toujours vérifier le retour de `malloc` avec `if (!queue)` et gérer les erreurs avec `perror + exit`.
2. **Modularité** :
    
    - Le code est divisé en fonctions distinctes pour chaque tâche (création, affichage, libération), rendant le code facile à maintenir et à étendre.
3. **Respect des Conventions** :
    
    - Préfixe `t_` pour les `typedef`.
    - Pas de cast sur `malloc`.
    - Respect du style normé.
4. **Préparation pour Enqueue/Dequeue** :
    
    - La structure `t_queue` est prête pour recevoir des opérations comme `enqueue` et `dequeue`, avec des complexités O(1) bien optimisées.

---

# ✨ Conclusion

Ce code permet de créer une file vide en C, avec une structure propre et extensible. Bien que limité à l’initialisation ici, il constitue une base robuste pour implémenter les opérations fondamentales de la file (enqueue, dequeue, etc.). La gestion rigoureuse de la mémoire et la séparation des responsabilités en font un modèle idéal pour des environnements académiques comme **42 School** ou des contextes professionnels exigeants.

---

**Bravo, vous avez créé une file (queue) en C de manière rigoureuse et extensible !** 🚀