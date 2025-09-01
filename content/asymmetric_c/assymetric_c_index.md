# 📂 [[asymmetric_c_index]]

## 🔁 FD + IO Mastery
- [[asymmetric_c/01_fd_dup_chain_bomb]]
- [[asymmetric_c/02_fd_leak_visualizer]]
- [[asymmetric_c/03_read_closed_fd_trap]]
- [[asymmetric_c/04_fd_mirror_fanout]]
- [[asymmetric_c/05_fd_exhaustion_test]]

## 🧠 Memory Models & Allocation
- [[asymmetric_c/06_malloc_after_fork_glitch]]
- [[asymmetric_c/07_shared_mmap_allocator]]
- [[asymmetric_c/08_malloc_tls_isolation_test]]
- [[asymmetric_c/09_arena_allocator_scope_test]]

## 🐚 Pipes, Redirects, Shell Layers
- [[asymmetric_c/11_pipe_chain_executor]]
- [[asymmetric_c/12_pipe_zero_byte_race]]
- [[asymmetric_c/13_redirect_stdout_to_self]]
- [[asymmetric_c/14_stdout_recursive_redirection]]
- [[asymmetric_c/15_pipex_dag_graph_exec]]

## 🔒 Threads, Locks, Atomicity
- [[asymmetric_c/16_spinlock_vs_mutex_latency]]
- [[asymmetric_c/17_pthread_mutex_starvation.c]]
- [[asymmetric_c/18_pthread_affinity_pin.c/]]
- [[asymmetric_c/19_condvar_backpressure_sim/]]
- [[asymmetric_c/20_ticket_lock_fairness_test/]]

## 👻 Fork/Exec/Zombie Scenarios
- [[asymmetric_c/21_exec_zombie_factory/]]
- [[asymmetric_c/22_orphaned_process_killpg_test/]]
- [[asymmetric_c/23_exec_while_unlinking/]]
- [[asymmetric_c/24_null_argv_exec_trap/]]
- [[asymmetric_c/25_shell_builtin_fork_error/]]

## 📡 Signals, Interrupts, Stack Tricks
- [[asymmetric_c/26_sigaltstack_custom_handler/]]
- [[asymmetric_c/27_signal_storm_simulator/]]
- [[asymmetric_c/28_sigchld_reaping_logic/]]
- [[asymmetric_c/29_sigsegv_fault_tracer/]]
- [[asymmetric_c/30_signal_vector_router/]]

## 🧬 Raw Syscalls + Clone + Futex
- [[asymmetric_c/31_clone_raw_thread_sim/]]
- [[asymmetric_c/32_futex_sync_basic/]]
- [[asymmetric_c/33_clone_thread_exit_leak.c/]]
- [[asymmetric_c/34_mmap_stack_overflow_test/]]
- [[asymmetric_c/35_clone_sigaltstack_glitch/]]

## 🔁 Polling & Async IO
- [[asymmetric_c/36_poll_pipe_load_balancer/]]
- [[asymmetric_c/37_select_vs_poll_latency/]]
- [[asymmetric_c/38_event_loop_job_executor/]]
- [[asymmetric_c/39_async_stdio_ringbuffer.c/]]
- [[asymmetric_c/40_fd_backpressure_detector/]]

## 💀 Syscall Edge Cases + Black Magic
- [[asymmetric_c/41_zero_syscall_experiment/]]
- [[asymmetric_c/42_open_dir_as_exec.c/]]
- [[asymmetric_c/43_syscall_latency_timer/]]
- [[asymmetric_c/44_bad_errno_misuse_demo/]]
- [[asymmetric_c/45_fd_transfer_pipe_sim.c/]]

## 🧠 Meta-Systems & VM Simulations
- [[asymmetric_c/46_minishell_as_vm.c/]]
- [[asymmetric_c/47_ast_command_scheduler.c/]]
- [[asymmetric_c/48_env_snapshot_manager.c/]]
- [[asymmetric_c/49_ptrace_syscall_logger.c/]]
- [[asymmetric_c/50_sigaltstack_handler_vmtrap.c/]]



.... Phase 2

💥 LET'S GO.

---

# 🧠 `[[asymmetric_c_advanced_index_51_100.md]]`

## 🔥 Phase 2: System Architect Mode Activated

> These aren’t demos. These are **micro-infrastructures**.

> Each project from **51–100** can have up to **10 files**  
> Including: `src/`, `include/`, `Makefile`, `README.md`, `bin/`, `output/`, etc.

---

## 📂 Obsidian Folder: `[[asymmetric_c/]]`

### New Projects: `asymmetric_c/51_*/` to `100_*/`

Each:

- 📦 Modular system
    
- 📄 `README.md` explaining systems-level goals
    
- 🧠 Designed to **train what most engineers never even touch**
    

---

## ✅ PHASE 2 — The 51 to 100 Index

Here’s the full **strategic outline** — grouped by mastery domain:

---

### 🔧 FILESYSTEMS, ELF, AND BINARY FORMATS

- [[asymmetric_c/51_parse_elf_headers/]] 🧠 Parse and interpret your own ELF binary
- [[asymmetric_c/52_memory_map_executables/]] 💥 Use `mmap` to run code from memory
- [[asymmetric_c/53_custom_malloc_dl_map/]] 🧃 Rebuild malloc map using `/proc/self/maps`
- [[asymmetric_c/54_filesystem_mkdir_tree_sim.c/]] 🌲 Create nested trees using `mkdir()`
- [[asymmetric_c/55_raw_disk_block_writer.c/]] 💾 Simulate block writes on flat file

---

### 🧬 RUNTIME ENGINES + COMPILER PHILOSOPHY

- [[asymmetric_c/56_token_stream_parser.c/]] 📜 Build a tokenizer from scratch
- [[asymmetric_c/57_ast_command_interpreter/]] 🌳 Parse CLI AST and exec recursively
- [[asymmetric_c/58_bytecode_vm_engine.c/]] ⚙️ Your own bytecode VM with stack
- [[asymmetric_c/59_shell_script_compiler.c/]] 🧠 Compile basic shell scripts into IR
- [[asymmetric_c/60_minishell_opt_pass_demo/]] 🌀 Optimize command chain before exec

---

### 💾 MEMORY SYSTEMS, ALLOCATORS, PROTECTION

- [[asymmetric_c/61_tls_aware_arena_allocator.c/]] 🧵 Arena with thread-local heaps
- [[asymmetric_c/62_custom_malloc_benchmark/]] ⚖️ Compare system vs custom allocators
- [[asymmetric_c/63_page_guard_stack_test.c/]] 🧱 Simulate guard pages and trap overflow
- [[asymmetric_c/64_memory_snapshot_tool.c/]] 📸 Clone heap state and restore
- [[asymmetric_c/65_dynamic_segment_allocator.c/]] 🧮 Allocate memory by named segments

---

### 🔥 KERNEL-SIDE THINKING (SCHEDULERS, PAGE FAULTS, MMU)

- [[asymmetric_c/66_simulated_mmu_mapper.c/]] 🧠 Remap virtual → physical ranges
- [[asymmetric_c/67_user_scheduler_sim.c/]] 🧵 Write your own scheduler loop
- [[asymmetric_c/68_priority_starvation_demo.c/]] 💣 Create starvation using priority bias
- [[asymmetric_c/69_page_fault_handler_sim.c/]] 💥 Catch segfaults, retry with fixup
- [[asymmetric_c/70_lazy_load_simulation.c/]] 💤 Allocate pages on-demand during access

---

### 🧵 THREAD COORDINATION SYSTEMS

- [[asymmetric_c/71_thread_lifecycle_vm.c/]] 🔁 Thread lifecycle as bytecode
- [[asymmetric_c/72_concurrent_pipe_tree.c/]] 🌲 Build full tree of worker threads
- [[asymmetric_c/73_thread_safe_ringlog.c/]] 🔄 Threaded ringbuffer with snapshotting
- [[asymmetric_c/74_fiber_emulation_via_context.c/]] 🧬 Use `ucontext.h` to simulate coroutines
- [[asymmetric_c/75_deferred_cleanup_threads.c/]] 🧹 Thread resource pool with deferred cleanup

---

### 📡 IPC / SOCKETS / NETWORKED SYSTEMS

- [[asymmetric_c/76_local_socket_shell_executor.c/]] 🐚 Command interface via UNIX socket
- [[asymmetric_c/77_named_pipe_duplex_server.c/]] 🧵 Bidirectional shell via FIFO
- [[asymmetric_c/78_udp_packet_simulator.c/]] 📡 Send & receive custom packet format
- [[asymmetric_c/79_forked_http_multiplexer.c/]] 🌐 Handle multiple requests with `fork()`
- [[asymmetric_c/80_shared_memory_chatroom.c/]] 🧠 Chat using `shm_open` + mutex

---

### 🔬 EMERGING SYSTEMS / REWRITTEN UTILITIES

- [[asymmetric_c/81_clone_ls_from_syscalls.c/]] 🧾 Rewrite `ls` from raw `openat()`
- [[asymmetric_c/82_posix_cat_clone.c/]] 🐈 Make your own `cat` with edge flags
- [[asymmetric_c/83_rebuild_ps_via_proc.c/]] 👀 Parse `/proc/*` to get live process info
- [[asymmetric_c/84_custom_init_system.c/]] 🔁 Your own PID 1 mini system
- [[asymmetric_c/85_terminal_multiplexer_sim.c/]] 🧷 Run multiple jobs in terminal "tabs"

---

### 🧠 BEYOND POSIX: SIMULATION, ABSTRACTION, INTERFACES

- [[asymmetric_c/86_reactive_signal_map.c/]] 🧠 Bind signals to dynamic function pointers
- [[asymmetric_c/87_cli_macro_system.c/]] 🔁 Shell macros that expand into sequences
- [[asymmetric_c/88_in_memory_file_fs.c/]] 💾 Your own RAM-based filesystem simulation
- [[asymmetric_c/89_cli_plugin_runtime.c/]] 🔌 Load shell builtins as .so plugins
- [[asymmetric_c/90_function_trace_engine.c/]] 🧲 Log every function call w/ macro overlay

---

### 💀 BLACK MAGIC / INTERPRETER / BREAK THE SYSTEM

- [[asymmetric_c/91_backtrace_generator.c/]] 📉 Trigger signal + show full trace
- [[asymmetric_c/92_fork_bomb_visualizer.c/]] 💣 Fork storm → show family tree
- [[asymmetric_c/93_syscall_trampoline_injector.c/]] 🚨 Patch syscall flow via pointer trick
- [[asymmetric_c/94_fuzz_fd_crash_tester.c/]] 🔬 Generate FD misuse edge cases
- [[asymmetric_c/95_memview_live_segment.c/]] 👁️ Show process memory layout in live CLI

---

### 🧠 LINGUISTIC + METACOGNITIVE EXPERIMENTS

```markdown
- [[asymmetric_c/96_c_thought_machine.c/]] 🧠 Program that simulates conscious threads
- [[asymmetric_c/97_debuggable_vm_shell.c/]] 🔍 Shell interpreter with step-debug + stack view
- [[asymmetric_c/98_codebase_compactor.c/]] 🧼 Remove unused .c/.h based on symbol graph
- [[asymmetric_c/99_neural_mem_allocator_sim.c/]] 🧬 Simulate learning-based allocator weights
- [[asymmetric_c/100_bootloader_chain_simulator.c/]] 🌀 Simulate bootsector → OS handoff in high C
```

---

## 🧠 Say the word and I will:

- 💣 Drop `51_parse_elf_headers/` now as a full modular vault mini-project
    
- 🧱 Generate README templates and headers for all 50 advanced projects
    
- 📦 Provide Makefile/project scaffolds with FAANG-grade modularity
    

You’re now not just playing with the OS —  
you’re **writing your own runtime universe.**

Say “GO PHASE 2” and I begin.