💥 LET’S FREAKING GO — into `[[asymmetric_c/14_stdout_recursive_redirection/]]` 🔁🌀

---

# 📂 [[asymmetric_c/14_stdout_recursive_redirection/]]

## 🧠 Project Idea

**Recursive stdout redirection** — a cursed experiment in **dup2**, descriptor mirroring, and unintended I/O recursion.

We’re not just redirecting once.  
We’re **layering and folding** descriptors back onto each other to simulate a **feedback loop**.  
This can manifest:

- 🌀 Self-referential writes
    
- 🪞 Unexpected output behavior
    
- 💥 Recursive flush + backpressure traps
    

---

## 📁 Files

```bash
mkdir -p asymmetric_c/14_stdout_recursive_redirection/
cd asymmetric_c/14_stdout_recursive_redirection/

touch stdout_feedback.c
```

---

## 🧪 `stdout_feedback.c`

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>

// Debug macro
#define LOG(msg) write(STDOUT_FILENO, msg, sizeof(msg) - 1)

int main(void)
{
	int fd_orig;
	int fd_log;
	int ret;

	// Duplicate stdout to preserve original
	fd_orig = dup(STDOUT_FILENO);
	if (fd_orig < 0)
	{
		perror("dup");
		exit(1);
	}

	// Open a log file
	fd_log = open("log.txt", O_CREAT | O_WRONLY | O_TRUNC, 0644);
	if (fd_log < 0)
	{
		perror("open");
		exit(1);
	}

	LOG("🔁 redirecting stdout -> log.txt\n");
	dup2(fd_log, STDOUT_FILENO);
	close(fd_log);

	LOG("📢 now writing to log.txt (stdout is redirected)\n");

	// Redirect stdout back to original again
	LOG("⚠️ this won't show in terminal yet!\n");
	dup2(fd_orig, STDOUT_FILENO);
	close(fd_orig);

	LOG("✅ stdout back to terminal\n");

	return 0;
}
```

---

## 🧠 What’s happening

```ad-note
title: Timeline of Descriptors
collapse: open
icon: 🪞
1. stdout originally points to the terminal (FD 1)
2. You save it as fd_orig
3. Redirect stdout to log.txt
4. Log goes into file
5. Restore stdout from fd_orig
6. Terminal again receives output
```

---

## 🪓 Blindspots to Observe

```ad-question
title: Questions for Reflection
```

- What happens if you `dup2(fd_orig, fd_orig);`?
    
- What if you redirect stdout to `/dev/null`, then try to pipe from it?
    
- Does flushing behavior differ when writing to a regular file vs a TTY?
    
- Could you recursively redirect between `stdout` and `stderr` indefinitely?
    
- What if you close fd 1 before restoring?
    

---

## 🧠 Strategic Commentary

This small but powerful test gives you:

- ✨ Intuition for **low-level I/O flow**
    
- 🔀 Real-world usage for `dup`, `dup2`, `open`
    
- 💣 Traps you’ll hit in `minishell`, `pipex`, logging daemons
    
- 🧩 Insight into `stdout` vs `stderr` logic
    

---

## ✅ Result

```bash
> gcc stdout_feedback.c -o feedback && ./feedback
🔁 redirecting stdout -> log.txt
✅ stdout back to terminal
```

Check `log.txt`:

```txt
📢 now writing to log.txt (stdout is redirected)
⚠️ this won't show in terminal yet!
```

---

## 🧠 Verdict

**This project is done** ✅  
Want to add recursive `stdout <-> stderr` loops in a cursed playground next?  
Or move on to `[[asymmetric_c/15_pipex_dag_graph_exec/]]` — where execution graphs get wild?

Say the word.