```ad-info
title: Info
Ce document explique la traversée **in-order** d'un arbre binaire, une méthode clé pour explorer un arbre de manière organisée. La traversée **in-order** consiste à visiter récursivement les sous-arbres dans l'ordre suivant : **gauche → racine → droite**, ce qui produit une séquence triée dans un arbre binaire de recherche (Binary Search Tree - BST).
```

---

# 🏆 Contexte et Objectif

La traversée **in-order** est souvent utilisée pour :

1. **Lister les éléments d'un arbre binaire dans un ordre croissant**.
2. **Vérifier la validité d'un arbre binaire de recherche**.
3. Fournir une base pour de nombreuses applications, comme le tri ou la recherche structurée.

---

# 🎨 Représentation Visuelle

Prenons l'arbre suivant :

```
          8
         / \
        3   10
       / \
      1   6
```

### Étapes de la traversée in-order :

1. Aller à l'extrême gauche (1).
2. Remonter à la racine du sous-arbre gauche (3).
3. Visiter l'enfant droit de la racine gauche (6).
4. Visiter la racine principale (8).
5. Aller à l'enfant droit de la racine principale (10).

### Résultat attendu :

```
1, 3, 6, 8, 10
```

---

# 💻 Code Complet Ultra-Commenté

Fichier suggéré : `16-binary-tree-inorder.c`

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

// Fonction de traversée in-order (gauche → racine → droite)
void inorder_traversal(t_btree *root)
{
    if (root == NULL)
        return;

    inorder_traversal(root->left); // Traversée du sous-arbre gauche
    printf("%d ", root->data);    // Affichage de la donnée du nœud
    inorder_traversal(root->right); // Traversée du sous-arbre droit
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

    // Traversée in-order de l'arbre
    printf("Arbre binaire (traversée in-order) : ");
    inorder_traversal(root);
    printf("\n");

    // Libération de la mémoire
    free_tree(root);

    return 0;
}
```

---

# 🔎 Analyse Ligne par Ligne et Concepts Clés

### **1. Fonction `inorder_traversal`**

```c
void inorder_traversal(t_btree *root)
{
    if (root == NULL)
        return;

    inorder_traversal(root->left);
    printf("%d ", root->data);
    inorder_traversal(root->right);
}
```

- **Base Case:** Si `root == NULL`, on ne fait rien (fin de la branche).
- **Recursive Traversal:**
    - **Sous-arbre gauche:** Explore les nœuds du sous-arbre gauche.
    - **Racine:** Affiche la donnée du nœud courant.
    - **Sous-arbre droit:** Explore les nœuds du sous-arbre droit.

---

### **2. Fonction `main`**

1. **Construction de l’arbre:** Les valeurs `{8, 3, 10, 1, 6}` sont insérées en respectant les règles du BST.
2. **Traversée et Affichage:** La fonction `inorder_traversal` parcourt l’arbre et imprime les valeurs dans un ordre croissant.

---

# 🧭 Complexité

|Opération|Complexité|Explication|
|---|---|---|
|**Traversée in-order**|O(n)|Chaque nœud est visité une seule fois.|
|**Construction de l'arbre**|O(h) pour chaque insertion|`h` est la hauteur de l’arbre.|

- **Cas optimal (arbre équilibré):** La hauteur `h` est logarithmique (`h = log(n)`), donc l'insertion est efficace.
- **Cas dégénéré (arbre déséquilibré):** Si l’arbre devient une liste chaînée (`h = n`), l’insertion et la traversée deviennent linéaires.

---

# 🧠 Bonnes Pratiques et Conseils

1. **Cas Limites :**
    
    - Si l’arbre est vide (`root == NULL`), la traversée ne produit aucune sortie.
    - Toujours vérifier si `malloc` réussit lors de la création de nœuds.
2. **Extensibilité :**
    
    - Ajouter d'autres traversées (pré-order, post-order) pour répondre à différents besoins.
3. **Validation :**
    
    - Tester avec des arbres contenant des structures plus complexes (e.g., plusieurs niveaux, valeurs très grandes ou très petites).
4. **Applications :**
    
    - L’in-order traversal est particulièrement utile pour les **triages**, **vérifications de validité** et **recherches ordonnées** dans un BST.

---

# ✨ Conclusion

La traversée **in-order** est une méthode fondamentale pour explorer les nœuds d'un arbre binaire dans un ordre croissant. Cette implémentation simple et récursive respecte les conventions de la 42 School et offre une base solide pour des projets impliquant des arbres binaires, comme le tri ou les algorithmes de recherche.

---

**Bravo, vous avez maîtrisé la traversée in-order !** 🌳