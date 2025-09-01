### 📂 **Tri Rapide (Quick Sort)** ([[27-quick-sort.c]])

Le **Tri Rapide (Quick Sort)** est l’un des algorithmes de tri les plus populaires grâce à sa rapidité et son efficacité. Il utilise la stratégie de **diviser pour régner** en partitionnant un tableau en sous-tableaux plus petits.

---

## **1. Pourquoi Utiliser le Quick Sort ?**

### **Avantages :**

1. **Rapide :**
    - Complexité moyenne en **O(n log n)**.
2. **Espace efficace :**
    - Implémentation en place (ne nécessite pas de mémoire supplémentaire significative).
3. **Flexible :**
    - Fonctionne bien pour des ensembles de données divers.

### **Inconvénients :**

1. **Pire des cas :**
    - Complexité en **O(n²)** si le pivot est mal choisi.
2. **Sensibilité au choix du pivot :**
    - Peut ralentir pour des données déjà triées ou très déséquilibrées.

---

## **2. Principe du Tri Rapide**

1. **Choisir un pivot :**
    - Généralement, le premier, le dernier, ou un élément aléatoire.
2. **Partitionner le tableau :**
    - Réorganiser les éléments pour que ceux **inférieurs** au pivot soient à gauche et ceux **supérieurs** soient à droite.
3. **Appliquer récursivement :**
    - Appliquer les étapes ci-dessus sur les sous-tableaux gauche et droit jusqu'à ce qu’ils soient triés.

---

### Exemple :

#### Tableau initial :

`[5, 3, 8, 4, 2, 7, 1, 10]`

1. Pivot = `5`
    
    - Partition : `[3, 4, 2, 1] | 5 | [8, 7, 10]`
2. Appliquer récursivement :
    
    - Sous-tableau gauche : `[3, 4, 2, 1] → [1, 2, 3, 4]`
    - Sous-tableau droit : `[8, 7, 10] → [7, 8, 10]`
3. Fusion :
    
    - `[1, 2, 3, 4] + [5] + [7, 8, 10] → [1, 2, 3, 4, 5, 7, 8, 10]`

---

## **3. Implémentation en C**

### **Code Quick Sort conforme aux normes de l'École 42**

```c
#include <stdio.h>

// Fonction pour échanger deux éléments
void swap(int *a, int *b)
{
    int temp;

    temp = *a;
    *a = *b;
    *b = temp;
}

// Fonction pour partitionner le tableau
int partition(int *arr, int low, int high)
{
    int pivot;
    int i;
    int j;

    pivot = arr[high]; // Choisir le dernier élément comme pivot
    i = low - 1;

    j = low;
    while (j < high)
    {
        if (arr[j] < pivot)
        {
            i++;
            swap(&arr[i], &arr[j]);
        }
        j++;
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}

// Fonction récursive pour le tri rapide
void quick_sort(int *arr, int low, int high)
{
    int pi;

    if (low < high)
    {
        pi = partition(arr, low, high); // Partitionner le tableau
        quick_sort(arr, low, pi - 1);   // Trier la partie gauche
        quick_sort(arr, pi + 1, high); // Trier la partie droite
    }
}

// Fonction pour afficher le tableau
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

// Fonction principale
int main(void)
{
    int arr[] = {5, 3, 8, 4, 2, 7, 1, 10};
    int n;

    n = sizeof(arr) / sizeof(arr[0]);

    printf("Tableau initial : ");
    print_array(arr, n);

    quick_sort(arr, 0, n - 1);

    printf("Tableau trié : ");
    print_array(arr, n);

    return (0);
}
```

---

## **4. Explications**

### **4.1 Fonction `swap`**

- Échange les valeurs de deux éléments dans le tableau.
- Utilisée dans la fonction `partition` pour réorganiser les éléments autour du pivot.

### **4.2 Fonction `partition`**

1. Sélectionne un **pivot** (ici, le dernier élément).
2. Place tous les éléments **inférieurs** au pivot à gauche.
3. Place tous les éléments **supérieurs** au pivot à droite.
4. Retourne l’indice où le pivot est finalement positionné.

### **4.3 Fonction `quick_sort`**

1. Appelle récursivement `quick_sort` pour les sous-tableaux gauche et droit.
2. La récursion s’arrête lorsque `low >= high`, ce qui signifie qu’un sous-tableau est trié.

---

## **5. Résultat**

### **Entrée :**

```text
Tableau initial : 5 3 8 4 2 7 1 10
```

### **Sortie :**

```text
Tableau trié : 1 2 3 4 5 7 8 10
```

---

## **6. Complexité Temporelle**

|**Cas**|**Complexité Temporelle**|**Explication**|
|---|---|---|
|**Meilleur Cas**|O(n log n)|Division équilibrée à chaque partition.|
|**Pire Cas**|O(n²)|Division déséquilibrée (par ex., tableau trié).|
|**Cas Moyen**|O(n log n)|En moyenne, les partitions sont raisonnablement équilibrées.|

---

## **7. Résumé**

1. Le **Quick Sort** est un algorithme de tri rapide basé sur la stratégie de **diviser pour régner**.
2. Il partitionne le tableau autour d’un pivot, puis trie les sous-tableaux de manière récursive.
3. Cette implémentation respecte les normes de l'École 42 :
    - Pas de boucles `for`.
    - Déclarations et affectations séparées.

Si vous avez des questions ou si vous voulez explorer des variantes, faites-moi savoir ! 😊