```ad-info
title: Info
Ce document explique comment **ajouter une arête dans un graphe** représenté sous forme de **liste d'adjacence**, en respectant les conventions de la 42 School. Une arête relie deux sommets dans le graphe et peut être directionnelle ou bidirectionnelle.
```

---

# 🏆 Contexte et Objectif

Ajouter une arête est une opération essentielle pour construire ou modifier un graphe. Dans une représentation par **liste d'adjacence**, ajouter une arête consiste à:

1. Créer un nouveau nœud d’adjacence.
2. L’ajouter à la liste d’adjacence du sommet source.
3. (Optionnel) Ajouter une arête inverse pour un graphe **non dirigé**.

---

# 💻 Code: `20-add-edge.c`

```c
#include <stdlib.h>
#include <stdio.h>

// Structure pour un nœud d’adjacence
typedef struct s_adj_node
{
    int                 vertex;    // Le sommet connecté
    struct s_adj_node   *next;     // Pointeur vers le prochain nœud
}               t_adj_node;

// Structure pour le graphe
typedef struct s_graph
{
    int         num_vertices;      // Nombre de sommets dans le graphe
    t_adj_node  **adj_lists;       // Tableau de pointeurs vers les listes d'adjacence
}               t_graph;

// Fonction pour créer un nœud d’adjacence
t_adj_node *create_adj_node(int vertex)
{
    t_adj_node *new_node;

    new_node = malloc(sizeof(t_adj_node));
    if (!new_node)
    {
        perror("Erreur d'allocation mémoire pour le nœud");
        exit(EXIT_FAILURE);
    }
    new_node->vertex = vertex;
    new_node->next = NULL;
    return (new_node);
}

// Ajouter une arête directionnelle au graphe
void add_edge(t_graph *graph, int src, int dest)
{
    t_adj_node *new_node;

    if (!graph || src >= graph->num_vertices || dest >= graph->num_vertices)
    {
        printf("Erreur : Sommets invalides\n");
        return;
    }

    // Ajouter dest à la liste d'adjacence de src
    new_node = create_adj_node(dest);
    new_node->next = graph->adj_lists[src];
    graph->adj_lists[src] = new_node;
}

// Ajouter une arête non directionnelle au graphe
void add_undirected_edge(t_graph *graph, int src, int dest)
{
    add_edge(graph, src, dest);
    add_edge(graph, dest, src);
}

// Fonction pour afficher le graphe
void print_graph(t_graph *graph)
{
    int         i;
    t_adj_node  *temp;

    if (!graph)
        return;

    i = 0;
    while (i < graph->num_vertices)
    {
        printf("Sommet %d : ", i);
        temp = graph->adj_lists[i];
        while (temp)
        {
            printf("%d -> ", temp->vertex);
            temp = temp->next;
        }
        printf("NULL\n");
        i++;
    }
}

// Fonction principale pour démonstration
int main(void)
{
    t_graph *graph;
    int     num_vertices;

    num_vertices = 5;
    graph = malloc(sizeof(t_graph));
    if (!graph)
    {
        perror("Erreur d'allocation mémoire pour le graphe");
        return (1);
    }
    graph->num_vertices = num_vertices;
    graph->adj_lists = malloc(num_vertices * sizeof(t_adj_node *));
    if (!graph->adj_lists)
    {
        perror("Erreur d'allocation mémoire pour les listes");
        free(graph);
        return (1);
    }

    for (int i = 0; i < num_vertices; i++)
        graph->adj_lists[i] = NULL;

    add_edge(graph, 0, 1);
    add_edge(graph, 0, 4);
    add_edge(graph, 1, 2);
    add_edge(graph, 1, 3);
    add_edge(graph, 1, 4);
    add_edge(graph, 3, 4);

    printf("Graphe (arêtes directionnelles) :\n");
    print_graph(graph);

    printf("\nAjouter des arêtes non directionnelles :\n");
    add_undirected_edge(graph, 2, 3);
    add_undirected_edge(graph, 4, 0);
    print_graph(graph);

    return (0);
}
```

---

# 🔎 Analyse Ligne par Ligne

### **1. Fonction `add_edge`**

```c
void add_edge(t_graph *graph, int src, int dest)
{
    t_adj_node *new_node;

    if (!graph || src >= graph->num_vertices || dest >= graph->num_vertices)
    {
        printf("Erreur : Sommets invalides\n");
        return;
    }

    new_node = create_adj_node(dest);
    new_node->next = graph->adj_lists[src];
    graph->adj_lists[src] = new_node;
}
```

- **`src` et `dest`** :
    - `src` : Sommet source de l’arête.
    - `dest` : Sommet destination.
- **Vérification des indices** :
    - Vérifie que les sommets `src` et `dest` sont valides (entre `0` et `num_vertices - 1`).
- **Ajout dans la liste d'adjacence** :
    - Le sommet `dest` est ajouté au début de la liste d'adjacence de `src`.

---

### **2. Fonction `add_undirected_edge`**

```c
void add_undirected_edge(t_graph *graph, int src, int dest)
{
    add_edge(graph, src, dest);
    add_edge(graph, dest, src);
}
```

- Ajoute deux arêtes :
    - Une de `src` à `dest`.
    - Une de `dest` à `src`.
- Permet de représenter des graphes **non dirigés**.

---

### **3. Fonction `print_graph`**

```c
void print_graph(t_graph *graph)
{
    int         i;
    t_adj_node  *temp;

    if (!graph)
        return;

    i = 0;
    while (i < graph->num_vertices)
    {
        printf("Sommet %d : ", i);
        temp = graph->adj_lists[i];
        while (temp)
        {
            printf("%d -> ", temp->vertex);
            temp = temp->next;
        }
        printf("NULL\n");
        i++;
    }
}
```

- Parcourt chaque sommet et affiche tous ses voisins.
- Chaque sommet est suivi de ses voisins connectés par des arêtes.

---

# 🧭 Complexité

|Opération|Complexité|Explication|
|---|---|---|
|**Ajout d’une arête**|O(1)|Insertion au début de la liste d'adjacence.|
|**Ajout non directionnel**|O(1) + O(1)|Deux insertions (une dans chaque direction).|
|**Affichage du graphe**|O(V + E)|Parcourt tous les sommets et leurs listes d'adjacence.|

- **V** : Nombre de sommets.
- **E** : Nombre d’arêtes.

---

# ✨ Conclusion

### **Ce que fait ce code** :

- Ajoute des arêtes directionnelles ou non directionnelles à un graphe.
- Permet d’afficher le graphe et de manipuler facilement sa structure.

### **Quand utiliser ce code ?**

- **Directionnel** : Pour modéliser des relations unilatérales (e.g., liens sur le Web).
- **Non directionnel** : Pour des relations bidirectionnelles (e.g., routes, connexions réseaux).

Avec cette implémentation, vous pouvez continuer à construire des algorithmes sur les graphes, comme des **parcours** (BFS, DFS), des **chemins les plus courts**, ou des **recherches de cycles**. 🎉