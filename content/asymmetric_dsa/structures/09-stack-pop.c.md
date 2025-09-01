```ad-info
title: Info
Voici une explication **extrêmement détaillée** et **profonde** de l'opération **Pop d'une pile**. L'objectif est de fournir une implémentation rigoureuse, conforme aux conventions de 42 School, tout en maximisant la densité informative. Cette opération, qui consiste à retirer l'élément situé au sommet d'une pile (stack), sera décrite avec des visualisations claires, une analyse complète de chaque étape, et un code ultra-commenté.
```

---

# 🏆 Contexte et Objectif

Dans une pile, le **pop** est l'opération qui retire et retourne l'élément situé au **sommet** (`top`). Elle suit la logique **LIFO (Last-In, First-Out)**, où le dernier élément ajouté est le premier retiré.

### **Propriétés Clés :**

1. **Complexité :** O(1), car elle ne nécessite aucune itération ; tout se passe au niveau du sommet.
2. **États possibles :**
    - Si la pile est vide (`top == NULL`), le **pop** doit gérer ce cas proprement.
    - Si la pile contient au moins un élément, l'opération met à jour le sommet (`top`) pour pointer sur l'élément suivant.

---

# 🎯 Objectifs Précis

1. Implémenter la fonction `stack_pop` :
    
    - Retirer l'élément du sommet.
    - Retourner sa valeur (ou `NULL` si la pile est vide).
    - Libérer la mémoire associée à cet élément.
2. Gérer les cas limites :
    
    - Si la pile est vide, la fonction retourne un indicateur de pile vide (par exemple `NULL`).
3. Garantir un comportement robuste et sécurisé :
    
    - Allocation mémoire correctement gérée.
    - Code propre, structuré, et extensible.

---

# ⚙️ Implémentation de la Fonction `stack_pop`

Voici le code ultra-commenté pour une pile basée sur une liste chaînée.

```c
#include <stdlib.h> // malloc, free, exit
#include <stdio.h>  // printf, perror
#include <unistd.h> // Inclut souvent des fonctions système utiles, mais non essentielles ici

// Définition du nœud de pile
typedef struct s_node
{
    int             data;
    struct s_node   *next;
}               t_node;

// Définition de la structure de pile
typedef struct s_stack
{
    t_node *top; // Pointe vers le sommet de la pile
}               t_stack;

// Fonction pour créer une pile vide
static t_stack   *create_stack(void)
{
    t_stack *stack = malloc(sizeof(t_stack));
    if (!stack)
    {
        perror("Erreur d’allocation mémoire pour la pile");
        exit(EXIT_FAILURE);
    }
    stack->top = NULL; // Initialisation : pile vide
    return stack;
}

// Fonction pour empiler (push) un élément dans la pile
static void       stack_push(t_stack *stack, int data)
{
    if (!stack)
        return;
    t_node *new_node = malloc(sizeof(t_node));
    if (!new_node)
    {
        perror("Erreur d’allocation mémoire pour un nœud");
        exit(EXIT_FAILURE);
    }
    new_node->data = data;
    new_node->next = stack->top; // Le nouveau nœud pointe sur l'ancien sommet
    stack->top = new_node;       // Le sommet de la pile devient le nouveau nœud
}

// Fonction pour dépiler (pop) l’élément au sommet de la pile
// Retourne la valeur de l'élément retiré ou -1 si la pile est vide
static int        stack_pop(t_stack *stack)
{
    if (!stack || !stack->top) // Si la pile est vide ou inexistante
    {
        printf("Erreur : Pile vide\n");
        return -1; // Convention : -1 indique un pop impossible (pile vide)
    }

    t_node *temp = stack->top;     // Sauvegarde temporaire du sommet
    int data = temp->data;         // Récupération de la donnée du sommet
    stack->top = temp->next;       // Le sommet pointe maintenant sur l'élément suivant
    free(temp);                    // Libération de l'ancien sommet
    return data;                   // Retourne la donnée retirée
}

// Fonction pour afficher la pile (pour débogage ou démonstration)
static void       print_stack(const t_stack *stack)
{
    if (!stack || !stack->top)
    {
        printf("Pile vide\n");
        return;
    }
    const t_node *current = stack->top;
    printf("Sommet de la pile ↓\n");
    while (current)
    {
        printf("%d\n", current->data);
        current = current->next;
    }
    printf("NULL (bas de la pile)\n");
}

// Fonction pour libérer toute la pile
static void       free_stack(t_stack *stack)
{
    if (!stack)
        return;
    t_node *current = stack->top;
    t_node *next_node;
    while (current)
    {
        next_node = current->next;
        free(current);
        current = next_node;
    }
    free(stack); // Libère la structure de la pile elle-même
}

// Fonction main pour démonstration
int main(void)
{
    t_stack *my_stack = create_stack(); // Crée une pile vide
    stack_push(my_stack, 10);           // Empile 10
    stack_push(my_stack, 20);           // Empile 20
    stack_push(my_stack, 30);           // Empile 30

    // Affiche l'état de la pile
    printf("État initial de la pile :\n");
    print_stack(my_stack);

    // Pop les éléments un par un
    printf("\nPop : %d\n", stack_pop(my_stack)); // Retire 30
    printf("Pop : %d\n", stack_pop(my_stack));  // Retire 20
    printf("Pop : %d\n", stack_pop(my_stack));  // Retire 10

    // Essayer de dépiler une pile vide
    printf("Pop : %d (pile vide)\n", stack_pop(my_stack));

    // Libération des ressources
    free_stack(my_stack);

    return 0;
}
```

---

# 🔎 Analyse du Code

|Ligne|Code|Explication détaillée|
|---|---|---|
|6-9|`typedef struct s_node { ... } t_node;`|Un nœud représente un élément de la pile, avec sa donnée (`data`) et un pointeur vers le suivant (`next`).|
|12-15|`typedef struct s_stack { ... } t_stack;`|La pile elle-même contient un pointeur `top` vers le sommet de la pile.|
|18-24|`create_stack()`|Alloue et initialise une pile vide. Gère les erreurs de mémoire proprement.|
|27-37|`stack_push()`|Ajoute un élément au sommet de la pile. Complexité O(1).|
|40-50|`stack_pop()`|Retire et retourne l'élément au sommet. Vérifie si la pile est vide.|
|53-63|`print_stack()`|Affiche tous les éléments de la pile, du sommet au bas.|
|66-76|`free_stack()`|Libère la mémoire allouée pour la pile et ses nœuds, même si elle est vide.|
|79-95|`main()`|Démonstration : création, empilement, affichage, dépilement et nettoyage de la pile.|

---

# 🎨 Visualisation avec Emojis

**Pile avant le `pop`** :

```
(top)  🟥 30
        🟨 20
        🟦 10
       NULL
```

**Opération `pop()`** :

- On retire l’élément du sommet (`30`).
- `top` pointe maintenant vers `20`.

**Pile après le `pop`** :

```
(top)  🟨 20
        🟦 10
       NULL
```

---

# ⚙️ Complexité

|Opération|Complexité|Explication|
|---|---|---|
|`stack_push`|O(1)|Ajout direct au sommet, sans parcourir la pile.|
|`stack_pop`|O(1)|Retrait direct du sommet, sans parcourir la pile.|

---

# 🧠 Bonnes Pratiques et Conseils

1. **Vérification de la pile vide** :
    
    - Une pile vide (`stack == NULL` ou `stack->top == NULL`) est un cas fréquent. Le gérer correctement évite des comportements imprévisibles.
2. **Libération mémoire** :
    
    - Chaque `malloc` doit avoir son `free`. Ici, `stack_pop` libère un seul nœud à la fois, mais `free_stack` libère toute la pile.
3. **Convention de retour** :
    
    - En cas d’erreur (pile vide), `stack_pop` retourne `-1` dans cet exemple. Vous pourriez aussi choisir une autre valeur sentinelle ou retourner un `bool`.
4. **Scalabilité** :
    
    - Le code est conçu pour évoluer facilement. Vous pouvez ajouter des fonctionnalités comme `stack_peek` (lire le sommet sans le retirer) ou `stack_size` (obtenir la taille de la pile).
5. **Conventions 42 School** :
    
    - Utilisation de `typedef` (`t_stack`, `t_node`).
    - Pas de cast pour `malloc`.
    - Gestion rigoureuse des erreurs.

---

# ✨ Conclusion

Avec cette implémentation de **`stack_pop`**, vous avez une base solide pour manipuler des piles en C. Cette fonction, essentielle pour des algorithmes comme le parcours en profondeur (DFS) ou l’évaluation d’expressions, est un must pour comprendre les structures de données. Bien que simple en apparence, le respect des bonnes pratiques ici démontre une approche professionnelle et extensible, parfaitement conforme à la rigueur exigée par **42 School** ou les entretiens techniques.

---

**Bravo, vous maîtrisez désormais le `pop` d'une pile, une opération clé dans l'univers des structures de données !** 🚀