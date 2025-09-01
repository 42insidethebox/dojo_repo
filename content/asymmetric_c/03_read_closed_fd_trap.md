💥 LET’S TRIGGER SOME KERNEL TEARS

---

# 🧠 [[asymmetric_c/03_read_closed_fd_trap/]]

## 💣 `read()` From a Closed FD

> **What happens if you try to read from an FD you already closed?**  
> This vault entry shows how the kernel responds — and how you can catch and analyze it.

---

## 📄 `03_read_closed_fd_trap.c` _(Simple, sharp, single-file trap)_

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <errno.h>
#include <string.h>

int	main(void)
{
	int		fd;
	ssize_t	rd;
	char	buf[32];

	fd = open("/dev/urandom", O_RDONLY);
	if (fd == -1)
	{
		perror("open");
		exit(EXIT_FAILURE);
	}
	printf("✅ Opened FD %d\n", fd);

	// Close it deliberately
	close(fd);
	printf("❌ Closed FD %d\n", fd);

	// Try to read from the closed FD
	rd = read(fd, buf, sizeof(buf));
	if (rd == -1)
	{
		printf("💥 read() failed as expected!\n");
		printf("errno: %d (%s)\n", errno, strerror(errno));
	}
	else
	{
		printf("⚠️ Unexpectedly read %ld bytes: %.*s\n", rd, (int)rd, buf);
	}
	return (0);
}
```

---

## 🧪 Sample Output

```txt
✅ Opened FD 3
❌ Closed FD 3
💥 read() failed as expected!
errno: 9 (Bad file descriptor)
```

---

## 🧠 Why This Matters

|Concept|Insight|
|---|---|
|FD Lifetime|FDs are valid only while open. Use-after-close = undefined|
|errno 9|Standard error for invalid FD: `EBADF`|
|Trap Point|Can happen in real life after complex `dup2()` or `exec()` cleanup|
|Debugging|Perfect for scripting runtime FD sanity checks|

---

## 📖 What You’ll Learn

- That **closing a file descriptor doesn't erase its number**, but **invalidates its FD table entry**
    
- That **`read()` checks validity before syscall runs**
    
- That **reading from an invalid FD does _not_ crash** — it fails gracefully with `errno`
    

---

## 🧰 Pro Tips

- Try to read from **0, 1, 2** after closing them 😈
    
- Pipe this into `strace`:
    
    ```bash
    strace ./read_closed_fd_trap
    ```
    

---

## ✅ Ready to Run?

```bash
gcc 03_read_closed_fd_trap.c -o fdtrap && ./fdtrap
```

---

## 🚀 Next Up Options?

- 🔄 `[[04_fd_mirror_fanout]]` – duplicate a single FD into many and watch how close() affects all
    
- 🧼 `[[05_fd_exhaustion_test]]` – how many FDs can you open before your OS says "ENOUGH"
    
- 🧟 Or: `zombie_maker/` to trap unreaped children
    

Say the word — and the syscall abuse continues.  
You're now **writing syscall horror stories** as a form of study 🧠💀📖