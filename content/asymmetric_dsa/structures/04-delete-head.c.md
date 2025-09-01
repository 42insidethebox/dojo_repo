```ad-info
title: Note
Cette section présente d’abord la fonction `delete_head` de manière brute, puis la remettra dans un contexte plus large avec des explications, un main, une gestion d’erreurs, et des edge cases, sans ressources supplémentaires. L’objectif est de proposer une documentation claire, bien formatée, conforme aux standards 42 School, FAANG-level, et obsidian-friendly, en se concentrant sur l’essentiel.
```

# 🧩 4. Supprimer le Premier Élément (delete_head)

---

## Version Brute de la Fonction

Voici la fonction `delete_head` telle quelle, sans fioritures. Elle supprime le premier élément de la liste chaînée (le head), met à jour le head, et libère la mémoire du nœud supprimé.

```c
void	delete_head(t_node **head)
{
	t_node	*temp;

	if (!head || !*head)
		return;
	temp = *head;
	*head = (*head)->next;
	free(temp);
}
```

---

## Contexte et Importance

**Pourquoi supprimer le premier élément ?**  
Cette opération est l’une des plus simples et fréquentes sur les listes chaînées. Elle permet de retirer rapidement l’élément en début de liste. L’opération est O(1), ce qui est optimal. Dans un contexte FAANG ou en ingénierie logicielle, ce pattern s’utilise fréquemment lorsque la liste représente une file d’attente (queue) ou un buffer FIFO.

---

## Structure du Nœud (Rappel)

```c
typedef struct s_node {
	int				data;
	struct s_node	*next;
}	t_node;
```

---

## Explication du Code

- **Vérifications**:  
    `if (!head || !*head)` : On vérifie que `head` n’est pas NULL et que la liste n’est pas vide. Si la liste est vide, on ne fait rien.
    
- **Stockage de l’Ancien Head**:  
    `temp = *head;` : On garde un pointeur vers l’ancien premier nœud.
    
- **Mise à Jour du Head**:  
    `*head = (*head)->next;` : On avance le head sur le nœud suivant.  
    Si la liste n’avait qu’un seul nœud, `(*head)->next` sera NULL, ce qui est correct.
    
- **Libération de la Mémoire**:  
    `free(temp);` : On libère l’ancien head.
    

**Complexité**: O(1) – On supprime simplement le premier élément sans parcourir la liste.

---

## Intégration dans un Contexte Plus Large

Voici un exemple complet avec un `main` :

- Création de quelques nœuds
- Insertion en tête ou en fin (utiliser `insert_tail` ou `insert_head` développés précédemment)
- Suppression du premier élément
- Affichage de la liste avant et après la suppression
- Libération de la mémoire

### Fonctions Auxiliaires

```c
#include <stdlib.h>
#include <stdio.h>

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

### Implémentation du `delete_head` dans ce Contexte

```c
void	delete_head(t_node **head)
{
	t_node	*temp;

	if (!head || !*head)
		return;
	temp = *head;
	*head = (*head)->next;
	free(temp);
}
```

### Programme de Démonstration

```c
int	main(void)
{
	t_node	*head = NULL;
	t_node	*node1 = new_node(10);
	t_node	*node2 = new_node(20);
	t_node	*node3 = new_node(30);

	// Construction de la liste : 10 -> 20 -> 30 -> NULL
	insert_tail(&head, node1);
	insert_tail(&head, node2);
	insert_tail(&head, node3);

	printf("Liste avant suppression du premier element:\n");
	print_list(head);

	// Suppression du premier élément
	delete_head(&head);

	printf("Liste apres suppression du premier element:\n");
	print_list(head);

	// Nettoyage mémoire
	t_node *current = head;
	t_node *next_node;
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

## Cas Limites et Erreurs

- **Liste Vide (`head == NULL` ou `*head == NULL`)** : La fonction vérifie et ne fait rien.
- **Liste à un Seul Nœud** : Le head devient NULL après suppression, ce qui est correct.
- **Nœud Invalide** : Dans notre implémentation, on suppose toujours que `new_node` a été correctement alloué. Si l’allocation échoue, on gère l’erreur au niveau de `new_node`.
- **head NULL** : Vérification `if (!head)` assure que l’on ne dereference pas un pointeur invalide.

---

## Comparaison Rapide

- **Delete Head** vs **Delete Tail**: Supprimer le head est O(1), alors que supprimer le tail d’une liste simplement chaînée est O(n) si on ne maintient pas de pointeur `tail`.
- **Delete Head** vs **Insert Head**: Les deux sont O(1). Les opérations sur la tête sont toujours plus simples en liste simplement chaînée.

---

**Conclusion**: La suppression du premier élément d’une liste chaînée est une opération fondamentale, simple et efficace, particulièrement utile dans des structures FIFO. Notre implémentation est sûre, gère les cas limites, et s’intègre harmonieusement avec les autres fonctions déjà présentées.