```ad-info
title: Info
Ce document explique la traversée **pre-order** d'un arbre binaire, une méthode où chaque nœud est traité avant ses enfants. La traversée suit l'ordre : **racine → gauche → droite**, ce qui est idéal pour des opérations nécessitant le traitement immédiat des nœuds, comme la **copie d’un arbre** ou la **construction d’une expression arithmétique**.
```

---

# 🏆 Contexte et Objectif

La traversée **pre-order** est utilisée pour explorer et traiter un arbre binaire dans l’ordre où chaque **racine** est visitée avant ses **sous-arbres gauche et droit**. Elle est utile pour :

1. **Copier un arbre** dans un autre.
2. **Sérialiser un arbre** pour l’enregistrer dans un fichier.
3. Construire des arbres binaires (en utilisant la combinaison pre-order et in-order).
4. Résoudre des arbres d’expressions arithmétiques.

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

### Étapes de la traversée pre-order :

1. Visiter la **racine**.
2. Traverser récursivement le **sous-arbre gauche**.
3. Traverser récursivement le **sous-arbre droit**.

### Résultat attendu :

```
8, 3, 1, 6, 10
```

---

# 💻 Code Complet Ultra-Commenté

Fichier suggéré : `17-binary-tree-preorder.c`

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

// Fonction de traversée pre-order (racine → gauche → droite)
void preorder_traversal(t_btree *root)
{
    if (root == NULL)
        return;

    printf("%d ", root->data);      // Traiter la racine
    preorder_traversal(root->left); // Traversée du sous-arbre gauche
    preorder_traversal(root->right); // Traversée du sous-arbre droit
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

    // Traversée pre-order de l'arbre
    printf("Arbre binaire (traversée pre-order) : ");
    preorder_traversal(root);
    printf("\n");

    // Libération de la mémoire
    free_tree(root);

    return 0;
}
```

---

# 🔎 Analyse Ligne par Ligne et Concepts Clés

### **1. Fonction `preorder_traversal`**

```c
void preorder_traversal(t_btree *root)
{
    if (root == NULL)
        return;

    printf("%d ", root->data);      // Traiter la racine
    preorder_traversal(root->left); // Traversée du sous-arbre gauche
    preorder_traversal(root->right); // Traversée du sous-arbre droit
}
```

- **Base Case:** Si `root == NULL`, on ne fait rien (fin de la branche).
- **Recursive Traversal:**
    - **Racine:** Traite le nœud courant immédiatement.
    - **Sous-arbre gauche:** Explore tous les enfants du côté gauche.
    - **Sous-arbre droit:** Explore tous les enfants du côté droit.

---

### **2. Fonction `main`**

1. **Construction de l’arbre:** Les valeurs `{8, 3, 10, 1, 6}` sont insérées en respectant les règles du BST.
2. **Traversée et Affichage:** La fonction `preorder_traversal` parcourt l’arbre en commençant par chaque racine.

---

# 🧭 Complexité

|Opération|Complexité|Explication|
|---|---|---|
|**Traversée pre-order**|O(n)|Chaque nœud est visité une seule fois.|
|**Construction de l'arbre**|O(h) pour chaque insertion|`h` est la hauteur de l’arbre.|

- **Cas optimal (arbre équilibré):** La hauteur `h` est logarithmique (`h = log(n)`), donc l'insertion est efficace.
- **Cas dégénéré (arbre déséquilibré):** Si l’arbre devient une liste chaînée (`h = n`), l’insertion et la traversée deviennent linéaires.

---

# 🧠 Bonnes Pratiques et Conseils

1. **Cas Limites :**
    
    - Si l’arbre est vide (`root == NULL`), la traversée ne produit aucune sortie.
    - Toujours vérifier si `malloc` réussit lors de la création de nœuds.
2. **Extensibilité :**
    
    - Ajouter d'autres traversées (in-order, post-order, level-order) pour répondre à différents besoins.
3. **Applications Pratiques :**
    
    - **Préparation à la sérialisation d'arbres** (exportation ou sauvegarde).
    - **Construction d'arbres à partir de séquences** (souvent combinée avec in-order).

---

# ✨ Conclusion

La traversée **pre-order** est essentielle lorsque vous avez besoin de traiter les **racines** avant leurs **enfants**, comme dans la sérialisation, la copie ou l'évaluation d'arbres d'expression. Son implémentation simple et élégante respecte les conventions de la 42 School et offre une base solide pour travailler avec des arbres binaires.

---

**Bravo, vous avez maîtrisé la traversée pre-order !** 🌲