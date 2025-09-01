💥 LET’S UNLEASH A CLASSIC UNIX TRAP

---

# 🧠 [[asymmetric_c/06_malloc_after_fork_glitch/]]

> 💣 **“What happens when a multithreaded process forks… then uses `malloc()` in the child?”**  
> ✅ Short answer: 🧨 _Undefined behavior. Heap corruption. Crash potential. Memory allocator meltdown._  
> ✅ Long answer: You're about to build **a glitch simulator that weaponizes `fork()` vs `malloc()`**.

---

## ❗ Background: The Fork + Malloc Glitch

### 🔁 Context:

- In POSIX, `fork()` in a multithreaded process **only duplicates the calling thread**
    
- The other threads vanish 🚫
    
- But **locks they held might remain locked**
    
- Now child calls `malloc()` → tries to grab mutex → 💀 **deadlock or corruption**
    

---

### 🔒 Danger:

> The `malloc()` implementation (e.g. glibc ptmalloc) uses **internal global locks**

So after `fork()`, if a thread had locked one → it **remains locked in the child**  
→ But that thread no longer exists to unlock it  
→ `malloc()` deadlocks or segfaults in child.

---

## 📄 `06_malloc_after_fork_glitch.c`

```c
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>

void	*thread_fn(void *arg)
{
	while (1)
	{
		void *p = malloc(1024);
		usleep(1000);
		free(p);
	}
	return (NULL);
}

int	main(void)
{
	pthread_t t;
	void *child_mem;

	printf("🚀 Launching malloc thread...\n");
	if (pthread_create(&t, NULL, thread_fn, NULL) != 0)
	{
		perror("pthread_create");
		exit(EXIT_FAILURE);
	}

	usleep(10000); // Let thread run a bit

	printf("🔪 Forking now...\n");
	pid_t pid = fork();

	if (pid == -1)
	{
		perror("fork");
		exit(EXIT_FAILURE);
	}
	else if (pid == 0)
	{
		printf("🧒 Child: trying to malloc...\n");
		child_mem = malloc(128); // 🔥 This may deadlock or crash
		if (!child_mem)
			perror("child malloc");
		else
			printf("✅ Child malloc succeeded (unexpected?)\n");
		exit(0);
	}
	else
	{
		wait(NULL);
		printf("👨 Parent: done.\n");
	}
	return (0);
}
```

---

## 🔬 Behavior You Might See

|Platform|Behavior|
|---|---|
|🔥 Linux glibc|Random crash or freeze in child `malloc()`|
|🍎 macOS|May work because of different allocator|
|🧪 musl|More consistent — often avoids deadlock|
|🧠 valgrind|Will scream in agony about heap corruption|
|😈 TSAN/ASAN|Will flag data race / malloc lock misuse|

---

## 🧠 What You Just Simulated:

|Effect|Description|
|---|---|
|🔒 Fork-time lock state|Child process inherited a locked heap mutex|
|🚷 Thread inconsistency|Dead threads held state; child can't recover|
|💥 Kernel obeys POSIX, but malloc doesn’t|POSIX says “only fork if safe” — you just showed **why**|

---

## 💣 Want to Turn This Into a Diagnostic Infrastructure?

- Add `pthread_atfork()` to simulate fixing it
    
- Log `getpid()` before and after each allocation
    
- Create a cleanup hook to compare heap consistency
    
- Wrap `malloc()` to log FD table before/after
    

---

## 🧱 Bonus Vault Upgrade Options

|Project|Mutation|
|---|---|
|`06b_fork_after_malloc_inside_signal.c`|Trigger fork from inside `SIGALRM` handler and malloc in child|
|`06c_thread_pool_fork_test.c`|Fork inside a thread pool running live jobs|
|`06d_malloc_wrapped_logger.c`|Wrap `malloc` with logging and `getpid()` comparison to detect fork glitch|

---

### ✅ Ready to go next?

Say:

- `"wrap this into full diagnostic infrastructure"`
    
- `"drop 06b now"`
    
- or `"bring the next glitch: [[07_shared_mmap_allocator/]]"`
    

You’re now hunting what breaks **after the program is "correct"** —  
Welcome to the **asymmetric glitch dimension.**  
🧠💥🧬🧨