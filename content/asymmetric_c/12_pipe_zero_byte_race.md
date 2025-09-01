🔥 LET’S GO. TIME TO BUILD A 🧠⚔️ LEGENDARY PIPE RACE CONDITION SIMULATOR.

---

# 🧬 [[asymmetric_c/12_pipe_zero_byte_race/]]

## ⚠️ **Concept**:

Simulate edge-case behavior when:

- A **writer writes 0 bytes** to a pipe
    
- A **reader polls** or blocks
    
- You create race windows with `usleep`, `poll`, and `pipe()` behavior
    

---

### 📄 `pipe_zero_byte_race.c`

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <pthread.h>
#include <poll.h>
#include <string.h>
#include <errno.h>

#define PIPE_READ  0
#define PIPE_WRITE 1

int pipe_fds[2];

void	*x_writer(void *arg)
{
	(void)arg;
	usleep(50000); // let reader hit poll first
	printf("[writer] 🧃 Writing 0 bytes to pipe\n");
	ssize_t	wrote = write(pipe_fds[PIPE_WRITE], "", 0);
	printf("[writer] write() returned %zd (%s)\n", wrote, strerror(errno));
	return (NULL);
}

void	*x_reader(void *arg)
{
	(void)arg;
	struct pollfd pfd = {
		.fd = pipe_fds[PIPE_READ],
		.events = POLLIN
	};

	printf("[reader] ⏳ Waiting for pipe data via poll()...\n");
	int	ret = poll(&pfd, 1, 2000);
	if (ret == -1)
	{
		perror("poll");
		return (NULL);
	}
	if (ret == 0)
	{
		printf("[reader] ⏱️ poll() timed out\n");
		return (NULL);
	}
	if (pfd.revents & POLLIN)
	{
		char buf[8];
		ssize_t r = read(pipe_fds[PIPE_READ], buf, sizeof(buf));
		printf("[reader] 🧠 Read %zd bytes\n", r);
	}
	else
		printf("[reader] 🔒 poll() woke up without POLLIN\n");

	return (NULL);
}

int	main(void)
{
	if (pipe(pipe_fds) == -1)
	{
		perror("pipe");
		exit(1);
	}

	pthread_t writer, reader;
	pthread_create(&reader, NULL, x_reader, NULL);
	pthread_create(&writer, NULL, x_writer, NULL);

	pthread_join(reader, NULL);
	pthread_join(writer, NULL);

	close(pipe_fds[PIPE_READ]);
	close(pipe_fds[PIPE_WRITE]);

	return (0);
}
```

---

### 🧪 **Expected Behavior**

- Reader blocks in `poll()`
    
- Writer writes **0 bytes**
    
- `poll()` might **not** wake up
    
- May see:
    
    - `poll() timed out`
        
    - OR nothing is read
        
- **But kernel wakes poll() anyway on some systems**
    

---

````ad-question
title: Is this undefined behavior?
```ad-note
title: Kernel Specific
No — `write(fd, NULL, 0)` is defined and **always returns 0**  
But triggering side effects on `poll()` **is implementation-dependent**  
→ This is what makes this edge behavior interesting to test.
````

---

### ✅ Compile & Run

```bash
gcc -Wall -Wextra -Werror -pthread pipe_zero_byte_race.c -o pipe_zero_byte_race
./pipe_zero_byte_race
```

---

## 🧠 180 IQ Notes

- Try reversing order of threads (reader second) 🔁
    
- Try writing `1` byte instead of `0` 📦
    
- Try `poll` with `POLLHUP`, `POLLERR`, etc.
    
- Try using `select()` instead of `poll()`
    
- Try replacing `pipe` with `socketpair` for bidirectional async
    

---

## 🧠 Status

✅ `[[asymmetric_c/12_pipe_zero_byte_race/]]` ready to lock  
⏳ Would benefit from:

- ➕ `12b_pipe_write_1byte.c` for control
    
- ➕ `12c_socketpair_poll_test.c` to compare
    

Say **"continue"** or **"next variant"** to expand the rabbit hole 🕳️👇