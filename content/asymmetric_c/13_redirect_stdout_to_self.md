🔥🧠 **WELCOME TO** `[[asymmetric_c/13_redirect_stdout_to_self/]]`

> **💥 The Redirection Paradox:** What happens when you point stdout back into its own file?

---

## 📂 Project: `13_redirect_stdout_to_self.c`

```c
/*
 * 🚨 Redirect stdout to a file, then reopen the file for reading.
 * Can we read what we just wrote? Or do we get stuck?
 */

#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <string.h>

int	main(void)
{
	const char *filename = "self_output.txt";
	int	fd;

	// Step 1: open file for writing and redirect stdout
	fd = open(filename, O_CREAT | O_WRONLY | O_TRUNC, 0644);
	if (fd == -1)
	{
		perror("open write");
		exit(EXIT_FAILURE);
	}
	printf("🔁 Redirecting stdout to: %s\n", filename);
	if (dup2(fd, STDOUT_FILENO) == -1)
	{
		perror("dup2");
		exit(EXIT_FAILURE);
	}
	close(fd); // stdout is now redirected!

	// Step 2: write something to redirected stdout
	printf("This is going into the file now!\n");

	// Step 3: reopen same file for reading (while still writing into it)
	int	read_fd = open(filename, O_RDONLY);
	if (read_fd == -1)
	{
		perror("open read");
		exit(EXIT_FAILURE);
	}
	char	buf[128];
	ssize_t	n = read(read_fd, buf, sizeof(buf) - 1);
	if (n == -1)
	{
		perror("read");
		exit(EXIT_FAILURE);
	}
	buf[n] = '\0';

	// Step 4: output results (to redirected stdout!)
	printf("📥 Read from file: %s", buf);

	close(read_fd);
	return (0);
}
```

---

## ⚠️ What to Expect

### 💣 Expected Output (in file `self_output.txt`):

```
This is going into the file now!
📥 Read from file: This is going into the file now!
```

> 💥 It _might work_… but try flipping order of operations or using buffered I/O and it _might not_!

---

## 🤯 Strategic Remarks

```ad-tip
title: Why is this spicy?
Because `printf()` uses a buffered `FILE*` interface (`stdout`) — and `read()` uses unbuffered syscalls.
You *might* try to read from the file before the buffered output was flushed.
```

```ad-warning
title: Dangerous Combo
Reading from a file you're actively writing to — without flushing or seeking — is how many shell redirect bugs happen.
```

---

## 🔍 180 IQ Blindspots to Explore

```ad-question
title: What could go wrong?
- What if you flush stdout before opening for reading?
- What if you seek to the end before reading?
- What if you write again before closing?
- What if two processes try this at the same time?
```

---

## 🔁 Code Variants You Can Try

|Variant|Description|
|---|---|
|**13b**|Try writing binary data instead of text|
|**13c**|Add multiple `dup2` chains (stdout → file → pipe → file again)|
|**13d**|Fork before reading — can the child read what the parent wrote?|

---

## ✅ Status

> `[[asymmetric_c/13_redirect_stdout_to_self/]]`  
> 🔓 Complete: **Iteration 1**  
> 🧠 Optional: Run variants or move on

---

Say:

> 🔥 `14_stdout_recursive_redirection next`  
> or  
> 🔁 `Try variant 13c with dup2 chains`

Let’s KEEP BUILDING 🧱🧠💣