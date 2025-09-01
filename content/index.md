# 🏯 Enter the Dojo

Welcome to my **coding vault** — a living collection of experiments in  
**C, systems programming, threading, allocators, and asymmetric projects**.  
This is both my **training ground** and a **public notebook**.

---
<Component type="Graph" />

<div class="video">
  <video autoplay loop muted playsinline>
    <source src="/static/vault_bg_1080.mp4" type="video/mp4" />
  </video>
</div>

## 🔧 Asymmetric C Experiments
Low-level FD, memory, and pipe traps.

- [[asymmetric_c/01_fd_dup_chain_bomb]] – FD duplication stress test
- [[asymmetric_c/02_fd_leak_visualizer]] – Detecting descriptor leaks
- [[asymmetric_c/03_read_closed_fd_trap]] – Behavior of reading closed FDs
- [[asymmetric_c/04_fd_mirror_fanout]] – Splitting streams across FDs
- [[asymmetric_c/05_fd_exhaustion_test]] – Running out of FDs intentionally
- [[asymmetric_c/06_malloc_after_fork_glitch]] – malloc() after fork edge case
- [[asymmetric_c/07_shared_mmap_allocator]] – Shared mmap arena
- [[asymmetric_c/08_malloc_tls_isolation_test]] – malloc & thread-local storage
- [[asymmetric_c/09_arena_allocator_scope_test]] – Scoped arena allocation
- [[asymmetric_c/11_pipe_chain_executor]] – DAG pipe execution chain
- [[asymmetric_c/12_pipe_zero_byte_race]] – Race condition with zero-byte pipes
- [[asymmetric_c/13_redirect_stdout_to_self]] – stdout redirection loops
- [[asymmetric_c/14_stdout_recursive_redirection]] – recursive redirection trap
- [[asymmetric_c/15_pipex_dag_graph_exec]] – generalized pipe DAG executor
- [[asymmetric_c/assymetric_c_index]] – Index page

---

## 📚 Asymmetric DSA
Data structures and algorithms in C.

- [[asymmetric_dsa/structures/01-create-node.c]] – linked list node
- [[asymmetric_dsa/structures/07-create-stack.c]] – stack basics
- [[asymmetric_dsa/structures/13-create-binary-tree.c]] – binary tree creation
- [[asymmetric_dsa/structures/21-hash-table.c]] – hash table foundation
- [[asymmetric_dsa/sorting/27-quick-sort.c]] – quicksort
- [[asymmetric_dsa/sorting/28-merge-sort.c]] – mergesort
- [[asymmetric_dsa/dsa/65-directed-graphs.c]] – directed graph basics
- [[asymmetric_dsa/Master Index DSA]] – Index page

---

## 🧵 Asymmetric Pthreads
Concurrency, synchronization, and thread lifecycle.

- [[asymmetric_pthreads/01_pthread_create_basics]] – basic pthread_create
- [[asymmetric_pthreads/02_pthread_deadlock_simulation]] – deadlock demo
- [[asymmetric_pthreads/05_join_vs_detach_threads]] – join vs detach behavior
- [[asymmetric_pthreads/06_mutex_vs_rwlock_under_load]] – lock contention
- [[asymmetric_pthreads/09_producer_consumer_condition_var]] – condition vars
- [[asymmetric_pthreads/10_philosophers_monitor_heartbeat]] – dining philosophers
- [[asymmetric_pthreads/16_unsynchronized_stdout_race]] – printf race
- [[asymmetric_pthreads/17_malloc_leak_detached_threads]] – leaks in detached threads
- [[asymmetric_pthreads/Index pthreads]] – Index page

---

## 🗺️ Next Steps
- Use the **Graph View** (right panel) to explore all interconnections.
- Add backlinks inside notes (`[[Master Index DSA]]`) to strengthen the graph.

---

⚔️ *Knowledge isn’t hidden — it’s practiced, one kata at a time.*