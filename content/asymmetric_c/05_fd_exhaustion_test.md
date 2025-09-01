💣💀 SYSTEM MELTDOWN SIMULATOR COMING RIGHT UP

---

# 🧠 [[asymmetric_c/05_fd_exhaustion_test/]]

## 🔥 FD Exhaustion Test

> Let’s see what happens when you open **as many file descriptors as your system allows**.  
> Can you detect the hard stop?  
> Can you catch `EMFILE` or `ENFILE`?

---

## 🧬 Purpose:

- Discover the **maximum number of open FDs**
    
- Watch the system reject you with `errno = EMFILE`
    
- Validate `ulimit -n`
    
- Catch your own failure gracefully 💥
    

---

## 📄 `05_fd_exhaustion_test.c` _(single-file testbed)_

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <errno.h>
#include <string.h>
#include <sys/resource.h>

#define MAX_FDS 65536

int	main(void)
{
	int		fd_list[MAX_FDS];
	int		i = 0;
	char	path[] = "/dev/null";
	struct rlimit lim;

	if (getrlimit(RLIMIT_NOFILE, &lim) == 0)
	{
		printf("🔢 Soft FD limit: %lu\n", lim.rlim_cur);
		printf("🔢 Hard FD limit: %lu\n\n", lim.rlim_max);
	}

	printf("💥 Attempting to open FDs until exhaustion...\n");

	while (i < MAX_FDS)
	{
		int fd = open(path, O_RDONLY);
		if (fd == -1)
		{
			perror("❌ open");
			printf("🧨 Stopped at FD #%d — errno = %d (%s)\n", i, errno, strerror(errno));
			break;
		}
		fd_list[i] = fd;
		if (i % 100 == 0)
			printf("🔁 FD %d opened\n", i);
		i++;
	}

	printf("🔚 Reached limit: %d open FDs\n", i);

	while (--i >= 0)
		close(fd_list[i]);

	return (0);
}
```

---

## ✅ Sample Output

```
🔢 Soft FD limit: 1024
🔢 Hard FD limit: 1048576

💥 Attempting to open FDs until exhaustion...
🔁 FD 0 opened
🔁 FD 100 opened
🔁 FD 200 opened
...
❌ open: Too many open files
🧨 Stopped at FD #1024 — errno = 24 (Too many open files)
🔚 Reached limit: 1024 open FDs
```

---

## 🔍 Learn This Deep

|Concept|Value|
|---|---|
|`RLIMIT_NOFILE`|Controls **how many FDs your process can open**|
|`errno == EMFILE`|💀 **Per-process FD limit reached**|
|`errno == ENFILE`|☠️ **System-wide FD limit reached** (rare)|
|Leak test|Great to **simulate long-running daemons**|
|`/dev/null`|Ideal for safe, non-blocking test targets|

---

## 🧪 Run This With:

```bash
gcc 05_fd_exhaustion_test.c -o fdburn
ulimit -n 1024       # Try limiting if you're too powerful
./fdburn
```

---

## 📎 Want Even More?

You can follow up with:

- `[[06_malloc_after_fork_glitch/]]` → simulate a fork-time memory inconsistency
    
- `[[07_shared_mmap_allocator/]]` → your own mmap-backed allocator
    
- `[[zombie_maker/]]` → test if zombie + FD exhaustion creates kernel instability
    

Say go and we’ll build the next overload vector 🧠💣💾