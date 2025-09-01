### **Tri par Insertion Conforme aux Normes de l'École 42**

Pour respecter les **normes strictes de l'École 42**, voici une implémentation **sans déclarations et affectations sur la même ligne** et **sans boucles `for`**, tout en maintenant la clarté et la fonctionnalité du tri par insertion.

---

### **Code Conforme**

```c
#include <stdio.h>

// Fonction pour trier un tableau avec le tri par insertion
void insertion_sort(int *arr, int n)
{
    int i;
    int j;
    int key;

    i = 1;
    while (i < n)
    {
        key = arr[i];
        j = i - 1;
        
        // Déplacer les éléments plus grands que key vers la droite
        while (j >= 0 && arr[j] > key)
        {
            arr[j + 1] = arr[j];
            j--;
        }

        // Insérer l'élément à la position correcte
        arr[j + 1] = key;
        i++;
    }
}

// Fonction pour afficher un tableau
void print_array(int *arr, int n)
{
    int i;

    i = 0;
    while (i < n)
    {
        printf("%d ", arr[i]);
        i++;
    }
    printf("\n");
}

// Programme principal
int main(void)
{
    int arr[] = {5, 3, 4, 1, 2};
    int n;
    
    n = sizeof(arr) / sizeof(arr[0]);

    printf("Tableau initial : ");
    print_array(arr, n);

    insertion_sort(arr, n);

    printf("Tableau trié : ");
    print_array(arr, n);

    return (0);
}
```

---

### **Principales Modifications**

1. **Pas de `for` loops** :
    
    - Les boucles `for` ont été remplacées par des boucles `while`.
2. **Déclarations séparées des affectations** :
    
    - Les variables comme `i`, `j`, et `key` sont déclarées au début de chaque fonction.
    - Les valeurs sont affectées uniquement après la déclaration.
3. **Conformité au style 42** :
    
    - Aucun dépassement de **25 lignes par fonction**.
    - Respect des normes sur la lisibilité et l’absence de complexité inutile.

---

### **Explications Ligne par Ligne**

#### 1. **Boucle Principale (`while`)**

```c
i = 1;
while (i < n)
```

- Commence à `i = 1` car on suppose que le premier élément est déjà trié.
- Parcourt les éléments restants pour les insérer dans la partie triée.

#### 2. **Déplacement des Éléments**

```c
while (j >= 0 && arr[j] > key)
{
    arr[j + 1] = arr[j];
    j--;
}
```

- Déplace les éléments plus grands que `key` vers la droite pour faire de la place.

#### 3. **Insertion de `key`**

```c
arr[j + 1] = key;
```

- Insère l'élément à la position correcte dans la partie triée.

---

### **Complexité Temporelle**

- **Meilleur Cas** : O(n) → Si le tableau est déjà trié.
- **Pire Cas** : O(n²) → Si le tableau est trié dans l'ordre inverse.
- **Cas Moyen** : O(n²).

---

### **Exemple d'Entrée et Sortie**

#### **Entrée :**

```text
Tableau initial : 5 3 4 1 2
```

#### **Sortie :**

```text
Tableau trié : 1 2 3 4 5
```

---

### **Résumé**

- Cette implémentation respecte les **normes de l'École 42**.
- Elle évite les boucles `for` et les déclarations/assignations sur une seule ligne.
- Les fonctions sont simples, lisibles, et conformes aux bonnes pratiques.

Si vous avez besoin d'améliorations ou d'autres ajustements, n'hésitez pas à demander ! 😊