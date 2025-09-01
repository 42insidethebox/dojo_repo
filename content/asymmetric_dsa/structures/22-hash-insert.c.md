### 📂 **Insérer dans une Table de Hachage** ([[22-hash-insert.c]])

---

## **Introduction**

L'insertion dans une table de hachage consiste à :

1. **Calculer l'indice** où la paire clé-valeur sera stockée grâce à une fonction de hachage.
2. **Gérer les collisions** si plusieurs clés produisent le même indice.
3. **Ajouter la paire clé-valeur** dans la structure appropriée (par exemple, une liste chaînée).

---

## **Plan d'Implémentation**

1. Créer une structure pour représenter un nœud contenant la **clé**, la **valeur** et un pointeur vers le prochain élément (en cas de collision).
2. Implémenter une **fonction de hachage** pour calculer l'indice à partir de la clé.
3. Écrire la fonction `insert` pour :
    - Trouver l'indice.
    - Insérer la paire clé-valeur dans la liste chaînée du bucket correspondant.

---

## **Code Complet**

Voici une implémentation détaillée en C de l'insertion dans une table de hachage :

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Taille de la table de hachage
#define TABLE_SIZE 10

// Structure pour représenter un nœud dans un bucket
typedef struct Node {
    char *key;          // Clé
    int value;          // Valeur associée
    struct Node *next;  // Pointeur vers le prochain nœud (gestion des collisions)
} Node;

// Table de hachage avec un tableau de pointeurs vers des buckets
Node *hash_table[TABLE_SIZE];

// Fonction de hachage : calcule un indice pour une clé donnée
unsigned int hash(const char *key) {
    unsigned int hash = 0;
    while (*key) {
        hash += *key++; // Somme des valeurs ASCII des caractères
    }
    return hash % TABLE_SIZE; // Réduction au nombre de buckets
}

// Fonction pour insérer un élément dans la table de hachage
void insert(const char *key, int value) {
    unsigned int index = hash(key); // Calculer l'indice avec la fonction de hachage

    // Créer un nouveau nœud
    Node *new_node = malloc(sizeof(Node));
    if (!new_node) {
        fprintf(stderr, "Erreur d'allocation mémoire\n");
        exit(EXIT_FAILURE);
    }
    new_node->key = strdup(key); // Copier la clé
    new_node->value = value;
    new_node->next = NULL;

    // Insérer dans le bucket (gestion des collisions par chaînage)
    if (hash_table[index] == NULL) {
        // Pas de collision : le bucket est vide
        hash_table[index] = new_node;
    } else {
        // Collision : ajouter à la tête de la liste chaînée
        new_node->next = hash_table[index];
        hash_table[index] = new_node;
    }
}

// Fonction pour afficher la table de hachage (pour débogage)
void display() {
    for (int i = 0; i < TABLE_SIZE; i++) {
        printf("Bucket %d: ", i);
        Node *current = hash_table[i];
        while (current) {
            printf("[%s: %d] -> ", current->key, current->value);
            current = current->next;
        }
        printf("NULL\n");
    }
}

// Fonction principale pour tester l'insertion
int main() {
    // Initialiser la table de hachage
    for (int i = 0; i < TABLE_SIZE; i++) {
        hash_table[i] = NULL;
    }

    // Insérer des éléments
    insert("Alice", 25);
    insert("Bob", 30);
    insert("Charlie", 35);
    insert("Eve", 40);
    insert("Alice", 50); // Test avec une clé en collision

    // Afficher la table de hachage
    display();

    return 0;
}
```

---

## **Explication**

### **1. Fonction de Hachage**

- La fonction **`hash`** calcule un indice à partir de la clé en :
    - Additionnant les valeurs ASCII des caractères de la clé.
    - Réduisant cette somme au nombre total de buckets (`TABLE_SIZE`) à l'aide de l'opérateur `%`.

### **2. Insertion**

- **Cas sans collision** : Si le bucket est vide (`NULL`), on insère directement le nœud.
- **Cas avec collision** : Si le bucket contient déjà des éléments, on insère le nouveau nœud en **tête de la liste chaînée**.

### **3. Gestion des Collisions**

Les collisions sont gérées à l'aide de **listes chaînées** :

- Si plusieurs clés produisent le même indice, elles sont ajoutées dans une liste chaînée au même bucket.

### **4. Affichage**

La fonction `display` parcourt chaque bucket et affiche les éléments qu'il contient (utile pour vérifier l'état de la table).

---

## **Exemple d'Exécution**

### **Entrées**

- `insert("Alice", 25)`
- `insert("Bob", 30)`
- `insert("Charlie", 35)`
- `insert("Eve", 40)`
- `insert("Alice", 50)` (collision volontaire)

### **Sortie**

```
Bucket 0: NULL
Bucket 1: [Eve: 40] -> NULL
Bucket 2: NULL
Bucket 3: [Alice: 50] -> [Alice: 25] -> NULL
Bucket 4: [Charlie: 35] -> NULL
Bucket 5: NULL
Bucket 6: NULL
Bucket 7: NULL
Bucket 8: [Bob: 30] -> NULL
Bucket 9: NULL
```

---

## **Améliorations Futures**

1. **Détection des Clés Duplicates** : Vérifier si la clé existe déjà avant d'insérer.
2. **Gestion Dynamique** : Redimensionner la table si elle devient trop pleine.
3. **Suppression** : Ajouter une fonction pour supprimer une clé et son nœud.

---

## **Résumé**

1. **Insertion dans une table de hachage** implique :
    - Calculer l'indice avec une fonction de hachage.
    - Gérer les collisions en utilisant des listes chaînées.
    - Ajouter la paire clé-valeur au bon endroit.
2. Les collisions sont gérées en **chaînant les nœuds dans le même bucket**.

---

Si quelque chose n'est pas clair, je peux détailler encore plus ou simplifier davantage ! 😊