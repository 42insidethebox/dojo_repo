```ad-info
title: Info
Ce qui suit est une présentation ultra-détaillée, extrêmement enrichie et formatée, sur le thème **"Enqueue dans une file (queue)"**, c’est-à-dire l’opération qui consiste à ajouter un nouvel élément à l’arrière de la file. Le tout suit le style FAANG++ : abondance de détails, d’emojis, de code commenté, de mise en forme, tout en respectant les conventions de 42 School. Nous partons du principe que la file a déjà été créée (voir code 10 - create-queue) et que nous disposons déjà d'une structure `t_queue` avec `front` et `rear`.
```

---

# 🚀 Objectif Global

L’opération **Enqueue** dans une file (queue) permet d’ajouter un nouvel élément à l’arrière de la file. La file, structure **FIFO (First-In, First-Out)**, se comporte comme une file d’attente : les nouveaux arrivants s’installent à la fin, et le prochain départ se fait toujours en tête.

### **Ce que nous allons faire ici :**

1. Mettre en place une fonction `enqueue(t_queue *queue, int data)` qui :
    - Alloue un nouveau nœud.
    - L’ajoute à l’arrière de la file.
    - Gère correctement le cas où la file est initialement vide.
2. Respecter les conventions de la 42 School :
    - `typedef` avec préfixes `t_`.
    - Pas de cast sur `malloc`.
    - Vérifier les allocations et gérer les erreurs.

---

# 🎨 Représentation Visuelle en Emojis

Imaginons une file contenant déjà quelques éléments. Avant l’enqueue :

```
(front) [🔷(10)] -> [🟨(20)] -> [🟦(30)] -> NULL
                           ^
                          rear
```

Après un `enqueue(queue, 40)` :

```
(front) [🔷(10)] -> [🟨(20)] -> [🟦(30)] -> [🟥(40)] -> NULL
                                      ^
                                     rear (nouveau)
```

L’élément `40` vient d’être ajouté à l’arrière, et le pointeur `rear` pointe désormais sur ce nouvel élément.

---

# 💻 Code Complet Ultra-Commenté

Fichier suggéré : `11-queue-enqueue.c`

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

// Fonction pour créer une file vide (réutilisée depuis code 10)
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

// Fonction pour afficher la file (debug)
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

// Fonction d’enqueue : Ajoute un nouvel élément 'data' à l'arrière de la file
static void       enqueue(t_queue *queue, int data)
{
    if (!queue)
        return;

    // Créer un nouveau nœud
    t_node *new_node = malloc(sizeof(t_node));
    if (!new_node)
    {
        perror("Erreur d’allocation mémoire pour le nouveau nœud");
        exit(EXIT_FAILURE);
    }
    new_node->data = data;
    new_node->next = NULL; // Le nouveau sera le dernier, donc next = NULL

    // Cas où la file est vide
    if (queue->rear == NULL)
    {
        // Si rear est NULL, front l’est aussi (file vide)
        queue->front = new_node;
        queue->rear = new_node;
        return;
    }

    // Si la file n’est pas vide
    queue->rear->next = new_node; // L’ancien rear pointe vers le nouveau
    queue->rear = new_node;       // Le rear se met à jour sur le nouveau nœud
}

// Fonction pour libérer la file
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
    print_queue(my_queue); // Affiche "File vide"

    // Enqueue de quelques éléments
    enqueue(my_queue, 10);
    enqueue(my_queue, 20);
    enqueue(my_queue, 30);

    // État après ajouts
    print_queue(my_queue); 
    // Attendu: "État de la file : 10 <- 20 <- 30 <- NULL"

    // Enqueue d'un nouvel élément
    enqueue(my_queue, 40);
    print_queue(my_queue); 
    // Attendu: "État de la file : 10 <- 20 <- 30 <- 40 <- NULL"

    // Libération de la file
    free_queue(my_queue);
    printf("File libérée avec succès !\n");

    return 0;
}
```

---

# 🔎 Analyse Ligne par Ligne et Concepts Clés

1. **Structures `t_node` et `t_queue`** :
    
    - `t_node` : contient `data` et `next`.
    - `t_queue` : contient `front` et `rear`.
2. **create_queue()** :
    
    - Initialise une file vide (`front = NULL`, `rear = NULL`).
3. *_enqueue(t_queue _queue, int data)__ :
    
    - Crée un `new_node` avec `data`.
    - Si la file est vide (`queue->rear == NULL`), alors `front = new_node` et `rear = new_node`.
    - Sinon, `queue->rear->next = new_node` puis `queue->rear = new_node`.
4. **print_queue()** :
    
    - Affiche les éléments de `front` à `rear`.
5. **free_queue()** :
    
    - Libère toute la mémoire allouée à la file.
6. **main()** :
    
    - Crée une file vide.
    - Ajoute (enqueue) des éléments et affiche l’état.
    - Libère la mémoire.

---

# 🧭 Complexité

- **enqueue** est O(1) :  
    Grâce à l’utilisation de `rear`, pas besoin de parcourir la file. On ajoute directement à l’arrière.
- **print_queue** est O(n), car on parcourt tous les éléments.
- **free_queue** est O(n) pour libérer chaque nœud.

---

# 🧠 Bonnes Pratiques et Conseils

1. **Robustesse** : Vérifier les allocations. En cas d’échec, `perror` + `exit(EXIT_FAILURE)`.
2. **Clarté** : Nommer les fonctions (`enqueue`, `create_queue`, `print_queue`) de façon explicite.
3. **Respect des conventions** : `t_` pour les typedef, pas de cast sur `malloc`.
4. **Tests réguliers** : Essayer l’enqueue sur une file vide, puis sur une file non vide, puis plusieurs fois.

---

# ✨ Conclusion

Avec cette implémentation d’**enqueue**, nous disposons maintenant d’une file pleinement fonctionnelle (couplée au `dequeue` quand on l’implémentera). Cette structure est essentielle dans de nombreux contextes, comme les parcours en largeur (BFS), la gestion de buffers, ou encore la simulation de files d’attente réelles.

L’approche présentée est simple, robuste, et s’aligne sur les normes de la 42 School et des environnements FAANG, mettant en avant la rigueur et la lisibilité du code.

---

**Bravo, vous avez appris à insérer (enqueue) un élément dans une file !** 🎉