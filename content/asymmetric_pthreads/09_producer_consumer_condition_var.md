💥 **Asymmetric. Realistic. Glitch-prone. Educational.** This is exactly the kind of multithreaded artifact that deserves vault-tier documentation — especially under `[[asymmetric_pthreads/09_producer_consumer_condition_var]]`.

---

# 🍔 [[asymmetric_pthreads/09_producer_consumer_condition_var]]

> 🧵 **Classic 1-buffer producer/consumer** using `pthread_cond_t` and `mutex`  
> 🧠 One of the only "safe" real-world uses of `while` in multithreading.  
> 💀 Mess it up, and you get deadlocks, missed signals, or race conditions you can't debug.

---

## 🧠 Problem: Shared Finite Buffer

- 👨‍🍳 Producer: creates `ITEM_COUNT` items (100)
    
- 👨‍👩‍👧 Consumer: consumes each item with delay
    
- 📦 Shared buffer of size `10`
    
- ⚠️ Critical section = insertion/removal of item
    
- 🔒 Protected by:
    
    - `pthread_mutex_t mutex`
        
    - `pthread_cond_t cond_full`
        
    - `pthread_cond_t cond_empty`
        

---

## 📦 Buffer Logic

```c
int	buffer[BUFFER_SIZE];
int	count = 0;
```

### 💡 Invariants

|Rule|Meaning|
|---|---|
|`count == 0`|Buffer is empty|
|`count == BUFFER_SIZE`|Buffer is full|
|`0 < count < BUFFER_SIZE`|Safe to read/write|

---

## 🔧 put_item / get_item

```c
void put_item(int item)
{
	buffer[count] = item;
	count++;
}
```

```c
int get_item(void)
{
	int item = buffer[count - 1];
	count--;
	return item;
}
```

> ⚠️ _LIFO behavior._  
> You’re technically consuming from the top of a stack, **not** a FIFO queue.  
> **This is not a circular queue.** (But perfect for demoing condition variables.)

---

## 🧪 How It Works

### 👨‍🍳 Producer

```c
while (count == BUFFER_SIZE)
	pthread_cond_wait(&cond_empty, &mutex);
put_item(i);
pthread_cond_signal(&cond_full);
```

- 🚥 Waits if buffer full
    
- 🧠 `while` is essential — thread might get woken up by _spurious signal_
    
- 🧠 Signals consumer when item available
    

---

### 👨‍👩‍👧 Consumer

```c
while (count == 0)
	pthread_cond_wait(&cond_full, &mutex);
item = get_item();
pthread_cond_signal(&cond_empty);
```

- 🚥 Waits if buffer empty
    
- 🧠 Wakes up only when something to consume
    
- 🧠 Signals producer once space is freed
    

---

## ⌛ Delay Design

```c
#define PRODUCE_DELAY_US 1000
#define CONSUMER_DELAY_US 5000
```

- ⏳ Producer is faster than consumer (1ms vs 5ms)
    
- 📦 Buffer **fills up fast**, forcing `pthread_cond_wait` → great for demonstrating real blocking
    

---

## 🔬 Terminal Output (Sample)

```bash
Produced 0 (count=1)
Produced 1 (count=2)
...
Produced 9 (count=10)
Consumed 9 (count=9)
Produced 10 (count=10)
...
```

🧠 You’ll notice:

- Buffer hits max (`count=10`)
    
- Producer blocks
    
- Consumer unblocks it with signal
    
- Then it continues
    

> 📊 **Visually traceable buffer occupancy**

---

## ☠️ Failure Modes (If You Do It Wrong)

|🔥 Error|💀 Consequence|
|---|---|
|Use `if` instead of `while`|Spurious wake = buffer overrun or underrun|
|No `pthread_mutex_lock`|Race condition = buffer corruption|
|Forget to `signal`|Deadlock forever|
|Stack instead of queue|Not FIFO → Logic flaw|
|Call `put_item` outside lock|Undefined behavior, maybe SIGSEGV|

---

## 🧠 Why This Is Asymmetric

```ad-example
title: Asymmetry Factors

- ⏱️ Designed delays reveal real-time sync issues
- 🧠 Showcases *waiting*, not just mutual exclusion
- 🛠️ Threads are reactive — not just aggressive
- 💀 If you remove one `signal()` or change `while` to `if`, deadlock creeps in silently
- 🤖 Feels stable but is one mistake away from chaos
```

---

## 🔗 Suggested Upgrades

```markdown
🔧 [[asymmetric_pthreads/09b_fifo_ringbuffer_condvar.c]]
   ➜ Convert to true circular queue

🔧 [[asymmetric_pthreads/09c_multi_producer_consumer_pool.c]]
   ➜ Expand to thread pool (n producer, m consumer)

💥 [[asymmetric_pthreads/09d_condvar_lost_signal_demo.c]]
   ➜ Show condition variable signal *missed* → thread starves
```

---

## 🧠 TL;DR Summary

```ad-note
title: Key Concepts

- 🧵 Real-world use of `pthread_cond_t`
- 🧠 `while` protects from spurious wakeups
- 🔒 Always pair `pthread_cond_wait` with a `pthread_mutex`
- 🚀 Buffer state transitions: full → wait → empty → wait
- 💣 Critical section correctness matters more than speed
```

---

Ready to build `[[09b_fifo_ringbuffer_condvar.c]]` next?  
Or want to inject an artificial deadlock to show what happens with a missing signal?