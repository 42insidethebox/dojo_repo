💥🔥 MIRROR MODE ENGAGED

---

# 🧠 [[asymmetric_c/04_fd_mirror_fanout/]]

## 🔁 **FD Mirror Fanout**

> What happens when you `dup()` the same FD over and over?  
> Do they share the same offset?  
> Do they interfere?  
> Let’s **mirror one FD into a fan of duplicates** and test the behavior.

---

## 📄 `04_fd_mirror_fanout.c`

**(Perfect for single file — visual, observable, syscall-rich)**

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <string.h>

#define MAX_MIRRORS 8

int	main(void)
{
	int		base_fd;
	int		mirrors[MAX_MIRRORS];
	char	buf[16];
	ssize_t	rd;
	int		i;

	base_fd = open("fanout.txt", O_CREAT | O_RDWR | O_TRUNC, 0644);
	if (base_fd == -1)
	{
		perror("open");
		return (1);
	}
	dprintf(base_fd, "HelloFromFanout!");

	printf("🔗 Base FD: %d\n", base_fd);

	// Create mirrors
	for (i = 0; i < MAX_MIRRORS; i++)
	{
		mirrors[i] = dup(base_fd);
		printf("📎 Mirror %d → FD %d\n", i, mirrors[i]);
	}

	printf("\n📖 Reading from each mirror:\n");
	for (i = 0; i < MAX_MIRRORS; i++)
	{
		memset(buf, 0, sizeof(buf));
		rd = read(mirrors[i], buf, sizeof(buf) - 1);
		if (rd == -1)
			perror("read");
		else
			printf("  [%d] Read %ld bytes → \"%s\"\n", mirrors[i], rd, buf);
	}

	printf("\n📖 Reading from base FD:\n");
	memset(buf, 0, sizeof(buf));
	lseek(base_fd, 0, SEEK_SET); // Reset to beginning
	rd = read(base_fd, buf, sizeof(buf) - 1);
	printf("  [base] Read %ld bytes → \"%s\"\n", rd, buf);

	// Close all
	close(base_fd);
	for (i = 0; i < MAX_MIRRORS; i++)
		close(mirrors[i]);

	return (0);
}
```

---

## 💡 What You’ll See

### Sample Output:

```
🔗 Base FD: 3
📎 Mirror 0 → FD 4
📎 Mirror 1 → FD 5
...
📖 Reading from each mirror:
  [4] Read 15 bytes → "HelloFromFanout!"
  [5] Read 0 bytes → ""
  [6] Read 0 bytes → ""
  ...
📖 Reading from base FD:
  [base] Read 15 bytes → "HelloFromFanout!"
```

---

## 🔍 Observations

|Action|Result|
|---|---|
|`dup(fd)`|Shares same underlying open file description|
|All mirrors|Share file offset (i.e., position in file)|
|First read|Consumes the file — next reads = empty|
|`lseek()` resets only one FD|But applies to all mirrors too (they're not truly independent)|

---

## 🧠 Key Learnings

- `dup()` does **not** clone an FD _object_ — it clones an **FD number** pointing to the **same kernel struct**
    
- All dup'd FDs share:
    
    - 🔁 File offset
        
    - ✋ Lock state
        
    - 🔐 Access mode (O_RDONLY, etc.)
        
- Duplicates are only useful for:
    
    - Redirecting stdin/out/err
        
    - Closing one end safely
        
    - Playing syscall shell games
        

---

## 📤 Pro Tip

Try this:

```c
write(mirrors[0], "A", 1);
read(mirrors[1], buf, 1);
```

💥 They’re reading/writing **in sync**.

---

## ✅ Compile & Run:

```bash
gcc 04_fd_mirror_fanout.c -o fanout && ./fanout
```

Then:

```bash
cat fanout.txt
```

---

### 🚀 Up Next?

- `[[05_fd_exhaustion_test/]]` → how many FDs can we open before the system screams
    
- `[[06_malloc_after_fork_glitch/]]` → enter the forking memory corruption glitch vault
    

Say go.  
You're now studying the **quantum entanglement of file descriptors.**  
🧠🔁📎