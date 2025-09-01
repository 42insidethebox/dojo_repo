```ad-info
title: Info
Ce document explique la recherche dans un **arbre binaire de recherche (Binary Search Tree - BST)**. L'objectif est de localiser un nœud contenant une valeur donnée tout en respectant la propriété clé du BST : les valeurs à gauche d'un nœud sont plus petites et celles à droite sont plus grandes.
```

---

# 🏆 Contexte et Objectif

La recherche dans un **Binary Search Tree (BST)** s'appuie sur sa structure ordonnée pour réduire efficacement le nombre de comparaisons :

1. Si la valeur recherchée est **inférieure** à celle du nœud courant, on explore le sous-arbre gauche.
2. Si elle est **supérieure**, on explore le sous-arbre droit.
3. Si elle est **égale**, la recherche est réussie.

---

# 🎨 Représentation Visuelle

Prenons l’arbre suivant :

```
          8
         / \
        3   10
       / \
      1   6
```

- Recherche de `6` :
    
    - Comparer avec `8` → Aller à gauche.
    - Comparer avec `3` → Aller à droite.
    - Trouvé `6`.
- Recherche de `4` :
    
    - Comparer avec `8` → Aller à gauche.
    - Comparer avec `3` → Aller à droite.
    - Comparer avec `6` → Aller à gauche.
    - Arrivé à une feuille (`NULL`) → Non trouvé.

---

# 💻 Code Complet Ultra-Commenté

Fichier suggéré : `15-binary-tree-search.c`

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

// Fonction pour créer un nouveau nœud
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
    if (root == NULL)
        return create_node(data);

    if (data < root->data)
        root->left = insert_node(root->left, data);
    else if (data > root->data)
        root->right = insert_node(root->right, data);

    return root;
}

// Fonction pour rechercher une valeur dans un arbre binaire
t_btree *search_node(t_btree *root, int target)
{
    if (root == NULL)
    {
        printf("Valeur %d non trouvée dans l'arbre.\n", target);
        return NULL; // La valeur n’existe pas dans l’arbre
    }

    if (target == root->data)
    {
        printf("Valeur %d trouvée.\n", target);
        return root; // La valeur a été trouvée
    }
    else if (target < root->data)
        return search_node(root->left, target); // Chercher dans le sous-arbre gauche
    else
        return search_node(root->right, target); // Chercher dans le sous-arbre droit
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

// Fonction pour libérer la mémoire de l’arbre
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

    // Affichage de l'arbre (traversée in-order)
    printf("Arbre binaire (traversée in-order) : ");
    print_in_order(root);
    printf("\n");

    // Recherche de valeurs
    printf("\nRecherche de 6 dans l'arbre :\n");
    search_node(root, 6);

    printf("\nRecherche de 4 dans l'arbre :\n");
    search_node(root, 4);

    // Libération de la mémoire
    free_tree(root);

    return 0;
}
```

---

# 🔎 Analyse Ligne par Ligne et Concepts Clés

### **1. Fonction `search_node`**

```c
t_btree *search_node(t_btree *root, int target)
{
    if (root == NULL)
    {
        printf("Valeur %d non trouvée dans l'arbre.\n", target);
        return NULL;
    }

    if (target == root->data)
    {
        printf("Valeur %d trouvée.\n", target);
        return root;
    }
    else if (target < root->data)
        return search_node(root->left, target);
    else
        return search_node(root->right, target);
}
```

- **Base Case** : Si `root == NULL`, l’arbre est vide ou on a atteint une feuille sans trouver la valeur.
- **Equality Case** : Si `target == root->data`, la valeur a été trouvée.
- **Recursive Cases** :
    - Si `target < root->data`, la recherche continue dans le sous-arbre gauche.
    - Si `target > root->data`, la recherche continue dans le sous-arbre droit.

---

### **2. Fonction `main`**

- Remplit l’arbre avec les valeurs `{8, 3, 10, 1, 6}`.
- Effectue deux recherches :
    - Recherche de `6` (présente dans l’arbre).
    - Recherche de `4` (absente de l’arbre).
- Libère toute la mémoire.

---

# 🧭 Complexité

|Opération|Complexité|Explication|
|---|---|---|
|**Recherche**|O(h)|`h` est la hauteur de l’arbre.|

- **Cas optimal (arbre équilibré)** : `h = log(n)` → Complexité logarithmique.
- **Cas dégénéré (arbre déséquilibré)** : `h = n` → Complexité linéaire.

---

# 🧠 Bonnes Pratiques et Conseils

1. **Cas Limites** :
    
    - Rechercher dans un arbre vide.
    - Gérer les doublons (déjà exclus dans `insert_node`).
2. **Extensibilité** :
    
    - Ajouter une fonction de recherche itérative pour éviter la surcharge de la pile (stack overflow) sur de grands arbres.
3. **Optimisation** :
    
    - Utiliser un arbre équilibré (AVL ou Red-Black) pour garantir une hauteur logarithmique.
4. **Debugging** :
    
    - Ajouter des logs pour suivre chaque étape de la recherche.

---

# ✨ Conclusion

Avec cette implémentation, vous pouvez rechercher efficacement des valeurs dans un **Binary Search Tree**. Cette opération, essentielle dans de nombreux algorithmes, peut être étendue pour inclure des arbres équilibrés ou des recherches complexes. 🎉

---

**Bravo, vous maîtrisez la recherche dans un arbre binaire !** 🌲