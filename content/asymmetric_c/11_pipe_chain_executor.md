🔥 **WELCOME TO PHASE 2** 🔥  
Let’s drop the scaffolding and turn `[[asymmetric_c/11_pipe_chain_executor/]]` into a **real system**.

---

# 📦 [[asymmetric_c/11_pipe_chain_executor/]]

> A miniature shell engine that executes a sequence of piped commands: `ls | grep .c | wc -l` style — but using **pure system calls**, not `system()`.

---

## 🧱 Project Structure

```shell
asymmetric_c/11_pipe_chain_executor/
├── src/
│   ├── main.c                 # Parses argv into command array
│   ├── exec_chain.c          # Handles pipe/fork/exec chaining
│   ├── fd_tools.c            # Utilities for safe dup2, close
├── include/
│   ├── exec_chain.h
│   ├── fd_tools.h
├── Makefile
└── README.md
```

---

## 📄 `README.md` (initial)

````markdown
# 🚀 pipe_chain_executor

## 🧠 Goal

Simulate a basic `shell` pipeline engine:
- Accepts a chain of commands (via `argv`)
- Executes them as `cmd1 | cmd2 | cmd3`
- Properly closes all FDs
- Handles fork/exec/pipe/dup2 with full control

## 🔍 Files

- `main.c` → CLI parsing + engine entrypoint
- `exec_chain.c` → Creates pipe+fork+exec chain
- `fd_tools.c` → Minimal helpers for safe FD ops

## ❗ Warning

- No `system()`, no bash, no libmagic. Just raw syscalls.
- No memory leaks allowed. Run with `valgrind` if needed.
- Handles `N` commands (not just 2 or 3).

## 🧪 Example

```bash
./pipe_exec ls -l "|" grep '\.c' "|" wc -l
````

---

````

---

## 🚀 First File: `src/main.c`

```c
#include "exec_chain.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void	print_usage(void)
{
	fprintf(stderr, "Usage: ./pipe_exec cmd1 '|' cmd2 '|' cmd3 ...\n");
	fprintf(stderr, "Example: ./pipe_exec ls -l '|' grep \".c\" '|' wc -l\n");
	exit(1);
}

int	main(int argc, char **argv)
{
	if (argc < 4)
		print_usage();

	// Split argv into command groups
	char	***cmds = parse_commands(argc, argv);
	if (!cmds)
	{
		fprintf(stderr, "Failed to parse commands\n");
		return (1);
	}

	execute_pipeline(cmds);

	free_commands(cmds);
	return (0);
}
````

---

Say the word and I’ll drop:

- 📂 `include/exec_chain.h`
    
- 📂 `src/exec_chain.c` with full piping + fork + exec logic
    
- 📂 `src/fd_tools.c` with safe close/dup2
    
- 🛠️ `Makefile` to glue it all together
    

Once this is done, you’ll have a **mini-shell engine** inside your vault.  
And we’ll push it **far beyond pipex** after that.

Shall I proceed with the next files?

🔥 Roger that. Let's **go full pipeline execution mode** — folders, files, CLI, compilation, execution.  
We're going to **build your own mini-shell executor** — pipex++.

---

# 🛠️ STEP 1: Create Full Project Structure

You can paste this in your terminal:

```bash
mkdir -p asymmetric_c/11_pipe_chain_executor/{src,include}
cd asymmetric_c/11_pipe_chain_executor

touch src/main.c src/exec_chain.c src/fd_tools.c
touch include/exec_chain.h include/fd_tools.h
touch Makefile README.md
```

---

# 🧠 STEP 2: Fill in the Files

---

### ✅ `include/exec_chain.h`

```c
#ifndef EXEC_CHAIN_H
# define EXEC_CHAIN_H

# include <unistd.h>

char	***parse_commands(int argc, char **argv);
void	execute_pipeline(char ***cmds);
void	free_commands(char ***cmds);

#endif
```

---

### ✅ `include/fd_tools.h`

```c
#ifndef FD_TOOLS_H
# define FD_TOOLS_H

void	safe_close(int fd);
void	x_dup2(int oldfd, int newfd);

#endif
```

---

### ✅ `src/fd_tools.c`

```c
#include "fd_tools.h"
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>

void	safe_close(int fd)
{
	if (close(fd) == -1)
		perror("close");
}

void	x_dup2(int oldfd, int newfd)
{
	if (dup2(oldfd, newfd) == -1)
	{
		perror("dup2");
		exit(1);
	}
}
```

---

### ✅ `src/exec_chain.c`

```c
#include "exec_chain.h"
#include "fd_tools.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>

static int	count_pipes(char **argv)
{
	int	count = 1;
	while (*argv)
	{
		if (strcmp(*argv, "|") == 0)
			count++;
		argv++;
	}
	return (count);
}

char	***parse_commands(int argc, char **argv)
{
	(void)argc;
	int	cmds = count_pipes(argv);
	char	***res = calloc(cmds + 1, sizeof(char **));
	int		i = 0;

	while (*argv)
	{
		int		len = 0;
		char	**start = argv;
		while (*argv && strcmp(*argv, "|") != 0)
		{
			len++;
			argv++;
		}
		res[i] = calloc(len + 1, sizeof(char *));
		for (int j = 0; j < len; j++)
			res[i][j] = strdup(start[j]);
		i++;
		if (*argv)
			argv++; // skip '|'
	}
	res[i] = NULL;
	return (res);
}

void	free_commands(char ***cmds)
{
	for (int i = 0; cmds[i]; i++)
	{
		for (int j = 0; cmds[i][j]; j++)
			free(cmds[i][j]);
		free(cmds[i]);
	}
	free(cmds);
}

void	execute_pipeline(char ***cmds)
{
	int		i = 0;
	int		pipe_fd[2];
	int		in_fd = -1;
	pid_t	pid;

	while (cmds[i])
	{
		if (cmds[i + 1] != NULL)
		{
			if (pipe(pipe_fd) == -1)
			{
				perror("pipe");
				exit(1);
			}
		}

		pid = fork();
		if (pid == -1)
		{
			perror("fork");
			exit(1);
		}
		else if (pid == 0)
		{
			if (in_fd != -1)
				x_dup2(in_fd, STDIN_FILENO);
			if (cmds[i + 1] != NULL)
				x_dup2(pipe_fd[1], STDOUT_FILENO);
			if (pipe_fd[0] != 0)
				safe_close(pipe_fd[0]);
			execvp(cmds[i][0], cmds[i]);
			perror("execvp");
			exit(1);
		}
		else
		{
			if (in_fd != -1)
				safe_close(in_fd);
			if (cmds[i + 1] != NULL)
			{
				safe_close(pipe_fd[1]);
				in_fd = pipe_fd[0];
			}
		}
		i++;
	}
	while (wait(NULL) > 0)
		;
}
```

---

### ✅ `src/main.c` (already done)

If not, drop it in:

```c
#include "exec_chain.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void	print_usage(void)
{
	fprintf(stderr, "Usage: ./pipe_exec cmd1 '|' cmd2 '|' cmd3 ...\n");
	exit(1);
}

int	main(int argc, char **argv)
{
	if (argc < 4)
		print_usage();

	char	***cmds = parse_commands(argc - 1, argv + 1);
	if (!cmds)
	{
		fprintf(stderr, "parse_commands() failed\n");
		return (1);
	}
	execute_pipeline(cmds);
	free_commands(cmds);
	return (0);
}
```

---

### ✅ `Makefile`

```makefile
NAME = pipe_exec

SRC = src/main.c src/exec_chain.c src/fd_tools.c
OBJ = $(SRC:.c=.o)

CC = cc
CFLAGS = -Wall -Wextra -Werror -Iinclude

all: $(NAME)

$(NAME): $(OBJ)
	$(CC) $(CFLAGS) -o $@ $(OBJ)

clean:
	rm -f $(OBJ)

fclean: clean
	rm -f $(NAME)

re: fclean all
```

---

# 🧪 Compile & Run

```bash
make
./pipe_exec ls -l "|" grep "\.c" "|" wc -l
```

---

### ✅ You're Now Building:

A **modular shell backend** in C that can evolve into:

- Pipex++
    
- A shell DAG executor
    
- A runtime job graph
    

---

Say the word and I’ll give:

- 🌪️ Advanced test cases
    
- 🧠 Breakdown of pipe vs FD trap bugs
    
- 🪛 Refactor ideas into true `exec_plan.c`
    

Or we go deeper: [[asymmetric_c/12_pipe_zero_byte_race/]]

Shall we build the next phase?