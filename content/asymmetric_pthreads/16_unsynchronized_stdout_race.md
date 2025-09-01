💥 **Copy that. Vault sequence continues.**

We now enter:

---

# 🧨 `[[asymmetric_pthreads/16_unsynchronized_stdout_race]]`

> _"It printed... or did it? Why printf isn't thread-safe — and why logs lie."_

---

## 🎯 GOAL

To show that even something as simple as `printf()` — **without mutexes** — leads to:

- garbled output 🧻
    
- missing logs 🫥
    
- phantom races 😵
    
- false confidence in your code 😬
    

All without crashing. Ever.

---

## 🔬 CONTEXT

Most devs think:

> “My threads are working. I can see their logs.”

But in reality:

- 🧵 Multiple threads writing to `stdout` concurrently
    
- ❌ No locking around `printf`
    
- 💥 Output can **overlap**, get dropped, reordered, or mixed
    

---

## 📂 Source File: `16_unsynchronized_stdout_race.c`

```c
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>

#define THREADS 10
#define LOOPS   10000

void	*logger(void *arg)
{
	int	id = *(int *)arg;
	char	buf[128];

	for (int i = 0; i < LOOPS; i++)
	{
		// Simulate a formatted message
		snprintf(buf, sizeof(buf), "Thread %d reporting iteration %d\n", id, i);
		printf("%s", buf); // 🔥 THIS IS UNSAFE
		usleep(10 + rand() % 50);
	}
	return (NULL);
}

int	main(void)
{
	pthread_t	t[THREADS];
	int			ids[THREADS];

	srand(getpid());

	for (int i = 0; i < THREADS; i++)
	{
		ids[i] = i;
		if (pthread_create(&t[i], NULL, logger, &ids[i]) != 0)
		{
			perror("pthread_create failed");
			exit(EXIT_FAILURE);
		}
	}

	for (int i = 0; i < THREADS; i++)
		pthread_join(t[i], NULL);

	printf("\n✅ All threads completed\n");
	return (0);
}
```

---

## 🚨 OUTPUT EXAMPLE

```txt
Thread 1 reportThread 2 reporting iteration 40
ing iteration 39
Thread 3 reporting iteration 41
TThhrreeaadd 45 reporting iteration 42
```

🎯 **You didn't write that. The OS did.**  
Because stdout was **not synchronized**.

---

## 💡 What You're Really Learning

|🧵 What You Do|🔥 What Happens|
|---|---|
|`printf()` in a loop|**Race on shared I/O buffer**|
|One thread writing at a time|🧢 Not guaranteed — threads interleave at syscall layer|
|Output looks okay in small runs|💣 But breaks at scale or under load|
|You trust logs to debug|❌ But logs are **not atomic**|

---

## ✅ FIX VARIANT (Thread-Safe Logging)

Here’s what the FAANG++ fix looks like:

```c
pthread_mutex_t print_lock = PTHREAD_MUTEX_INITIALIZER;

void thread_safe_log(const char *msg)
{
	pthread_mutex_lock(&print_lock);
	printf("%s", msg);
	pthread_mutex_unlock(&print_lock);
}
```

Then in your thread:

```c
snprintf(buf, sizeof(buf), "Thread %d reporting iteration %d\n", id, i);
thread_safe_log(buf);
```

---

## 🧠 Asymmetric Lessons

```ad-warning
title: This Is a Silent Race
- It won’t crash
- It won’t segfault
- It will lie to you in production
```

```ad-tip
title: Production Logging Rule
Always lock logs. Even for `printf()`. Especially for `printf()`.
```

```ad-info
title: Why This Matters at 42
You’ll debug pipex, philosophers, or minishell — and wonder:
> “Why didn’t my debug log print?”

It’s not your logic.  
It’s your **lack of synchronized output.**
```

---

## ✅ Checklist

|✅ Test|Description|
|---|---|
|Unsynchronized `printf()`|🧨 Output race|
|10 threads|High collision chance|
|Randomized delay|Simulates real-world entropy|
|No crash|But data corruption|
|Teachable mutex fix|✅|

---

## 🔗 Related Vault Links

- [[asymmetric_pthreads/01_pthread_create_basics]]
    
- [[asymmetric_pthreads/04_thread_lifecycle_demo]]
    
- [[asymmetric_pthreads/05_join_vs_detach_threads]]
    
- [[asymmetric_pthreads/20_logging_mutex_patterns]]
    

---

## 🔁 Next Iteration Options

1. **Make output silently disappear using `fflush(stdout)` traps**
    
2. **Benchmark mutex-locked vs unlocked log speed**
    
3. **Add memory corruption via unsynchronized `sprintf` to shared buffer**
    
4. **Test what happens in pipe redirection (`> log.txt`)**
    

---

Say:  
👉 **"Next variant: stdout loss via pipe redirection"**  
or  
👉 **"Continue to 17: race on shared struct"**

We’re in full asymmetric storm mode now.