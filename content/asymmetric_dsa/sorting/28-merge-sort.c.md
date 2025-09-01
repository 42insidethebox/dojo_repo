### 📂 **Tri par Fusion (Merge Sort)** ([[28-merge-sort.c]])

Le **Tri par Fusion (Merge Sort)** est un algorithme de tri basé sur le paradigme **diviser pour régner**. Il divise récursivement un tableau en sous-tableaux, trie chaque sous-tableau, puis les fusionne pour produire un tableau trié.

---

## **1. Pourquoi Utiliser le Tri par Fusion ?**

### **Avantages :**

1. **Complexité stable :**
    - Temps de tri garanti en **O(n log n)**, quel que soit l’état initial du tableau.
2. **Stable :**
    - Maintient l’ordre relatif des éléments ayant des valeurs égales.
3. **Efficace pour des grandes listes :**
    - Particulièrement adapté pour des structures de données non contiguës (listes chaînées).

### **Inconvénients :**

1. **Utilisation mémoire élevée :**
    - Nécessite de la mémoire supplémentaire pour fusionner les sous-tableaux.
2. **Performances moindres sur des petites listes :**
    - Plus lent que d'autres algorithmes comme le Tri par Insertion pour des petits ensembles.

---

## **2. Principe du Tri par Fusion**

1. **Diviser** :
    
    - Diviser le tableau en deux moitiés jusqu'à ce qu'il ne reste que des sous-tableaux de taille 1 (ou 0, déjà triés).
2. **Fusionner** :
    
    - Fusionner les sous-tableaux triés en respectant l'ordre croissant.

---

### **Exemple :**

#### Tableau initial :

`[5, 3, 8, 4, 2, 7, 1, 10]`

1. Diviser récursivement :
    
    - `[5, 3, 8, 4]` et `[2, 7, 1, 10]`
    - `[5, 3]`, `[8, 4]`, `[2, 7]`, `[1, 10]`
    - `[5]`, `[3]`, `[8]`, `[4]`, `[2]`, `[7]`, `[1]`, `[10]`
2. Fusionner les sous-tableaux :
    
    - `[3, 5]`, `[4, 8]`, `[2, 7]`, `[1, 10]`
    - `[3, 4, 5, 8]`, `[1, 2, 7, 10]`
    - `[1, 2, 3, 4, 5, 7, 8, 10]`

---

## **3. Implémentation en C**

Voici une implémentation conforme aux normes de l'École 42.

### **Code Source**

```c
#include <stdio.h>
#include <stdlib.h>

// Fonction pour fusionner deux sous-tableaux
void merge(int *arr, int low, int mid, int high)
{
    int n1, n2, i, j, k;
    int *left;
    int *right;

    n1 = mid - low + 1;
    n2 = high - mid;

    // Créer les sous-tableaux
    left = (int *)malloc(n1 * sizeof(int));
    right = (int *)malloc(n2 * sizeof(int));
    if (!left || !right)
    {
        fprintf(stderr, "Erreur d'allocation mémoire\n");
        exit(EXIT_FAILURE);
    }

    i = 0;
    while (i < n1)
    {
        left[i] = arr[low + i];
        i++;
    }
    j = 0;
    while (j < n2)
    {
        right[j] = arr[mid + 1 + j];
        j++;
    }

    // Fusionner les deux sous-tableaux
    i = 0;
    j = 0;
    k = low;
    while (i < n1 && j < n2)
    {
        if (left[i] <= right[j])
        {
            arr[k] = left[i];
            i++;
        }
        else
        {
            arr[k] = right[j];
            j++;
        }
        k++;
    }

    // Copier les éléments restants
    while (i < n1)
    {
        arr[k] = left[i];
        i++;
        k++;
    }
    while (j < n2)
    {
        arr[k] = right[j];
        j++;
        k++;
    }

    free(left);
    free(right);
}

// Fonction récursive pour le tri par fusion
void merge_sort(int *arr, int low, int high)
{
    int mid;

    if (low < high)
    {
        mid = low + (high - low) / 2;

        merge_sort(arr, low, mid);       // Trier la moitié gauche
        merge_sort(arr, mid + 1, high); // Trier la moitié droite

        merge(arr, low, mid, high);     // Fusionner les deux moitiés
    }
}

// Fonction pour afficher un tableau
void print_array(int *arr, int size)
{
    int i;

    i = 0;
    while (i < size)
    {
        printf("%d ", arr[i]);
        i++;
    }
    printf("\n");
}

// Programme principal
int main(void)
{
    int arr[] = {5, 3, 8, 4, 2, 7, 1, 10};
    int n;

    n = sizeof(arr) / sizeof(arr[0]);

    printf("Tableau initial : ");
    print_array(arr, n);

    merge_sort(arr, 0, n - 1);

    printf("Tableau trié : ");
    print_array(arr, n);

    return (0);
}
```

---

## **4. Explications**

### **4.1 Fonction `merge`**

- Fusionne deux sous-tableaux triés (`left` et `right`) dans le tableau principal.
- Copie les éléments dans l’ordre croissant en comparant les éléments des sous-tableaux.

### **4.2 Fonction `merge_sort`**

- Divise récursivement le tableau en deux moitiés.
- Une fois que chaque sous-tableau est réduit à une taille de 1, fusionne-les en utilisant `merge`.

### **4.3 Allocation Mémoire**

- La fusion nécessite de créer des tableaux temporaires pour stocker les sous-tableaux.
- Ces tableaux sont libérés après usage pour éviter des fuites de mémoire.

---

## **5. Complexité**

|**Cas**|**Complexité Temporelle**|**Explication**|
|---|---|---|
|**Meilleur Cas**|O(n log n)|Divisions équilibrées et fusion efficace.|
|**Pire Cas**|O(n log n)|Toujours divise et fusionne de manière similaire.|
|**Cas Moyen**|O(n log n)|Performances constantes pour toutes les entrées.|

**Complexité spatiale** : O(n)

- Nécessite un espace supplémentaire pour les sous-tableaux temporaires.

---

## **6. Résultat**

### **Entrée :**

```text
Tableau initial : 5 3 8 4 2 7 1 10
```

### **Sortie :**

```text
Tableau trié : 1 2 3 4 5 7 8 10
```

---

## **7. Comparaison avec Quick Sort**

|**Critère**|**Merge Sort**|**Quick Sort**|
|---|---|---|
|**Complexité**|O(n log n) dans tous les cas|O(n log n) en moyenne, O(n²) pire cas|
|**Espace mémoire**|O(n)|O(log n) (avec récursion optimisée)|
|**Stabilité**|Oui|Non|
|**Utilisation**|Listes chaînées, données volumineuses|Données contiguës (ex. tableaux)|

---

## **8. Résumé**

1. Le **Merge Sort** est un algorithme stable et performant pour des ensembles de données de grande taille.
2. Il garantit une complexité de **O(n log n)** mais consomme plus de mémoire que Quick Sort.
3. Particulièrement utile pour des structures non contiguës comme les listes chaînées.

Si vous avez besoin d’un autre exemple ou d’un point spécifique à approfondir, faites-le-moi savoir ! 😊

Yes, **Merge Sort** works recursively! It's a classic example of the **divide-and-conquer** paradigm, where the algorithm solves a problem by breaking it into smaller subproblems, solving each recursively, and then combining their solutions.

---

## **How Merge Sort Works Recursively**

### **Steps of the Algorithm**

1. **Divide**:
    
    - The array is divided into two halves.
    - This division continues recursively until each subarray contains **one element** (which is inherently sorted).
2. **Conquer (Sort Subarrays)**:
    
    - Each subarray is processed recursively using `merge_sort()`.
3. **Combine (Merge)**:
    
    - The `merge()` function combines two sorted subarrays into a single sorted array.

---

### **Recursive Flow**

Imagine the input array: `[5, 3, 8, 4, 2, 7, 1, 10]`

#### Step-by-Step Breakdown:

1. **First Split**:
    
    - Divide into two halves:
        - Left: `[5, 3, 8, 4]`
        - Right: `[2, 7, 1, 10]`
2. **Recurse on Left** (`[5, 3, 8, 4]`):
    
    - Divide: `[5, 3]` and `[8, 4]`
    - Recurse further:
        - `[5]` and `[3]` → Merge to `[3, 5]`
        - `[8]` and `[4]` → Merge to `[4, 8]`
    - Merge `[3, 5]` and `[4, 8]` → `[3, 4, 5, 8]`
3. **Recurse on Right** (`[2, 7, 1, 10]`):
    
    - Divide: `[2, 7]` and `[1, 10]`
    - Recurse further:
        - `[2]` and `[7]` → Merge to `[2, 7]`
        - `[1]` and `[10]` → Merge to `[1, 10]`
    - Merge `[2, 7]` and `[1, 10]` → `[1, 2, 7, 10]`
4. **Final Merge**:
    
    - Merge `[3, 4, 5, 8]` and `[1, 2, 7, 10]` → `[1, 2, 3, 4, 5, 7, 8, 10]`

---

### **Recursive Tree Representation**

Here’s how the recursion works visually:

```
merge_sort([5, 3, 8, 4, 2, 7, 1, 10])
    ├─ merge_sort([5, 3, 8, 4])
    │      ├─ merge_sort([5, 3])
    │      │      ├─ merge_sort([5])
    │      │      ├─ merge_sort([3])
    │      │      └─ merge([5], [3]) → [3, 5]
    │      ├─ merge_sort([8, 4])
    │      │      ├─ merge_sort([8])
    │      │      ├─ merge_sort([4])
    │      │      └─ merge([8], [4]) → [4, 8]
    │      └─ merge([3, 5], [4, 8]) → [3, 4, 5, 8]
    ├─ merge_sort([2, 7, 1, 10])
    │      ├─ merge_sort([2, 7])
    │      │      ├─ merge_sort([2])
    │      │      ├─ merge_sort([7])
    │      │      └─ merge([2], [7]) → [2, 7]
    │      ├─ merge_sort([1, 10])
    │      │      ├─ merge_sort([1])
    │      │      ├─ merge_sort([10])
    │      │      └─ merge([1], [10]) → [1, 10]
    │      └─ merge([2, 7], [1, 10]) → [1, 2, 7, 10]
    └─ merge([3, 4, 5, 8], [1, 2, 7, 10]) → [1, 2, 3, 4, 5, 7, 8, 10]
```

---

### **How Recursion Ends**

- The recursion **stops** when the subarray contains only one element (`low >= high`).
- At that point, the subarray is considered sorted, and no further splitting occurs.

---

## **Why Merge Sort Is Naturally Recursive**

1. **Divide-and-Conquer Paradigm**:
    
    - Merge Sort inherently splits the problem into smaller subproblems until they are trivially solvable (one element).
    - Recursion is the natural way to implement this repeated splitting.
2. **Implicit Stack Management**:
    
    - Each recursive call handles its portion of the array.
    - The call stack keeps track of `low`, `high`, and `mid` values for each split, avoiding manual bookkeeping.

---

## **Key Points About Merge Sort Recursion**

- Recursion depth is **logarithmic**: `O(log n)` because the array is divided in half at each step.
- Work at each level is **linear**: `O(n)` because merging requires scanning all elements once.
- Overall time complexity is **O(n log n)**.

If recursion is still unclear or you'd like iterative Merge Sort explained, let me know! 😊

### 📂 **Tri par Fusion Ultra-Abstrait et Modulaire (Merge Sort)** ([[28-merge-sort.c]])

Voici une **implémentation hautement abstraite** du **Tri par Fusion (Merge Sort)** en **C**, conçue pour maximiser la lisibilité et l'abstraction en décomposant les opérations en fonctions distinctes et descriptives. Cette approche respecte les **normes de l'École 42**, évitant les boucles `for` et séparant les déclarations des affectations.

```c
#include <stdio.h>
#include <stdlib.h>

// Prototypes des fonctions
void print_array(int *arr, int size);
int *allocate_memory(int size);
int calculate_midpoint(int low, int high);
void copy_elements(int *source, int *destination, int start, int end);
void merge_subarrays(int *arr, int low, int mid, int high, int *temp);
void handle_remaining_elements(int *arr, int *temp, int low, int mid, int high, int *left_exhausted);
void copy_back(int *arr, int *temp, int low, int high);
void sort_recursive(int *arr, int low, int high, int *temp);
void perform_merge_sort(int *arr, int size);

// Fonction pour afficher un tableau
void print_array(int *arr, int size)
{
    int index;

    index = 0;
    while (index < size)
    {
        printf("%d ", arr[index]);
        index++;
    }
    printf("\n");
}

// Fonction pour allouer de la mémoire sécurisée
int *allocate_memory(int size)
{
    int *memory;

    memory = malloc(size * sizeof(int));
    if (!memory)
    {
        fprintf(stderr, "Erreur d'allocation mémoire\n");
        exit(EXIT_FAILURE);
    }
    return (memory);
}

// Fonction pour calculer le point médian
int calculate_midpoint(int low, int high)
{
    return (low + (high - low) / 2);
}

// Fonction pour copier une portion du tableau source vers le tableau destination
void copy_elements(int *source, int *destination, int start, int end)
{
    int index;

    index = start;
    while (index <= end)
    {
        destination[index] = source[index];
        index++;
    }
}

// Fonction pour fusionner deux sous-tableaux triés dans temp
void merge_subarrays(int *arr, int low, int mid, int high, int *temp)
{
    int left_index;
    int right_index;
    int merge_index;
    int left_exhausted;

    left_index = low;
    right_index = mid + 1;
    merge_index = low;
    left_exhausted = 0;

    while (left_index <= mid && right_index <= high)
    {
        if (arr[left_index] <= arr[right_index])
        {
            temp[merge_index] = arr[left_index];
            left_index++;
        }
        else
        {
            temp[merge_index] = arr[right_index];
            right_index++;
        }
        merge_index++;
    }
    handle_remaining_elements(arr, temp, low, mid, high, &left_exhausted);
    copy_back(arr, temp, low, high);
}

// Fonction pour gérer les éléments restants après la fusion
void handle_remaining_elements(int *arr, int *temp, int low, int mid, int high, int *left_exhausted)
{
    while (low <= mid)
    {
        temp[low] = arr[low];
        low++;
    }
    while (mid + 1 <= high)
    {
        temp[mid + 1] = arr[mid + 1];
        mid++;
    }
}

// Fonction pour copier les éléments triés de temp de retour dans arr
void copy_back(int *arr, int *temp, int low, int high)
{
    int index;

    index = low;
    while (index <= high)
    {
        arr[index] = temp[index];
        index++;
    }
}

// Fonction récursive principale pour le tri par fusion
void sort_recursive(int *arr, int low, int high, int *temp)
{
    int mid;

    if (low < high)
    {
        mid = calculate_midpoint(low, high);
        sort_recursive(arr, low, mid, temp);        // Trier la première moitié
        sort_recursive(arr, mid + 1, high, temp);   // Trier la seconde moitié
        merge_subarrays(arr, low, mid, high, temp); // Fusionner les deux moitiés
    }
}

// Fonction principale du tri par fusion
void perform_merge_sort(int *arr, int size)
{
    int *temp;

    temp = allocate_memory(size);
    copy_elements(arr, temp, 0, size - 1); // Initialiser temp avec les éléments de arr
    sort_recursive(arr, 0, size - 1, temp);
    free(temp);
}

// Programme principal
int main(void)
{
    int arr[] = {5, 3, 8, 4, 2, 7, 1, 10};
    int n;

    n = sizeof(arr) / sizeof(arr[0]);

    printf("Tableau initial : ");
    print_array(arr, n);

    perform_merge_sort(arr, n);

    printf("Tableau trié : ");
    print_array(arr, n);

    return (0);
}
```

---

## 🧩 **Explications Détaillées**

### **1. Fonction `main`**

- **Initialisation du Tableau** : Déclare et initialise un tableau d'entiers non triés.
- **Calcul de la Taille** : Utilise `sizeof` pour déterminer le nombre d'éléments dans le tableau.
- **Affichage Initial** : Appelle `print_array` pour afficher le tableau avant le tri.
- **Appel au Tri par Fusion** : Appelle `perform_merge_sort` pour trier le tableau.
- **Affichage Final** : Appelle `print_array` pour afficher le tableau après le tri.

### **2. Fonction `print_array`**

- **Objectif** : Afficher les éléments d'un tableau séparés par des espaces.
- **Paramètres** :
    - `int *arr` : Pointeur vers le tableau à afficher.
    - `int size` : Nombre d'éléments dans le tableau.
- **Méthode** : Utilise une boucle `while` pour parcourir et afficher chaque élément.

### **3. Fonction `allocate_memory`**

- **Objectif** : Allouer de la mémoire pour un tableau temporaire utilisé lors de la fusion.
- **Paramètres** :
    - `int size` : Taille du tableau à allouer.
- **Retourne** : Pointeur vers le tableau temporaire alloué.
- **Sécurité** : Vérifie si l'allocation a réussi. Si non, affiche une erreur et termine le programme.

### **4. Fonction `calculate_midpoint`**

- **Objectif** : Calculer le point médian d'un sous-tableau.
- **Paramètres** :
    - `int low` : Indice de début du sous-tableau.
    - `int high` : Indice de fin du sous-tableau.
- **Retourne** : Indice médian.

### **5. Fonction `copy_elements`**

- **Objectif** : Copier une portion du tableau source dans le tableau destination.
- **Paramètres** :
    - `int *source` : Pointeur vers le tableau source.
    - `int *destination` : Pointeur vers le tableau destination.
    - `int start` : Indice de début de la portion à copier.
    - `int end` : Indice de fin de la portion à copier.
- **Méthode** : Utilise une boucle `while` pour copier chaque élément de `source` à `destination`.

### **6. Fonction `merge_subarrays`**

- **Objectif** : Fusionner deux sous-tableaux triés en un seul sous-tableau trié dans `temp`.
- **Paramètres** :
    - `int *arr` : Pointeur vers le tableau principal.
    - `int low` : Indice de début du premier sous-tableau.
    - `int mid` : Indice de fin du premier sous-tableau.
    - `int high` : Indice de fin du second sous-tableau.
    - `int *temp` : Pointeur vers le tableau temporaire.
- **Méthode** :
    - Initialise les indices pour les deux sous-tableaux.
    - Compare les éléments des deux sous-tableaux et copie le plus petit dans `temp`.
    - Gère les éléments restants en appelant `handle_remaining_elements`.
    - Copie les éléments triés de `temp` de retour dans `arr` via `copy_back`.

### **7. Fonction `handle_remaining_elements`**

- **Objectif** : Gérer les éléments restants après la fusion des sous-tableaux.
- **Paramètres** :
    - `int *arr` : Pointeur vers le tableau principal.
    - `int *temp` : Pointeur vers le tableau temporaire.
    - `int low` : Indice de début du premier sous-tableau.
    - `int mid` : Indice de fin du premier sous-tableau.
    - `int high` : Indice de fin du second sous-tableau.
    - `int *left_exhausted` : Pointeur utilisé pour indiquer quel sous-tableau est épuisé (optionnel dans cette implémentation).
- **Méthode** :
    - Copie les éléments restants du premier sous-tableau dans `temp`.
    - Copie les éléments restants du second sous-tableau dans `temp`.

### **8. Fonction `copy_back`**

- **Objectif** : Copier les éléments triés de `temp` de retour dans le tableau original `arr`.
- **Paramètres** :
    - `int *arr` : Pointeur vers le tableau principal.
    - `int *temp` : Pointeur vers le tableau temporaire.
    - `int low` : Indice de début de la portion à copier.
    - `int high` : Indice de fin de la portion à copier.
- **Méthode** : Utilise une boucle `while` pour copier chaque élément de `temp` à `arr` pour la portion spécifiée.

### **9. Fonction `sort_recursive`**

- **Objectif** : Diviser le tableau en sous-tableaux et les trier récursivement.
- **Paramètres** :
    - `int *arr` : Pointeur vers le tableau principal.
    - `int low` : Indice de début du sous-tableau.
    - `int high` : Indice de fin du sous-tableau.
    - `int *temp` : Pointeur vers le tableau temporaire.
- **Méthode** :
    - Vérifie si le sous-tableau contient plus d'un élément (`low < high`).
    - Calcule le point médian.
    - Trie récursivement la première moitié.
    - Trie récursivement la seconde moitié.
    - Fusionne les deux moitiés triées dans `temp`.
    - Copie les éléments triés de `temp` de retour dans `arr`.

### **10. Fonction `perform_merge_sort`**

- **Objectif** : Initialiser le tableau temporaire et lancer le tri par fusion.
- **Paramètres** :
    - `int *arr` : Pointeur vers le tableau principal.
    - `int size` : Taille du tableau.
- **Méthode** :
    - Alloue le tableau temporaire en appelant `allocate_memory`.
    - Initialise `temp` en copiant les éléments de `arr` via `copy_elements`.
    - Appelle `sort_recursive` avec les indices de début et de fin.
    - Libère la mémoire allouée pour le tableau temporaire après le tri.

---

## 🧩 **Avantages de cette Implémentation Ultra-Abstraite**

1. **Modularité** :
    
    - Chaque fonction a une responsabilité unique, facilitant la maintenance et la compréhension du code.
2. **Lisibilité** :
    
    - Les noms des fonctions sont descriptifs, reflétant clairement leur rôle dans l'algorithme.
3. **Conformité aux Normes de l'École 42** :
    
    - Pas de boucles `for`, utilisation de boucles `while`.
    - Déclarations et affectations sont séparées.
    - Limitation de la complexité des fonctions pour une meilleure lisibilité.
4. **Facilité d'Extension et d'Optimisation** :
    
    - La décomposition permet d'ajouter facilement des optimisations ou des fonctionnalités supplémentaires sans perturber la structure globale.

---

## 🧩 **Étapes pour Maîtriser cette Implémentation Abstraite**

1. **Comprendre Chaque Fonction Individuellement** :
    
    - Étudiez le rôle de chaque fonction et comment elles interagissent entre elles.
2. **Tracer l'Exécution** :
    
    - Utilisez des impressions (`printf`) pour suivre l'exécution de chaque étape et comprendre le flux de données.
3. **Tester avec Divers Cas** :
    
    - Implémentez différents tableaux (aléatoires, déjà triés, inversés, avec doublons) pour vérifier la robustesse de l'algorithme.
4. **Analyser la Complexité** :
    
    - Confirmez que la complexité temporelle et spatiale respecte les attentes (O(n log n) en temps et O(n) en espace).
5. **Expérimenter des Optimisations** :
    
    - Par exemple, implémentez une version itérative ou utilisez un buffer unique alloué une seule fois pour améliorer l'efficacité.
6. **Appliquer à Divers Contextes** :
    
    - Utilisez cet algorithme pour trier des listes chaînées ou dans des applications nécessitant des tris stables.

---

## 🧩 **Conclusion**

Cette **implémentation ultra-abstraite** du **Tri par Fusion** en **C** vise à maximiser la lisibilité et la maintenabilité du code en décomposant l'algorithme en plusieurs fonctions bien définies. Cette approche facilite non seulement la compréhension du fonctionnement interne de Merge Sort, mais permet également des extensions et optimisations futures sans compromettre la clarté du code.

### **Bon Codage et Bonne Pratique ! 🚀**

Si vous avez des questions supplémentaires ou souhaitez explorer d'autres aspects du tri par fusion ou d'autres algorithmes, n'hésitez pas à demander ! 😊