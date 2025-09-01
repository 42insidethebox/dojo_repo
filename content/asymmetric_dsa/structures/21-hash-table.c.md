### 🌟 **Implémentation d'une Table de Hachage** ([[21-hash-table.c]]) 🌟

Une table de hachage est une structure de données essentielle pour la recherche rapide. Elle est couramment utilisée pour les entretiens FAANG et les projets comme `push_swap`. Nous allons détailler étape par étape une implémentation en C. Cette table utilisera **chaining** (chaînes de listes chaînées) pour gérer les collisions.

---

## **Plan de Travail**

1. **Comprendre la structure de la table de hachage**.
2. **Définir les types de données** :
    - Clé (`key`) : un entier ou une chaîne de caractères.
    - Valeur (`value`) : un entier ou une structure.
3. **Créer une fonction de hachage**.
4. **Gérer les collisions avec des listes chaînées**.
5. **Implémenter les principales opérations** :
    - Insertion (`insert`).
    - Recherche (`search`).
    - Suppression (`delete`).
6. **Tester l'implémentation**.

---

## **Code Complet : Table de Hachage**

Voici une implémentation étape par étape :

```c
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#define TABLE_SIZE 10

typedef struct s_node {
    char *key;
    int value;
    struct s_node *next;
} t_node;

typedef struct s_hash_table {
    t_node *buckets[TABLE_SIZE];
} t_hash_table;

unsigned int hash(const char *key)
{
    unsigned int hash;
    const char *current;

    hash = 0;
    current = key;
    while (*current)
    {
        hash = (hash * 31) + *current;
        current++;
    }
    return (hash % TABLE_SIZE);
}

t_hash_table *create_table(void)
{
    t_hash_table *table;
    int i;

    table = malloc(sizeof(t_hash_table));
    if (table == NULL)
    {
        fprintf(stderr, "Memory allocation failed\n");
        return (NULL);
    }
    i = 0;
    while (i < TABLE_SIZE)
    {
        table->buckets[i] = NULL;
        i++;
    }
    return (table);
}

void insert(t_hash_table *table, const char *key, int value)
{
    unsigned int index;
    t_node *new_node;

    index = hash(key);
    new_node = malloc(sizeof(t_node));
    if (new_node == NULL)
    {
        fprintf(stderr, "Memory allocation failed\n");
        return;
    }
    new_node->key = strdup(key);
    if (new_node->key == NULL)
    {
        fprintf(stderr, "Memory allocation failed\n");
        free(new_node);
        return;
    }
    new_node->value = value;
    new_node->next = table->buckets[index];
    table->buckets[index] = new_node;
}

int search(t_hash_table *table, const char *key)
{
    unsigned int index;
    t_node *current;

    index = hash(key);
    current = table->buckets[index];
    while (current != NULL)
    {
        if (strcmp(current->key, key) == 0)
            return (current->value);
        current = current->next;
    }
    return (-1);
}

void delete(t_hash_table *table, const char *key)
{
    unsigned int index;
    t_node *current;
    t_node *previous;

    index = hash(key);
    current = table->buckets[index];
    previous = NULL;
    while (current != NULL)
    {
        if (strcmp(current->key, key) == 0)
        {
            if (previous == NULL)
                table->buckets[index] = current->next;
            else
                previous->next = current->next;
            free(current->key);
            free(current);
            return;
        }
        previous = current;
        current = current->next;
    }
}

void display(t_hash_table *table)
{
    int i;
    t_node *current;

    i = 0;
    while (i < TABLE_SIZE)
    {
        printf("Bucket %d: ", i);
        current = table->buckets[i];
        while (current != NULL)
        {
            printf("[%s: %d] -> ", current->key, current->value);
            current = current->next;
        }
        printf("NULL\n");
        i++;
    }
}

void free_table(t_hash_table *table)
{
    int i;
    t_node *current;
    t_node *temp;

    i = 0;
    while (i < TABLE_SIZE)
    {
        current = table->buckets[i];
        while (current != NULL)
        {
            temp = current;
            current = current->next;
            free(temp->key);
            free(temp);
        }
        i++;
    }
    free(table);
}

int main(void)
{
    t_hash_table *table;
    int result;

    table = create_table();
    if (table == NULL)
        return (EXIT_FAILURE);

    insert(table, "Alice", 25);
    insert(table, "Bob", 30);
    insert(table, "Charlie", 35);

    display(table);

    result = search(table, "Bob");
    printf("Search for Bob: %d\n", result);

    result = search(table, "Eve");
    printf("Search for Eve: %d\n", result);

    delete(table, "Alice");
    display(table);

    free_table(table);
    return (EXIT_SUCCESS);
}

```

---

## **Explications**

### **1. Structure de la Table**

- **Buckets** : Chaque entrée de la table contient une liste chaînée pour gérer les collisions.
- **Node** : Contient la clé, la valeur et un pointeur vers le prochain élément.

### **2. Fonction de Hachage**

- Utilise une combinaison simple (multiplication et addition) pour convertir une chaîne en un indice.

### **3. Gestion des Collisions**

- Les collisions sont résolues par des listes chaînées où plusieurs éléments peuvent partager le même index.

### **4. Opérations**

- **Insertion** : Ajoute un élément au début de la liste chaînée.
- **Recherche** : Parcourt la liste pour trouver une clé correspondante.
- **Suppression** : Modifie les pointeurs pour exclure un nœud spécifique.

### **5. Tests**

- Le programme principal teste l’insertion, la recherche, et la suppression, tout en affichant l’état de la table.

---

## **Prochaines Étapes**

1. Optimiser la fonction de hachage pour de meilleurs résultats avec des chaînes longues.
2. Ajouter des tests unitaires pour valider chaque fonctionnalité.
3. Implémenter une méthode pour gérer des tailles dynamiques (redimensionnement de la table).

---

**📘 Bonnes pratiques :** Utilisez cette base pour implémenter des solutions adaptées aux besoins FAANG en mettant l'accent sur les performances et la gestion de la mémoire ! 🎯


### 📚 **Guide Complet pour Comprendre les Tables de Hachage (Hash Tables)**

---

Les **tables de hachage** sont l'une des structures de données les plus importantes et couramment utilisées en informatique. Voici un guide complet pour comprendre leur fonctionnement, étape par étape.

---

## **1. Qu'est-ce qu'une Table de Hachage ?**

**Une table de hachage est une structure de données qui stocke des paires clé-valeur.**  
Elle permet de récupérer rapidement une valeur à partir de sa clé, souvent en temps constant, grâce à une **fonction de hachage**.

### **Pourquoi utiliser une table de hachage ?**

- **Rapidité** : Les recherches, insertions et suppressions sont rapides (environ O(1) en moyenne).
- **Simplicité** : Accéder à une valeur à partir d'une clé est intuitif.
- **Utilisations courantes** :
    - Répertoires téléphoniques (nom → numéro).
    - Indexation des bases de données.
    - Systèmes de cache.

---

## **2. Concepts Clés**

### **2.1 Les Clés et les Valeurs**

- **Clé** : Une donnée unique (ex. : "Nom", "Identifiant").
- **Valeur** : La donnée associée à cette clé (ex. : "Âge", "Score").

|Clé|Valeur|
|---|---|
|"Alice"|25|
|"Bob"|30|
|"Charlie"|35|

### **2.2 La Fonction de Hachage**

Une **fonction de hachage** transforme une clé en un **indice** dans un tableau.

#### Exemple :

Si on a un tableau de taille 10 et une clé `"Alice"`, la fonction de hachage calcule un indice entre 0 et 9.

**Fonction de Hachage Exemple :**

```c
unsigned int hash(const char *key) {
    unsigned int hash = 0;
    while (*key) {
        hash = (hash * 31) + *key++; // Multiplier par 31 et ajouter le code ASCII
    }
    return hash % TABLE_SIZE; // Réduire dans la plage [0, TABLE_SIZE-1]
}
```

### **2.3 Les Collisions**

Deux clés peuvent produire le **même indice** (collision).  
**Exemple :**

- Clé `"Alice"` donne l'indice 2.
- Clé `"Eve"` donne aussi l'indice 2.

Pour résoudre ce problème, on utilise :

1. **Chaining** : Une liste chaînée par indice.
2. **Open Addressing** : Chercher une autre position libre dans le tableau.

---

## **3. Comment Fonctionne une Table de Hachage ?**

1. **Insertion**
    
    - Convertir la clé en un indice avec la fonction de hachage.
    - Placer la valeur dans la case correspondante ou gérer les collisions.
2. **Recherche**
    
    - Hacher la clé pour obtenir l'indice.
    - Parcourir la liste chaînée (ou trouver la case directement).
3. **Suppression**
    
    - Retirer un élément dans la liste chaînée ou marquer la case comme "supprimée".

---

## **4. Exemple Visuel**

|Indice|Liste Chaînée|
|---|---|
|0|NULL|
|1|["Eve" → 40] → NULL|
|2|["Alice" → 25] → ["Bob" → 30] → NULL|
|3|NULL|
|...|...|

---

## **5. Avantages et Inconvénients**

### **Avantages**

- Très rapide pour rechercher, insérer et supprimer des éléments.
- Facile à implémenter pour de nombreuses applications.

### **Inconvénients**

- Les collisions peuvent réduire les performances.
- La fonction de hachage doit être bien conçue.
- La gestion dynamique (agrandissement) peut être complexe.

---

## **6. Exemple Complet en C**

Voici un programme complet pour insérer, rechercher et supprimer des éléments dans une table de hachage :

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TABLE_SIZE 10

typedef struct Node {
    char *key;
    int value;
    struct Node *next;
} Node;

typedef struct HashTable {
    Node *buckets[TABLE_SIZE];
} HashTable;

// Fonction de hachage
unsigned int hash(const char *key) {
    unsigned int hash = 0;
    while (*key) {
        hash = (hash * 31) + *key++;
    }
    return hash % TABLE_SIZE;
}

// Créer une table de hachage
HashTable *create_table() {
    HashTable *table = malloc(sizeof(HashTable));
    if (!table) exit(EXIT_FAILURE);
    for (int i = 0; i < TABLE_SIZE; i++) table->buckets[i] = NULL;
    return table;
}

// Insertion
void insert(HashTable *table, const char *key, int value) {
    unsigned int index = hash(key);
    Node *new_node = malloc(sizeof(Node));
    new_node->key = strdup(key);
    new_node->value = value;
    new_node->next = table->buckets[index];
    table->buckets[index] = new_node;
}

// Recherche
int search(HashTable *table, const char *key) {
    unsigned int index = hash(key);
    Node *current = table->buckets[index];
    while (current) {
        if (strcmp(current->key, key) == 0) return current->value;
        current = current->next;
    }
    return -1; // Non trouvé
}

// Suppression
void delete(HashTable *table, const char *key) {
    unsigned int index = hash(key);
    Node *current = table->buckets[index];
    Node *prev = NULL;

    while (current) {
        if (strcmp(current->key, key) == 0) {
            if (prev) prev->next = current->next;
            else table->buckets[index] = current->next;
            free(current->key);
            free(current);
            return;
        }
        prev = current;
        current = current->next;
    }
}

// Affichage
void display(HashTable *table) {
    for (int i = 0; i < TABLE_SIZE; i++) {
        printf("Bucket %d: ", i);
        Node *current = table->buckets[i];
        while (current) {
            printf("[%s: %d] -> ", current->key, current->value);
            current = current->next;
        }
        printf("NULL\n");
    }
}

// Libérer la mémoire
void free_table(HashTable *table) {
    for (int i = 0; i < TABLE_SIZE; i++) {
        Node *current = table->buckets[i];
        while (current) {
            Node *temp = current;
            current = current->next;
            free(temp->key);
            free(temp);
        }
    }
    free(table);
}

// Main
int main() {
    HashTable *table = create_table();

    insert(table, "Alice", 25);
    insert(table, "Bob", 30);
    insert(table, "Eve", 40);

    display(table);

    printf("Recherche de Bob: %d\n", search(table, "Bob"));
    delete(table, "Alice");

    display(table);
    free_table(table);

    return 0;
}
```

---

## **7. Points Clés à Retenir**

- **Une fonction de hachage efficace** réduit les collisions.
- Les **collisions** sont inévitables, mais peuvent être bien gérées avec des listes chaînées ou des sondages.
- Toujours **tester** la table avec des cas limites :
    - Clés similaires.
    - Tableau plein.

---

## **8. Pour Aller Plus Loin**

- Étudier les autres méthodes de gestion des collisions : **Open Addressing**, **Double Hashing**.
- Implémenter des **tables dynamiques** qui redimensionnent leur taille automatiquement.
- Explorer les implémentations avancées comme les **Bloom Filters**.

---

Avec cette compréhension complète, vous êtes prêt à maîtriser les tables de hachage et à les appliquer dans vos projets ou entretiens techniques ! 🚀