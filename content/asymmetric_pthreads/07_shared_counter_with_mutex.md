🔥 Let’s turn this into an **elite-level Obsidian note** for `[[asymmetric_pthreads/07_shared_counter_with_mutex]]` — it’s one of the most **fundamental building blocks** for understanding threading, atomicity, and mutex behavior. 📦⚙️

---

# 🧵 [[asymmetric_pthreads/07_shared_counter_with_mutex]]

> 📈 **Goal**: Increment a global `counter` from **32 threads**, each doing **100,000 iterations**, while ensuring **no race conditions** occur via a `pthread_mutex_t` lock.

---

## 🔧 The Code

```c
#define THREAD_COUNT 32
#define ITERATIONS 100000

int counter = 0;
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

```

- 🔁 Each of the 32 threads calls `increment()` 100,000 times.
    
- 🔒 A **single global mutex** ensures that only **one thread at a time** updates `counter`.
    

---

### 🔄 `increment()` Function

```c
void	*increment(void *arg)
{
	int	i = 0;
	while (i < ITERATIONS)
	{
		pthread_mutex_lock(&lock);
		counter += 1;
		pthread_mutex_unlock(&lock);
		i++;
	}
	return (NULL);
}
```

- 🧠 Critical section:
    
    ```c
    pthread_mutex_lock(&lock);
    counter += 1;
    pthread_mutex_unlock(&lock);
    ```
    
- This protects the **read-modify-write** sequence from race conditions.
    

---

## 🧪 Output Validation

```c
printf("Final counter value: %d (Expected %d)\n", counter, THREAD_COUNT * ITERATIONS);
```

Expected: `32 * 100000 = 3,200,000`  
If you get **any lower number**, it means:

- ❌ You removed the mutex
    
- 💥 There was a race condition corrupting `counter`
    

---

## 🧠 Why This Matters

```ad-note
title: Key Concepts Reinforced
collapse: open
- 🧵 **Thread interleaving**: without a mutex, many threads can read the same value and overwrite each other
- 🔒 **Mutex protects atomicity**: guarantees only one thread accesses `counter` at a time
- 🎯 **Determinism**: using a mutex leads to predictable, correct output across all runs
```

---

## ⚠️ What If You Remove the Mutex?

```c
// pthread_mutex_lock(&lock);
// counter += 1;
// pthread_mutex_unlock(&lock);
```

```bash
Final counter value: 2829471 (Expected 3200000)
Final counter value: 2198452 (Expected 3200000)
```

> 🔥 This is a **classic data race**. Some increments are lost due to concurrent access.

---

## 🧵 Why Not Use `++counter`?

Because even `counter++` is **not atomic** — it's:

```c
int tmp = counter;
tmp = tmp + 1;
counter = tmp;
```

Multiple threads can:

- Read the same value
    
- Write it back after incrementing
    
- Overwrite each other's work
    

🧨 Boom: Race condition.

---

## 🧠 What Can We Do Next?

```ad-tip
title: Extensions & Experiments
- ✅ Replace `mutex` with `atomic_int` (see: [[08_atomic_counter_raceproof]])
- 🔁 Try increasing `THREAD_COUNT` to 512+ and benchmark latency
- 📉 Time the execution with `clock_gettime` to see mutex cost
- ⚠️ Comment out mutex to demonstrate live race conditions
- 💥 Add a sleep (`usleep(1)`) inside the loop to exaggerate contention
```

---

## 🔍 Real World Analogy

> This is like 32 people trying to update a shared spreadsheet 📊.  
> Without a **lock on the spreadsheet**, multiple people can **erase each other’s updates**.

---

## 📎 Obsidian Links

```markdown
- Follow-up: [[asymmetric_pthreads/08_atomic_counter_raceproof]]
- Related: [[asymmetric_pthreads/02_pthread_deadlock_simulation]]
- Related: [[asymmetric_pthreads/13_spinlock_and_compare_swap]]
```

---

## ✅ Summary

```ad-note
title: Recap
- 🧵 32 threads each increment a shared counter
- 🔒 Mutex guarantees atomic updates
- ✅ Correct output: 3,200,000
- ❌ Removing the mutex leads to silent data corruption
- 🧠 Core concept in all parallel programming, databases, and systems logic
```

---

Ready for `[[08_atomic_counter_raceproof]]` next? I can format that one just as cleanly and push it to vault spec 🚀