```ad-info
title: Info
Ce document explique en profondeur l'opération **Dequeue d'une file (queue)**. L'objectif est de retirer l'élément situé au **début de la file** (avant ou front) et de gérer correctement les cas limites, notamment si la file est vide. L’opération **dequeue** suit la logique FIFO (**First-In, First-Out**) et sera implémentée dans une structure définie comme dans les codes précédents.
```

---

# 🏆 Contexte et Objectif

L’opération **dequeue** consiste à retirer l'élément à l'avant d'une file. Cela implique plusieurs étapes :

1. Vérifier si la file est vide.
2. Libérer la mémoire occupée par le nœud retiré.
3. Mettre à jour le pointeur `front` pour qu'il pointe sur le nœud suivant.
4. Si le nœud retiré était le seul élément, mettre également à jour `rear` à `NULL`.

---

# 🎨 Représentation Visuelle en Emojis

### Avant le `dequeue` :

```
(front) [🔷(10)] -> [🟨(20)] -> [🟦(30)] -> NULL
         ^
        rear
```

### Après le `dequeue` :

L'élément `10` est retiré :

```
(front) [🟨(20)] -> [🟦(30)] -> NULL
         ^
        rear
```

Si `20` et `30` sont également retirés, la file devient vide :

```
(front) NULL
 rear -> NULL
```

---

# 💻 Code Complet Ultra-Commenté

Fichier suggéré : `12-queue-dequeue.c`

```c
#include <stdlib.h> // malloc, free, exit
#include <stdio.h>  // printf, perror
#include <unistd.h> // standard 42

// Définition d’un nœud pour la file
typedef struct s_node
{
    int             data;
    struct s_node   *next;
}               t_node;

// Définition de la structure de la file (queue)
typedef struct s_queue
{
    t_node *front;  // Pointeur vers le premier nœud
    t_node *rear;   // Pointeur vers le dernier nœud
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
    queue->front = NULL;
    queue->rear = NULL;
    return queue;
}

// Fonction pour ajouter un élément à la file
static void       enqueue(t_queue *queue, int data)
{
    t_node *new_node = malloc(sizeof(t_node));
    if (!new_node)
    {
        perror("Erreur d’allocation mémoire pour le nouveau nœud");
        exit(EXIT_FAILURE);
    }
    new_node->data = data;
    new_node->next = NULL;
    if (queue->rear == NULL)
    {
        queue->front = new_node;
        queue->rear = new_node;
        return;
    }
    queue->rear->next = new_node;
    queue->rear = new_node;
}

// Fonction pour retirer un élément de la file
// Retourne la valeur de l’élément retiré ou -1 si la file est vide
static int        dequeue(t_queue *queue)
{
    if (!queue || !queue->front) // Cas où la file est vide
    {
        printf("Erreur : File vide\n");
        return -1;
    }

    t_node *temp = queue->front; // Sauvegarde temporaire de l'ancien front
    int data = temp->data;       // Récupère la valeur du front
    queue->front = temp->next;   // Avance le front sur le nœud suivant

    // Si le front devient NULL, rear doit aussi être NULL (file vide)
    if (queue->front == NULL)
        queue->rear = NULL;

    free(temp); // Libère la mémoire du nœud retiré
    return data;
}

// Fonction pour afficher la file
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
        printf("%d <- ", current->data);
        current = current->next;
    }
    printf("NULL (fin de la file)\n");
}

// Fonction pour libérer la mémoire associée à la file
static void       free_queue(t_queue *queue)
{
    if (!queue)
        return;
    t_node *current = queue->front;
    t_node *next_node;
    while (current)
    {
        next_node = current->next;
        free(current);
        current = next_node;
    }
    free(queue);
}

// Fonction main pour démonstration
int main(void)
{
    t_queue *my_queue = create_queue();
    printf("File créée avec succès !\n");
    print_queue(my_queue);

    enqueue(my_queue, 10);
    enqueue(my_queue, 20);
    enqueue(my_queue, 30);

    printf("\nAprès avoir ajouté des éléments :\n");
    print_queue(my_queue);

    // Déqueue des éléments
    printf("\nDequeue : %d\n", dequeue(my_queue)); // Retire 10
    print_queue(my_queue);

    printf("\nDequeue : %d\n", dequeue(my_queue)); // Retire 20
    print_queue(my_queue);

    printf("\nDequeue : %d\n", dequeue(my_queue)); // Retire 30
    print_queue(my_queue);

    // Déqueue sur une file vide
    printf("\nDequeue : %d (file vide)\n", dequeue(my_queue));

    // Libération des ressources
    free_queue(my_queue);
    printf("File libérée avec succès\n");

    return 0;
}
```

---

# 🔎 Analyse Ligne par Ligne et Concepts Clés

1. **Structures `t_node` et `t_queue`** :
    
    - Chaque nœud (`t_node`) contient une donnée (`data`) et un pointeur vers le nœud suivant (`next`).
    - La file (`t_queue`) utilise deux pointeurs :
        - `front` pointe sur le premier élément (celui qui sera retiré).
        - `rear` pointe sur le dernier élément (où les nouveaux éléments sont ajoutés).
2. *_dequeue(t_queue _queue)__ :
    
    - Vérifie si la file est vide : Si `queue->front == NULL`, retourne une valeur sentinelle (-1).
    - Sauvegarde l’adresse du nœud à retirer dans `temp`.
    - Avance `front` pour pointer sur le nœud suivant.
    - Si `front` devient `NULL`, met aussi `rear` à `NULL` pour indiquer une file vide.
    - Libère le nœud retiré avec `free(temp)`.
    - Retourne la valeur retirée (`temp->data`).
3. **Main** :
    
    - Montre l’ajout d’éléments avec `enqueue`.
    - Défile (dequeue) chaque élément un par un et affiche l’état de la file après chaque retrait.
    - Teste également le cas d’une file vide.

---

# 🧭 Complexité

|Opération|Complexité|Explication|
|---|---|---|
|**dequeue**|O(1)|Se limite au retrait du premier élément. Pas de parcours.|
|**print_queue**|O(n)|Parcourt tous les éléments de la file pour les afficher.|
|**free_queue**|O(n)|Libère tous les nœuds de la file.|

---

# 🧠 Bonnes Pratiques et Conseils

1. **Vérification des cas limites** :
    
    - Toujours vérifier si la file est vide avant de tenter un `dequeue`.
    - Ne pas oublier de mettre à jour `rear` à `NULL` lorsque la file devient vide.
2. **Gestion de la Mémoire** :
    
    - Chaque `malloc` doit avoir un `free` correspondant pour éviter les fuites.
    - `free_queue` est essentiel pour éviter d’oublier des allocations dynamiques.
3. **Respect des Conventions** :
    
    - Utilisation de `t_` pour les typedefs.
    - Pas de cast sur `malloc`.
4. **Robustesse** :
    
    - Retourner une valeur sentinelle (`-1`) si la file est vide permet de signaler les erreurs proprement.

---

# ✨ Conclusion

Avec cette implémentation de **dequeue**, votre structure de file est maintenant pleinement fonctionnelle. Vous pouvez ajouter des éléments avec `enqueue`, les retirer avec `dequeue`, afficher l’état avec `print_queue`, et nettoyer la mémoire avec `free_queue`. Ce code respecte les conventions de la 42 School tout en offrant une robustesse adaptée à des environnements FAANG.

---

**Bravo, vous maîtrisez l’opération dequeue dans une file !** 🎉