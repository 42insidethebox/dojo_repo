```ad-info
title: Note
Dans cette section, nous allons aborder la suppression d’un élément spécifique dans une liste simplement chaînée. Nous commencerons par la fonction brute `delete_node`, suivie d’une version contextuelle avec une gestion robuste des erreurs et des cas limites. Le tout sera conforme aux standards 42 School, et structuré pour faciliter l’apprentissage.
```

# 🧩 5. Supprimer un Élément Spécifique (delete_node)

---

## Version Brute de la Fonction

Voici la fonction brute pour supprimer un nœud spécifique contenant une valeur donnée. Elle parcourt la liste pour trouver le nœud cible, le supprime, et met à jour les liens.

```c
void	delete_node(t_node **head, int value)
{
	t_node	*current;
	t_node	*prev;

	if (!head || !*head)
		return;

	// Si le nœud à supprimer est le head
	if ((*head)->data == value)
	{
		current = *head;
		*head = (*head)->next;
		free(current);
		return;
	}

	prev = *head;
	current = (*head)->next;

	while (current)
	{
		if (current->data == value)
		{
			prev->next = current->next;
			free(current);
			return;
		}
		prev = current;
		current = current->next;
	}
}
```

---

## Explication de la Fonction

1. **Validation des Pointeurs**:
    
    - Vérifie si `head` ou `*head` est NULL pour éviter les erreurs.
    - Si la liste est vide, la fonction ne fait rien.
2. **Suppression du Head**:
    
    - Vérifie si la valeur à supprimer se trouve au niveau du `head`.
    - Met à jour `*head` pour pointer sur le nœud suivant, et libère le head.
3. **Suppression d’un Nœud au Milieu ou à la Fin**:
    
    - Parcourt la liste avec deux pointeurs : `prev` (le nœud précédent) et `current` (le nœud actuel).
    - Si `current->data` correspond à la valeur, met à jour `prev->next` pour sauter le nœud courant, puis le libère.
4. **Cas où la Valeur n’Existe Pas**:
    
    - Si la valeur n’est pas trouvée dans la liste, la fonction parcourt la liste jusqu’au bout sans rien faire.

---

## Intégration dans un Contexte Plus Large

Voici un programme complet pour illustrer l’utilisation de `delete_node`.

### Fonctions Auxiliaires

#### Structure et Création de Nœud

```c
typedef struct s_node {
	int				data;
	struct s_node	*next;
}	t_node;

t_node	*new_node(int data)
{
	t_node	*temp;

	temp = malloc(sizeof(t_node));
	if (!temp)
	{
		perror("Erreur d'allocation de memoire");
		exit(EXIT_FAILURE);
	}
	temp->data = data;
	temp->next = NULL;
	return (temp);
}
```

#### Ajout et Affichage de la Liste

```c
void	insert_tail(t_node **head, t_node *new)
{
	t_node	*current;

	if (!head || !new)
		return;
	if (*head == NULL)
	{
		*head = new;
		return;
	}
	current = *head;
	while (current->next != NULL)
		current = current->next;
	current->next = new;
}

void	print_list(t_node *head)
{
	t_node	*current;

	current = head;
	while (current)
	{
		printf("%d -> ", current->data);
		current = current->next;
	}
	printf("NULL\n");
}
```

---

### Intégration de `delete_node`

```c
void	delete_node(t_node **head, int value)
{
	t_node	*current;
	t_node	*prev;

	if (!head || !*head)
		return;

	// Si le nœud à supprimer est le head
	if ((*head)->data == value)
	{
		current = *head;
		*head = (*head)->next;
		free(current);
		return;
	}

	prev = *head;
	current = (*head)->next;

	while (current)
	{
		if (current->data == value)
		{
			prev->next = current->next;
			free(current);
			return;
		}
		prev = current;
		current = current->next;
	}
}
```

---

### Programme Principal (main)

```c
int	main(void)
{
	t_node	*head = NULL;

	// Création de la liste
	insert_tail(&head, new_node(10));
	insert_tail(&head, new_node(20));
	insert_tail(&head, new_node(30));
	insert_tail(&head, new_node(40));
	insert_tail(&head, new_node(50));

	printf("Liste avant suppression:\n");
	print_list(head);

	// Suppression d'un élément
	delete_node(&head, 30);  // Supprime le nœud contenant 30

	printf("Liste après suppression de 30:\n");
	print_list(head);

	// Suppression d'un élément inexistant
	delete_node(&head, 100);  // Aucune modification attendue

	printf("Liste après tentative de suppression de 100 (inexistant):\n");
	print_list(head);

	// Suppression du premier élément
	delete_node(&head, 10);  // Supprime le head

	printf("Liste après suppression de 10 (head):\n");
	print_list(head);

	// Libération de la mémoire
	t_node	*current;
	t_node	*next_node;

	current = head;
	while (current)
	{
		next_node = current->next;
		free(current);
		current = next_node;
	}
	return (0);
}
```

---

## Cas Limites et Gestion des Erreurs

1. **Liste Vide (`head == NULL`)**:
    
    - La fonction ne fait rien si la liste est vide.
2. **Suppression du Head**:
    
    - Vérification spécifique pour mettre à jour correctement le `head`.
3. **Valeur Non Présente dans la Liste**:
    
    - Si la valeur n’est pas trouvée, la liste reste inchangée.
4. **Liste à un Seul Nœud**:
    
    - La fonction fonctionne correctement si le nœud unique est supprimé. Le `head` devient `NULL`.

---

## Comparaison avec d’Autres Fonctions

- **Suppression en Tête**:
    
    - Supprimer le premier élément est un cas particulier de cette fonction.
    - La suppression d’un nœud spécifique ajoute de la complexité car il faut parcourir la liste.
- **Complexité**:
    
    - **Temps**: O(n), car il faut parcourir la liste pour trouver le nœud.
    - **Espace**: O(1), car aucune mémoire supplémentaire significative n’est utilisée.

---

### Résultat attendu

#### Liste initiale :

```
10 -> 20 -> 30 -> 40 -> 50 -> NULL
```

#### Après suppression de 30 :

```
10 -> 20 -> 40 -> 50 -> NULL
```

#### Après tentative de suppression de 100 (inexistant) :

```
10 -> 20 -> 40 -> 50 -> NULL
```

#### Après suppression de 10 (head) :

```
20 -> 40 -> 50 -> NULL
```

---

**Conclusion**: La fonction `delete_node` est une opération essentielle pour les listes chaînées. Elle gère efficacement les cas limites et s’intègre facilement dans une bibliothèque de manipulation de listes.