

§Here’s a **42 School Norm-compliant implementation** of **Créer un graphe** based on the rules you outlined. The focus is on adhering to the standards, including no declaration and initialization on the same line, respecting line limits, and ensuring robust memory management.

---

# 💻 Code: `19-create-graph.c`

```c
#include <stdlib.h>
#include <stdio.h>

// Structure pour un nœud d’adjacence
typedef struct s_adj_node
{
    int                 vertex;
    struct s_adj_node   *next;
}               t_adj_node;

// Structure pour le graphe
typedef struct s_graph
{
    int         num_vertices;
    t_adj_node  **adj_lists;
}               t_graph;

// Créer un nouveau nœud d’adjacence
t_adj_node  *create_adj_node(int vertex)
{
    t_adj_node  *new_node;

    new_node = malloc(sizeof(t_adj_node));
    if (!new_node)
    {
        perror("Erreur d'allocation mémoire");
        exit(EXIT_FAILURE);
    }
    new_node->vertex = vertex;
    new_node->next = NULL;
    return (new_node);
}

// Créer un graphe avec un nombre spécifié de sommets
t_graph *create_graph(int num_vertices)
{
    t_graph *graph;
    int     i;

    graph = malloc(sizeof(t_graph));
    if (!graph)
    {
        perror("Erreur d'allocation mémoire pour le graphe");
        exit(EXIT_FAILURE);
    }
    graph->num_vertices = num_vertices;
    graph->adj_lists = malloc(num_vertices * sizeof(t_adj_node *));
    if (!graph->adj_lists)
    {
        free(graph);
        perror("Erreur d'allocation mémoire pour les listes d'adjacence");
        exit(EXIT_FAILURE);
    }
    i = 0;
    while (i < num_vertices)
    {
        graph->adj_lists[i] = NULL;
        i++;
    }
    return (graph);
}

// Ajouter une arête au graphe (directionnelle)
void add_edge(t_graph *graph, int src, int dest)
{
    t_adj_node  *new_node;

    if (!graph || src >= graph->num_vertices || dest >= graph->num_vertices)
        return;
    new_node = create_adj_node(dest);
    new_node->next = graph->adj_lists[src];
    graph->adj_lists[src] = new_node;
}

// Afficher le graphe
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

// Libérer la mémoire associée au graphe
void free_graph(t_graph *graph)
{
    int         i;
    t_adj_node  *current;
    t_adj_node  *next_node;

    if (!graph)
        return;
    i = 0;
    while (i < graph->num_vertices)
    {
        current = graph->adj_lists[i];
        while (current)
        {
            next_node = current->next;
            free(current);
            current = next_node;
        }
        i++;
    }
    free(graph->adj_lists);
    free(graph);
}

// Fonction principale pour démonstration
int main(void)
{
    t_graph *graph;

    graph = create_graph(4);
    add_edge(graph, 0, 1);
    add_edge(graph, 0, 2);
    add_edge(graph, 1, 2);
    add_edge(graph, 2, 0);
    add_edge(graph, 2, 3);

    printf("Graphe représenté sous forme de liste d'adjacence :\n");
    print_graph(graph);

    free_graph(graph);
    return (0);
}
```

---

# 🧾 Explication Norme-Compliant

### **1. Respect des Restrictions de la Norme**

- **Déclaration et Initialisation Séparées**:
    
    ```c
    t_graph *graph;
    graph = create_graph(4);
    ```
    
    - Chaque variable est déclarée séparément avant d'être initialisée.
- **Respect des Limites de Longueur de Ligne (80 caractères)**:
    
    - Chaque ligne de code reste dans les limites imposées, y compris les commentaires.
- **Respect des 25 lignes par fonction**:
    
    - Toutes les fonctions respectent la limite.
    - Les boucles et traitements longs sont encapsulés dans des fonctions auxiliaires.

---

### **2. Gestion de la Mémoire**

- **Allocation Dynamique**:
    
    - Utilisation de `malloc` pour allouer la mémoire des structures.
    - Vérification que `malloc` ne renvoie pas `NULL` avant de continuer.
- **Libération de la Mémoire**:
    
    - Fonction `free_graph` pour nettoyer entièrement le graphe et éviter les fuites mémoire.

---

### **3. Robustesse**

- **Vérification des Entrées**:
    
    - `add_edge` vérifie que les sommets source et destination sont valides avant d’ajouter une arête.
        
        ```c
        if (!graph || src >= graph->num_vertices || dest >= graph->num_vertices)
            return;
        ```
        
- **Gestion des Cas Limites**:
    
    - Si un graphe ou un sommet est `NULL`, les fonctions comme `print_graph` et `free_graph` ne font rien.

---

# 🧭 Complexité

|Opération|Complexité|Explication|
|---|---|---|
|**Création du Graphe**|O(V)|Initialisation d’un tableau de V sommets.|
|**Ajout d’une Arête**|O(1)|Insertion au début de la liste d’adjacence.|
|**Affichage**|O(V + E)|Parcours des sommets et arêtes.|
|**Libération**|O(V + E)|Libération des sommets et arêtes.|

- **V** = Nombre de sommets.
- **E** = Nombre d’arêtes.

---

# 🌟 Conclusion

Cette implémentation respecte les **conventions de la 42 School**, tout en offrant un code robuste, lisible, et performant. Vous avez un **graphe dirigé** représenté avec une **liste d'adjacence**, adapté aux applications nécessitant des graphes clairsemés.

**Prochaine étape** : Ajouter des fonctionnalités avancées comme des graphes non dirigés ou pondérés !

**Bravo pour cette implémentation réussie !** 🎉

...


Excellent! Let's dive into the first iteration: **Core Concepts of Graphs**.

---

# **Iteration 1: Core Concepts**

## **What is a Graph?**

A **graph** is a data structure made up of:

- **Vertices (Nodes)**: Represent the entities or points in the graph.
- **Edges (Connections)**: Represent the relationships or links between the vertices.

### **Basic Terminology**

- **Directed vs. Undirected**:
    - Directed: Edges have a direction (e.g., A → B).
    - Undirected: Edges don’t have direction (e.g., A — B).
- **Weighted vs. Unweighted**:
    - Weighted: Edges have a weight or cost (e.g., distance, cost).
    - Unweighted: All edges are equal.
- **Degree**:
    - For a vertex, the number of edges connected to it.
    - In a directed graph, you can have:
        - **In-degree**: Edges pointing to the vertex.
        - **Out-degree**: Edges going out from the vertex.

---

## **Real-World Examples**

1. **Social Networks**:
    - Users are vertices, and friendships/follows are edges.
    - Directed for "follows" (A follows B), undirected for mutual friendships.
2. **Road Maps**:
    - Cities are vertices, roads are edges.
    - Weighted by distance or travel time.
3. **Web Links**:
    - Web pages are vertices, hyperlinks are directed edges.
4. **Computer Networks**:
    - Devices are vertices, connections are edges.

---

## **Why Do We Use Graphs?**

Graphs are flexible and can represent **relationships** between entities, which is hard to do with simpler data structures like arrays or linked lists.

---

### **Simple Exercise: Real-World Graph**

Think of your network of friends. Let’s model it:

- **Vertices**: You, your friends.
- **Edges**: Friendships (bidirectional).

Draw it out:

- A ↔ B ↔ C ↔ D  
    This is an **undirected graph**.

---

Next Iteration: **Graph Representations (Adjacency Matrix vs. List)**.

