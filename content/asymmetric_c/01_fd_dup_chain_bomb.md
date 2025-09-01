🔥💾 INITIATING PROJECT `01_fd_dup_chain_bomb/`  
Let’s weaponize `dup()` — turn it into a system-filling, table-clogging, FD-exhausting monster.

---

# 📂 [[asymmetric_c/01_fd_dup_chain_bomb/]]

## 🧠 Purpose:

> Explore file descriptor (FD) table duplication limits, FD exhaustion edge behavior, and how `dup()` can be turned into a chain reaction.

---

## 🧪 What You’ll Learn:

- How `dup()` allocates the lowest available FD
    
- How to detect when the system runs out of FDs
    
- What errors you get from `dup()` when out of FDs
    
- How to simulate a controlled FD explosion
    
- How to recover and cleanup properly
    

---

## 📄 File Structure:

```bash
01_fd_dup_chain_bomb/
├── main.c
├── dup_utils.c
├── dup_utils.h
├── Makefile
├── README.md
└── output.txt
```

---

### 📄 `main.c`

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include "dup_utils.h"

#define MAX_FD 65536

int	main(void)
{
	int	*fd_list;
	int	i;

	fd_list = malloc(sizeof(int) * MAX_FD);
	if (!fd_list)
	{
		perror("malloc");
		return (1);
	}

	// Step 1: Open one file
	int fd = open("output.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644);
	if (fd == -1)
	{
		perror("open");
		return (1);
	}
	dprintf(fd, "Starting FD bomb 💣\n");

	// Step 2: Start chaining
	i = 0;
	while (i < MAX_FD)
	{
		int newfd = dup(fd);
		if (newfd == -1)
		{
			perror("dup");
			break;
		}
		fd_list[i] = newfd;
		i++;
	}
	dprintf(fd, "Total dup'd: %d\n", i);
	close(fd);
	cleanup_fds(fd_list, i);
	free(fd_list);
	return (0);
}
```

---

### 📄 `dup_utils.c`

```c
#include <unistd.h>
#include "dup_utils.h"

void	cleanup_fds(int *fds, int count)
{
	while (--count >= 0)
		close(fds[count]);
}
```

---

### 📄 `dup_utils.h`

```c
#ifndef DUP_UTILS_H
# define DUP_UTILS_H

void	cleanup_fds(int *fds, int count);

#endif
```

---

### 📄 `Makefile`

```make
NAME = fd_dup_chain_bomb

SRC = main.c dup_utils.c
OBJ = $(SRC:.c=.o)
CC = gcc
CFLAGS = -Wall -Wextra -Werror

all: $(NAME)

$(NAME): $(OBJ)
	$(CC) $(CFLAGS) -o $@ $^

clean:
	rm -f $(OBJ)

fclean: clean
	rm -f $(NAME)

re: fclean all
```

---

### 📄 `README.md`

```markdown
# 💣 `01_fd_dup_chain_bomb`

## 🧠 Overview
This project tests how far you can `dup()` a single file descriptor before the system runs out of FD entries.

## ✅ Objectives
- Fill the FD table using chained `dup()`
- Understand `EMFILE` and `ENFILE` failure states
- Benchmark how many FDs your system can handle per process
- Clean up everything and close properly

## 📤 Output
Logs to `output.txt`:
```

Starting FD bomb 💣 Total dup'd: 1024 ← depends on system limits

```

## 🚨 Warnings
- May exhaust system resources if run with elevated limits
- Check your `ulimit -n` before running
```

---

### 📄 `output.txt`

```txt
Starting FD bomb 💣
Total dup'd: 1024
```

---

## ✅ Ready to Build?

```bash
cd asymmetric_c/01_fd_dup_chain_bomb
make
./fd_dup_chain_bomb
```

---

Say the word and I’ll queue `02_fd_leak_visualizer/` next.  
You're now building the **OS simulator layer by layer.**  
🔥 Keep going?