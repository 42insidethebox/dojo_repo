🔥 Let’s roll out your next vault weapon:

---

# 🧠 [[asymmetric_c/02_fd_leak_visualizer/]]

## 💣 FD Leak Visualizer

> See what happens when FDs are opened without being closed.  
> Track the growth. Watch it bleed.  
> **Expose one of the most common bugs in C: unclosed FDs.**

---

## 🎯 GOAL:

- Open a bunch of FDs without closing them.
    
- Monitor what happens over time.
    
- See how `ulimit -n` sets your per-process FD ceiling.
    
- Print the _currently open FDs_ by inspecting `/proc/self/fd/`
    

---

## 📄 `02_fd_leak_visualizer.c` ✅ _(Single-file only – perfectly scoped)_

```c
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <dirent.h>
#include <errno.h>

#define MAX_LEAK 4096
#define SLEEP_INTERVAL 50000 // microseconds

void	print_open_fds(void)
{
	DIR *dir = opendir("/proc/self/fd");
	if (!dir)
	{
		perror("opendir");
		return;
	}

	struct dirent *entry;
	printf("🔍 Open file descriptors:\n");
	while ((entry = readdir(dir)) != NULL)
	{
		printf("  FD: %s\n", entry->d_name);
	}
	closedir(dir);
}

int	main(void)
{
	int	leaked_fds[MAX_LEAK];
	int	i = 0;

	printf("💣 Starting FD leak...\n");

	while (i < MAX_LEAK)
	{
		leaked_fds[i] = open("/dev/null", O_RDONLY);
		if (leaked_fds[i] == -1)
		{
			perror("open");
			break;
		}
		if (i % 100 == 0)
		{
			printf("🔁 Leaked %d file descriptors\n", i);
			usleep(SLEEP_INTERVAL);
			print_open_fds();
			printf("-----------------------------\n");
		}
		i++;
	}
	printf("🧨 Final leaked FD count: %d\n", i);
	return (0);
}
```

---

## 📄 `README.md`

```markdown
# 💣 02_fd_leak_visualizer

## 🔎 What it does:
- Opens `/dev/null` up to MAX_LEAK times
- Does **not** close the file descriptors
- Every 100 iterations:
  - Logs current count
  - Lists all open FDs using `/proc/self/fd/`

## ✅ What you’ll learn:
- How leaking FDs looks at runtime
- How `open()` fails when `EMFILE` (Too many open files)
- How to visualize runtime resource usage using `procfs`

## 📤 Sample output:
```

## 🔁 Leaked 300 file descriptors FD: 0 FD: 1 FD: 2 FD: 3 ...

```

## 🚨 Warnings:
- May hit per-process FD ceiling (check `ulimit -n`)
- If you don’t clean up, your process will leak FDs until it breaks
```

---

## 🧪 Run Instructions

```bash
ulimit -n 1024         # Optional: reduce max FDs for testing
gcc 02_fd_leak_visualizer.c -o fd_leak
./fd_leak
```

---

## 🧠 Why This Project Matters

|What it shows|Why it's powerful|
|---|---|
|FD exhaustion|Common bug in prod systems|
|`/proc/self/fd`|Real-time debugging tool|
|Silent resource leaks|Can crash long-running daemons|
|Visual FD tracking|Reinforces kernel FD table intuition|

---

### 🔁 Ready for `03_read_closed_fd_trap/` next?

This one **reads from an already closed FD** and traps the result.  
Let me know — we’ll keep assembling the vault 💣🧠📂