### 💥 _"What You Think Is Just Hello Threads — Actually Isn’t"_

---

## 📂 Code: `01_pthread_create_basics.c`

```c
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>

void	*thread_fn(void *arg)
{
	(void)arg;
	printf("🧵 Thread started! ID = %p\n", (void *)pthread_self());
	sleep(1);
	printf("✅ Thread finishing\n");
	return (NULL);
}

int	main(void)
{
	pthread_t	t;

	printf("🚀 main() starting\n");
	if (pthread_create(&t, NULL, thread_fn, NULL) != 0)
	{
		perror("❌ pthread_create failed");
		return (1);
	}
	printf("⌛ Waiting for thread to finish...\n");
	pthread_join(t, NULL);
	printf("🏁 main() finished\n");
	return (0);
}
```

---

## 🧠 What You _Think_ You’re Learning

- ✅ How to start a thread
    
- ✅ How to wait for it
    
- ✅ That threads look simple and are just like `fork()`, right?
    

---

## 💣 What You’re _Actually_ Learning

> You're **playing with a loaded gun** and it just happens to be unloaded this time.

|Surface|Asymmetry|
|---|---|
|`pthread_create()`|Does not guarantee thread started successfully until it runs|
|`pthread_self()`|Returns **opaque object** — NEVER compare with `==`|
|`pthread_join()`|Can deadlock **if you accidentally call it from the same thread**|
|Return `NULL`|You're missing **a memory cleanup lesson** for all future code|
|One thread only|You assume thread order is obvious — **just wait** until you scale to 100+|

---

## 💡 Mental Upgrades You Get

```ad-tip
title: Asymmetric Insight
This is not "create a thread".

This is:
- “What if your main() exits before the thread even starts?”
- “What if your `thread_fn` allocates memory and never frees it?”
- “What if thread returns a struct but you forget to join it?”
```

---

## 🧩 Execution Timeline

```
main() starting
⌛ Waiting for thread to finish...
🧵 Thread started! ID = 0x700003b00000
✅ Thread finishing
🏁 main() finished
```

But this is **not guaranteed** to always print in the same order. On slow CPUs or heavy systems:

```
main() starting
⌛ Waiting...
🏁 main() finished
🧵 Thread started! ❌ (Too late — `main()` exited)
```

That’s why later, you’ll need:

- `pthread_join()` ✅
    
- **Barriers, condvars, or mutexes** to sync thread readiness ⛓️
    
- Cleanup and `free()`s after threads finish 🔥
    

---

## 🧠 Truth Bombs 💣

```ad-warning
title: If You Don’t Learn This Now...
Later you'll:
- leak memory
- join dead threads
- deadlock your main
- wonder why your log prints are broken

And you’ll blame “threads are hard”  
But actually? You skipped asymmetric thread #01.
```

---

## ✅ Checkpoint for This File

|🔍 Item|✅|
|---|---|
|Uses `pthread_create()`|✅|
|Uses `pthread_join()`|✅|
|Thread prints its ID|✅|
|Thread does _not_ return data|✅|
|No memory leaks|✅ (for now)|
|No races, no mutex yet|✅|

---

## 🔗 Related Notes

- [[asymmetric_pthreads/02_pthread_deadlock_simulation]]
    
- [[asymmetric_pthreads/05_join_vs_detach_threads]]
    
- [[Philosophers/09_pthread_create]]
    
- [[Philosophers/10_pthread_join]]
    

---

## 📦 What Comes Next?

In [[02_pthread_deadlock_simulation]], you’ll **witness mutual locking traps** and see threads kill each other **without crashing**.

Would you like me to deliver the refactored `[[asymmetric_pthreads/02_pthread_deadlock_simulation]]` now in the same asymmetric breakdown style?