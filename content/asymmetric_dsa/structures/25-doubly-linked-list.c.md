### 📂 **Créer une Liste Doublement Chaînée** ([[25-doubly-linked-list.c]])

---

Une **liste doublement chaînée** est une structure de données avancée où chaque élément (ou nœud) pointe vers **le suivant et le précédent** dans la liste. Elle permet une navigation dans les deux directions et offre plus de flexibilité que les listes simplement chaînées.

---

## **1. Pourquoi utiliser une Liste Doublement Chaînée ?**

### Avantages :

1. **Navigation bidirectionnelle** :
    - Vous pouvez parcourir la liste dans les deux sens (avant et arrière).
2. **Insertion et suppression efficaces** :
    - Pas besoin de parcourir toute la liste pour insérer ou supprimer un élément à une position spécifique.
3. **Flexibilité accrue** :
    - Utile pour des structures comme des piles, des files d'attente et des itérateurs.

### Inconvénients :

- **Utilisation de mémoire** : Chaque nœud stocke deux pointeurs supplémentaires (vers le précédent et le suivant).
- **Complexité accrue** : Les opérations sont plus complexes que dans une liste simplement chaînée.

---

## **2. Structure d'une Liste Doublement Chaînée**

### Représentation d'un nœud :

Chaque nœud contient :

- Une **valeur** (les données).
- Un pointeur vers le **nœud suivant**.
- Un pointeur vers le **nœud précédent**.

```c
typedef struct Node {
    int data;                // Les données du nœud
    struct Node *next;       // Pointeur vers le nœud suivant
    struct Node *prev;       // Pointeur vers le nœud précédent
} Node;
```

### Représentation de la liste :

La liste est représentée par un **pointeur vers le premier nœud (head)** et parfois vers le dernier nœud (tail).

```c
typedef struct DoublyLinkedList {
    Node *head;              // Premier nœud de la liste
    Node *tail;              // Dernier nœud de la liste (facultatif)
} DoublyLinkedList;
```

---

## **3. Implémentation Complète**

Voici une implémentation complète avec les opérations courantes sur une liste doublement chaînée.

### **Structure des Données**

```c
#include <stdio.h>
#include <stdlib.h>

// Définir un nœud de la liste doublement chaînée
typedef struct Node {
    int data;                // Les données stockées dans le nœud
    struct Node *next;       // Pointeur vers le nœud suivant
    struct Node *prev;       // Pointeur vers le nœud précédent
} Node;

// Définir la structure de la liste
typedef struct DoublyLinkedList {
    Node *head;              // Pointeur vers le premier nœud
} DoublyLinkedList;
```

---

### **Créer une Liste Doublement Chaînée**

```c
DoublyLinkedList* create_list() {
    DoublyLinkedList *list = malloc(sizeof(DoublyLinkedList));
    if (!list) {
        fprintf(stderr, "Erreur d'allocation mémoire\n");
        exit(EXIT_FAILURE);
    }
    list->head = NULL; // La liste est vide au début
    return list;
}
```

---

### **Ajouter un Nœud en Tête**

```c
void insert_at_head(DoublyLinkedList *list, int data) {
    Node *new_node = malloc(sizeof(Node));
    if (!new_node) {
        fprintf(stderr, "Erreur d'allocation mémoire\n");
        exit(EXIT_FAILURE);
    }
    new_node->data = data;
    new_node->next = list->head; // L'ancien head devient le suivant
    new_node->prev = NULL;       // Aucun nœud avant le nouveau head

    if (list->head) {
        list->head->prev = new_node; // Met à jour le pointeur précédent de l'ancien head
    }
    list->head = new_node;          // Le nouveau nœud devient le head
}
```

---

### **Ajouter un Nœud en Fin**

```c
void insert_at_tail(DoublyLinkedList *list, int data) {
    Node *new_node = malloc(sizeof(Node));
    if (!new_node) {
        fprintf(stderr, "Erreur d'allocation mémoire\n");
        exit(EXIT_FAILURE);
    }
    new_node->data = data;
    new_node->next = NULL;

    if (!list->head) {
        // Si la liste est vide, le nouveau nœud devient le head
        new_node->prev = NULL;
        list->head = new_node;
        return;
    }

    // Parcourir la liste jusqu'au dernier nœud
    Node *current = list->head;
    while (current->next) {
        current = current->next;
    }

    current->next = new_node; // Mettre à jour le dernier nœud
    new_node->prev = current; // Mettre à jour le pointeur précédent
}
```

---

### **Supprimer un Nœud**

```c
void delete_node(DoublyLinkedList *list, int data) {
    Node *current = list->head;

    // Trouver le nœud à supprimer
    while (current && current->data != data) {
        current = current->next;
    }

    if (!current) {
        printf("Nœud avec la valeur %d non trouvé\n", data);
        return;
    }

    if (current->prev) {
        current->prev->next = current->next;
    } else {
        // Si on supprime le head, mettre à jour le head
        list->head = current->next;
    }

    if (current->next) {
        current->next->prev = current->prev;
    }

    free(current);
}
```

---

### **Afficher la Liste**

```c
void display(DoublyLinkedList *list) {
    Node *current = list->head;
    printf("Liste: ");
    while (current) {
        printf("%d <-> ", current->data);
        current = current->next;
    }
    printf("NULL\n");
}
```

---

## **4. Exemple d'Utilisation**

Voici un programme principal pour tester la liste doublement chaînée.

```c
int main() {
    DoublyLinkedList *list = create_list();

    insert_at_head(list, 10);
    insert_at_head(list, 20);
    insert_at_tail(list, 30);

    display(list); // Résultat: 20 <-> 10 <-> 30 <-> NULL

    delete_node(list, 10);
    display(list); // Résultat: 20 <-> 30 <-> NULL

    delete_node(list, 40); // Nœud non trouvé

    return 0;
}
```

---

## **5. Résumé**

1. Une **liste doublement chaînée** permet de naviguer et manipuler les éléments dans les deux sens.
2. Les opérations principales incluent :
    - **Ajout en tête**.
    - **Ajout en fin**.
    - **Suppression d’un nœud**.
    - **Affichage**.
3. Cette structure est particulièrement utile pour des applications où la navigation bidirectionnelle ou les suppressions fréquentes sont nécessaires.

Si quelque chose n'est pas clair ou si vous voulez des exemples spécifiques, n’hésitez pas à demander ! 😊