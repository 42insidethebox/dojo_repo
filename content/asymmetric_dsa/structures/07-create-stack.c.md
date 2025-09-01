```ad-info
title: Info
Ce qui suit est une explication et un code **extrêmement détaillés**, conçus pour un public cherchant une documentation "FAANG++", sans compromis sur la quantité d’informations. Nous allons créer une **pile (stack)**, dans le style 42 School, avec un `typedef` clair, une fonction de création qui respecte les conventions, une gestion de la mémoire, et une structuration pensée pour la réutilisabilité. Nous utiliserons un maximum d’astuces visuelles : gras, italiques, emojis, tableaux, code bien commenté. Le but est de fournir un océan de détails et de contexte, sans liens extérieurs, ni références, simplement une connaissance brute, dense et immersive. Notre exemple concernera simplement la création et l’initialisation d’une pile vide, prête à recevoir des opérations de type push/pop ultérieurement.
```

---

# 🏆 Contexte et Motivation

La **pile (stack)** est une structure de données fondamentale, utilisée partout :

- Dans l’évaluation d’expressions arithmétiques.
- Pour implémenter la récursivité au niveau machine (piles d’appels).
- Dans la navigation web (pages visitées) ou l’undo/redo.
- Dans d’innombrables algorithmes (parcours en profondeur, gestion d’opérations…).

Une pile suit la logique **LIFO (Last-In, First-Out)** : le dernier élément inséré est le premier à sortir. Pensez à une pile d’assiettes, la dernière posée sur le dessus est la première retirée.

Ici, nous allons simplement **créer une pile vide**, structurée de telle sorte qu’on puisse aisément y ajouter et retirer des éléments plus tard.

---

# 🎯 Objectif Précis

- Définir une structure `t_stack` qui représente notre pile.
- Proposer une fonction `create_stack()` qui alloue et initialise cette pile.
- Respecter les conventions 42 School : `typedef struct`, pas de cast sur `malloc`, robustesse, `t_` en préfixe, etc.
- Préparer le terrain pour d’autres opérations (push, pop, peek) qui seront traitées dans d’autres codes, mais pas ici.
- Livrer un code clair, modulaire, extensible, et hautement documenté.

---

# 🗂️ Conception de la Pile

**Quelle structure interne ?**

Une pile peut être implémentée de plusieurs manières : tableau statique, tableau dynamique, liste chaînée. Ici, on opte pour une approche simple :

- Représenter la pile par une structure `t_stack` contenant un pointeur `top` vers le sommet de la pile.
- Chaque élément sera un nœud chaîné (un `t_node`), semblable aux listes chaînées.
- Au départ, la pile est vide, `top = NULL`.

Cette approche rend les opérations `push` et `pop` en O(1), puisqu’il suffit de manipuler le sommet.

---

# 🎨 Vision Émoji

Imaginez une pile comme une colonne de boîtes (🟩🟦🟥…), la boîte la plus haute est le sommet. Si la pile est vide, il n’y a pas de boîtes, le sommet (`top`) est `NULL`.

- Pile vide : **top** -> `NULL`
- Plus tard, si on empile (push) un élément, `top` pointera vers un nouveau nœud.
- Mais dans ce code, on se limite à la création d’une pile vide, donc `top = NULL`.

---

# 💻 Code Complet Ultra-Commenté

Fichier suggéré : `07-create-stack.c`

```c
#include <stdlib.h> // pour malloc, free, exit
#include <stdio.h>  // pour printf, perror
#include <unistd.h> // parfois utile, standard 42

// Définition du nœud de pile. On réutilise un concept proche des listes chaînées.
// Un nœud contient une donnée (ici un int, par exemple) et un pointeur vers le nœud suivant.
typedef struct s_node
{
    int             data;
    struct s_node   *next;
}               t_node;

// Définition de la structure de la pile.
// t_stack contiendra un pointeur 'top', qui pointe vers le sommet de la pile.
// Si 'top' est NULL, la pile est vide.
typedef struct s_stack
{
    t_node *top; // pointe vers le nœud sommet de la pile
}               t_stack;

// Fonction create_stack : crée et initialise une pile vide.
// Retourne un pointeur sur une nouvelle pile, allouée dynamiquement.
// En cas d’échec d’allocation, le programme est interrompu.
static t_stack   *create_stack(void)
{
    t_stack *stack = malloc(sizeof(t_stack));
    if (!stack)
    {
        perror("Erreur d’allocation mémoire (create_stack)");
        exit(EXIT_FAILURE);
    }
    // Au départ, la pile est vide, donc top = NULL
    stack->top = NULL;
    return stack;
}

// Fonction free_stack : libère toute la mémoire occupée par la pile et ses nœuds.
// Ici, pour la démonstration, nous nettoyons ce que nous avons alloué.
static void       free_stack(t_stack *stack)
{
    // Même si la pile est vide, on gère proprement.
    // Dans ce code, on n’a pas ajouté d’éléments, mais supposons qu’on le fasse un jour.
    t_node *current = stack->top;
    t_node *next_node;
    while (current)
    {
        next_node = current->next;
        free(current); // libère chaque nœud
        current = next_node;
    }
    free(stack); // libère la structure de la pile elle-même
}

// Fonction print_stack : Pour l’instant, la pile est vide, mais 
// imaginons qu’elle ne le soit pas (dans d’autres scénarios).
// Ici, on affiche le contenu de la pile du haut vers le bas.
// Pour démonstration, on le code quand même.
static void       print_stack(const t_stack *stack)
{
    const t_node *current = stack->top;
    // On affiche le sommet en premier
    printf("Sommet de la pile (top) ↓\n");
    while (current)
    {
        printf("%d\n", current->data); 
        current = current->next;
    }
    printf("NULL (bas de la pile)\n");
}

// main : Démonstration. Ici, on ne fait que créer et détruire la pile, 
// puisque l’objectif est "créer une pile".
// Aucun push/pop n’est effectué, on se contente de montrer le cadre.
int main(void)
{
    // Création de la pile
    t_stack *my_stack = create_stack();
    printf("Pile créée avec succès !\n");

    // Pour vérifier l’état : on sait qu’elle est vide
    // print_stack(my_stack) afficherait juste le sommet vide (NULL).
    // Comme on n’a rien empilé, ce serait juste vide.
    // On peut tout de même l’appeler.
    print_stack(my_stack); 

    // Libération des ressources
    free_stack(my_stack);
    printf("Pile libérée avec succès !\n");

    return 0;
}
```

---

# 🔎 Analyse Ligne par Ligne et Concepts Clés

1. **typedef struct s_node { ... } t_node;**
    
    - Ce nœud représente un élément de la pile.
    - `data` : la donnée stockée (ici un `int`, mais on pourrait imaginer un `void*` pour plus de généralité).
    - `next` : pointeur vers le nœud en dessous dans la pile.
2. *_typedef struct s_stack { t_node _top; } t_stack;__
    
    - Une pile n’est ici qu’un wrapper pour un pointeur `top`.
    - `top` pointe vers le nœud supérieur de la pile.
    - `NULL` indique que la pile est vide.
3. **create_stack()**
    
    - Alloue un `t_stack`.
    - Vérifie l’allocation.
    - Initialise `top = NULL`, signifiant une pile vide.
4. *_free_stack(t_stack _stack)__
    
    - Parcourt tous les nœuds (s’il y en avait).
    - Libère chaque nœud et enfin la `t_stack`.
    - Même si vide ici, c’est prêt pour le futur.
5. *_print_stack(const t_stack _stack)__
    
    - Affiche le contenu. Ici, si vide, rien à afficher, juste un `NULL`.
    - Dans une utilisation future, si on avait fait des `push`, on verrait les éléments du sommet vers la base.
6. **main**
    
    - Crée la pile.
    - Confirme sa création.
    - Affiche l’état (vide).
    - Libère la pile.

---

# 🤔 Bonnes Pratiques et Conseils

- **Robustesse allocation** : On teste toujours `if (!stack)` après `malloc`. En cas de problème, `perror` + `exit(EXIT_FAILURE)`.
- **Structuration claire** : On sépare bien la logique :
    - `create_stack` pour la création.
    - `free_stack` pour le nettoyage.
    - `print_stack` pour affichage.
    - Main qui orchestre tout.
- **Scalabilité** : Le code est prêt à accueillir `push`, `pop`, `peek`. Ajoutez les facilement :
    - `push` créera un nouveau `t_node` et le mettra en haut, O(1).
    - `pop` retirera `top` et avancera, O(1).
- **Conventions 42 School** :
    - Préfixe `t_` pour les types (`t_stack`, `t_node`).
    - Pas de cast sur `malloc`.
    - Code propre, indenté, lisible.
- **Complexité** :
    - La création d’une pile est O(1) (juste une allocation).
    - Les futures opérations push/pop seront en O(1).
- **Testabilité** :
    - `create_stack` testable indépendamment. On peut imaginer des tests unitaires pour vérifier que `stack->top == NULL`.

---

# 🧱 Fondements Algorithmiques

- Une pile est une structure LIFO.
- Les opérations principales (push, pop) s’appliquent au sommet (`top`).
- Ici, nous n’implémentons que la création. C’est la première brique.
- Comprendre la pile aide dans beaucoup de problèmes algorithmiques.

---

# ✨ Conclusion

Vous disposez maintenant d’un code et d’une explication exhaustive pour **créer une pile vide** en C, avec une structure `t_stack`. Même si ce code n’empile ni ne dépile rien encore, il fixe une base solide. Vous pouvez ajouter des fonctions `push` et `pop` plus tard, transformer ce code en un outil polyvalent, ou l’intégrer dans des projets plus complexes (comme certains exercices de tri ou d’algorithmes sur des piles).

Cette base est robuste, claire, et suit les conventions de style et de rigueur appréciées dans des environnements d’excellence (type FAANG ou 42 School).

---

**Bravo, vous avez exploré la création d’une pile avec une densité informative extrême !**