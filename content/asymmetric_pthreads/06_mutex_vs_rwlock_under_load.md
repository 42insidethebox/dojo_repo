Absolutely perfect. This is a top-tier benchmarking test of **`pthread_mutex_t` vs `pthread_rwlock_t`** under a realistic **read-heavy scenario**. Let’s now transform this into an **elite Obsidian note** under `[[asymmetric_pthreads/06_mutex_vs_rwlock_under_load]]` 🧠⚙️

---

# 🧵 [[asymmetric_pthreads/06_mutex_vs_rwlock_under_load]]

> ⚔️ **Benchmark Battle**: How well does a `mutex` hold up against a `rwlock` when 90% of threads just want to read?

---

## 🔍 **Objective**

```ad-info
title: Goal
To compare the performance of a traditional `pthread_mutex_t` versus a `pthread_rwlock_t` when:
- 🧠 1000 threads compete for access
- 🔁 90% are *readers*, 10% are *writers*
- ⚙️ Each thread performs 100 iterations
```

---

## ⚒️ **The Code Setup**

```c
#define THREAD_COUNT 1000
#define READ_RATIO 90
#define ITERATIONS 100
```

- 📊 `READ_RATIO = 90` simulates a **read-heavy** workload.
    
- 👥 `THREAD_COUNT = 1000` simulates a **congested environment**.
    
- 🔁 Each thread runs the logic in a tight loop `ITERATIONS` times.
    

---

## 📦 `struct s_args`

```c
typedef struct s_args {
	int index;
	int is_reader;
	int use_rwlock;
} t_args;
```

Used to:

- Tag threads as readers or writers
    
- Specify whether to benchmark the `mutex` or `rwlock` logic
    

---

## 🧠 Thread Logic: `thread_fn`

```ad-note
title: Reader vs Writer Behavior
collapse: open
- 🔐 If using `rwlock`:
  - `reader` → `pthread_rwlock_rdlock` → safe concurrent reads
  - `writer` → `pthread_rwlock_wrlock` → exclusive access
- 🔒 If using `mutex`:
  - All threads must `pthread_mutex_lock`, even for reads
```

```c
if (args->use_rwlock) {
	if (args->is_reader)
		pthread_rwlock_rdlock();
	else
		pthread_rwlock_wrlock();
	...
	pthread_rwlock_unlock();
} else {
	pthread_mutex_lock();
	...
	pthread_mutex_unlock();
}
```

---

## 🕒 Timing Measurement

```c
clock_gettime(CLOCK_MONOTONIC, &start);
// launch + join all threads
clock_gettime(CLOCK_MONOTONIC, &end);
```

- Uses `CLOCK_MONOTONIC` for nanosecond precision.
    
- Final result is printed as:
    

```bash
mutex     ->time: 142004500, ns
rwlock    ->time:  59004100, ns
```

---

## 📈 Expected Outcome

```ad-example
title: Realistic Performance Insights
- `rwlock` should outperform `mutex` in read-heavy loads ✅
- `mutex` becomes a bottleneck even for readers ❌
- `rwlock` allows **true parallelism for readers** ✨
- Writers still serialize — but overall throughput is much higher
```

---

## 🧠 Learnings

```ad-tip
title: System Design Takeaways
- Always benchmark in **context** — `rwlock` shines when reads dominate
- Don't use `rwlock` if writes are frequent — performance may degrade
- `mutex` is simpler but **can throttle scale** due to unnecessary exclusivity
```

---

## 💣 Warnings

```ad-warning
title: Trap Zones
- ❗ Be careful with `pthread_rwlock_rdlock()` starvation — writers can starve
- ❗ `pthread_rwlock_t` is heavier than `mutex` — memory + performance tradeoff
- ❗ Use with real benchmarking — results may vary based on CPU architecture, load, thread scheduling
```

---

## 🧪 Bonus: Possible Improvements

```markdown
- Add histogram for latency across threads
- Track contention count
- Experiment with WRITE_RATIO = 50
- Pin threads to CPUs with `pthread_setaffinity_np`
- Add yield points (`sched_yield()`) to observe context switch behavior
```

---

## 🔚 Final Verdict

```ad-note
title: Summary
- This test shows **why `rwlock` exists** — not as a replacement, but as an optimization tool.
- In `read-heavy` systems (caches, DB replicas, config services), it's **a clear win**.
- But as always: **test in your own system context** 🔬
```

---

## 📎 Obsidian Links

```markdown
- Related: [[asymmetric_pthreads/07_shared_counter_with_mutex]]
- Related: [[asymmetric_pthreads/13_spinlock_and_compare_swap]]
- Advanced: [[asymmetric_pthreads/36_mutexattr_recursive_deadlock_fix]]
```

---

Let me know if you'd like to run multiple variations of this benchmark (e.g. 10/90 write-heavy, 50/50, or full writer overload)!