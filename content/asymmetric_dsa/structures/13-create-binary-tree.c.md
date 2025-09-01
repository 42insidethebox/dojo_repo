```ad-info
title: Info
Ce document présente la création d'un **arbre binaire** en C, suivant une implémentation simple, modulaire et robuste conforme aux conventions de la 42 School. L'objectif est de construire une structure d'arbre binaire qui pourra servir de base pour des opérations comme l'insertion, la recherche, et les traversées (in-order, pre-order, post-order).
```

---

# 🏆 Contexte et Objectif

Un **arbre binaire** est une structure de données où chaque nœud possède au plus deux enfants : un enfant gauche et un enfant droit. C'est une structure fondamentale utilisée dans plusieurs algorithmes et systèmes, comme les recherches rapides (arbres binaires de recherche), le stockage hiérarchique, ou les traversées structurées.

Dans ce fichier (`13-create-binary-tree.c`), nous allons :

1. Définir la structure d'un nœud d'arbre binaire.
2. Implémenter une fonction pour créer un arbre binaire vide.
3. Ajouter une fonction pour insérer un nœud dans l'arbre.
4. Tester la structure avec un exemple.

---

# 🎨 Représentation Visuelle

Voici un exemple d'arbre binaire que nous allons construire :

```
          8
         / \
        3   10
       / \    \
      1   6    14
```

- `8` est la racine.
- Les nœuds `3` et `10` sont les enfants gauche et droit de `8`.
- Les nœuds `1`, `6`, et `14` sont des feuilles.

---

# 💻 Code Complet Ultra-Commenté

Fichier suggéré : `13-create-binary-tree.c`

```c
#include <stdlib.h> // malloc, free
#include <stdio.h>  // printf, perror

// Définition d’un nœud pour l'arbre binaire
typedef struct s_btree
{
    int             data;          // Donnée du nœud
    struct s_btree  *left;         // Pointeur vers l'enfant gauche
    struct s_btree  *right;        // Pointeur vers l'enfant droit
}               t_btree;

// Fonction pour créer un nouveau nœud d'arbre
t_btree *create_node(int data)
{
    t_btree *node = malloc(sizeof(t_btree));
    if (!node)
    {
        perror("Erreur d’allocation mémoire pour le nœud");
        exit(EXIT_FAILURE);
    }
    node->data = data;
    node->left = NULL;
    node->right = NULL;
    return node;
}

// Fonction pour insérer une valeur dans un arbre binaire de recherche
t_btree *insert_node(t_btree *root, int data)
{
    if (root == NULL) // Cas de la création du premier nœud
        return create_node(data);

    if (data < root->data) // Insertion dans le sous-arbre gauche
        root->left = insert_node(root->left, data);
    else if (data > root->data) // Insertion dans le sous-arbre droit
        root->right = insert_node(root->right, data);

    return root; // Retourne la racine après insertion
}

// Fonction de traversée in-order (gauche -> racine -> droite)
void print_in_order(t_btree *root)
{
    if (root == NULL)
        return;

    print_in_order(root->left);
    printf("%d ", root->data);
    print_in_order(root->right);
}

// Fonction pour libérer la mémoire de l'arbre
void free_tree(t_btree *root)
{
    if (root == NULL)
        return;

    free_tree(root->left);
    free_tree(root->right);
    free(root);
}

// Fonction main pour démonstration
int main(void)
{
    t_btree *root = NULL;

    // Insertion des valeurs dans l'arbre
    root = insert_node(root, 8);
    root = insert_node(root, 3);
    root = insert_node(root, 10);
    root = insert_node(root, 1);
    root = insert_node(root, 6);
    root = insert_node(root, 14);

    // Affichage de l'arbre (traversée in-order)
    printf("Arbre binaire (traversée in-order) : ");
    print_in_order(root);
    printf("\n");

    // Libération de la mémoire
    free_tree(root);

    return 0;
}
```

---

# 🔎 Analyse Ligne par Ligne et Concepts Clés

### **1. Structure de l’Arbre Binaire**

```c
typedef struct s_btree
{
    int             data;
    struct s_btree  *left;
    struct s_btree  *right;
}               t_btree;
```

- **`data`** : Stocke la donnée du nœud.
- **`left`** : Pointeur vers l’enfant gauche.
- **`right`** : Pointeur vers l’enfant droit.

### **2. Création d’un Nœud**

```c
t_btree *create_node(int data)
{
    t_btree *node = malloc(sizeof(t_btree));
    if (!node)
    {
        perror("Erreur d’allocation mémoire pour le nœud");
        exit(EXIT_FAILURE);
    }
    node->data = data;
    node->left = NULL;
    node->right = NULL;
    return node;
}
```

- Alloue de la mémoire pour un nouveau nœud.
- Initialise les enfants à `NULL`.

### **3. Insertion d’un Nœud**

```c
t_btree *insert_node(t_btree *root, int data)
{
    if (root == NULL) 
        return create_node(data);

    if (data < root->data) 
        root->left = insert_node(root->left, data);
    else if (data > root->data) 
        root->right = insert_node(root->right, data);

    return root;
}
```

- **Base case** : Si la racine est `NULL`, crée un nouveau nœud.
- **Recursive case** :
    - Si la donnée est inférieure à `root->data`, insère à gauche.
    - Sinon, insère à droite.

### **4. Traversée In-Order**

```c
void print_in_order(t_btree *root)
{
    if (root == NULL)
        return;

    print_in_order(root->left);
    printf("%d ", root->data);
    print_in_order(root->right);
}
```

- Affiche l’arbre en parcourant les nœuds dans l’ordre gauche → racine → droite.
- Produit une sortie triée pour un arbre binaire de recherche.

### **5. Libération de la Mémoire**

```c
void free_tree(t_btree *root)
{
    if (root == NULL)
        return;

    free_tree(root->left);
    free_tree(root->right);
    free(root);
}
```

- Libère récursivement tous les nœuds de l’arbre.

---

# 🧭 Complexité

|Opération|Complexité|Explication|
|---|---|---|
|**Insertion**|O(h)|`h` est la hauteur de l’arbre.|
|**Traversée**|O(n)|Parcourt tous les nœuds.|
|**Libération**|O(n)|Libère chaque nœud.|

---

# 🧠 Bonnes Pratiques et Conseils

1. **Cas Limites** :
    
    - Gérer un arbre vide.
    - Éviter les valeurs en double (actuellement ignorées).
2. **Gestion de la Mémoire** :
    
    - Chaque `malloc` doit être accompagné d’un `free`.
3. **Respect des Conventions** :
    
    - Préfixe `t_` pour les types.
    - Pas de cast sur `malloc`.
4. **Extensibilité** :
    
    - Ajouter des fonctions pour la recherche ou des traversées supplémentaires (pre-order, post-order).

---

# ✨ Conclusion

Avec cette implémentation, vous avez une base robuste pour travailler avec des **arbres binaires**. Cette structure peut être étendue pour inclure des arbres binaires de recherche (BST), des arbres équilibrés (AVL, Red-Black), ou des applications spécifiques (comme le tri ou le stockage hiérarchique). 🎉