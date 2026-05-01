(() => {
  'use strict';

  /* ─────────────────────────────────────────
     CONSTANTS & STATE
  ───────────────────────────────────────── */
  const USERS = ['Bamba', 'Ruben', 'Oscar', 'Josias'];
  const STORE_KEY = 'stm_v2';
  const MAX_PER_BLOCK = 5; // each person picks 5 per block

  // assignments: { [taskId]: { assignee, deadline, status } }
  let state = loadState();
  let activeBlock = 'block-1';
  let searchQuery = '';
  let filterUser = 'all';
  let filterStatus = 'all';
  let currentTaskId = null;

  /* ─────────────────────────────────────────
     PERSISTENCE
  ───────────────────────────────────────── */
  function loadState() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
    catch { return {}; }
  }
  function saveState() {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  }

  /* ─────────────────────────────────────────
     DOM REFERENCES
  ───────────────────────────────────────── */
  const $ = id => document.getElementById(id);
  const block1El    = $('block-1');
  const block2El    = $('block-2');
  const usersEl     = $('users-container');
  const progressEl  = $('global-progress');
  const percentEl   = $('global-percent');
  const kpiAssigned = $('kpi-assigned');
  const kpiCompleted= $('kpi-completed');
  const modal       = $('task-modal');
  const modalTitle  = $('modal-title');
  const modalDiff   = $('modal-difficulty');
  const modalBlock  = $('modal-block-tag');
  const modalTaskId = $('modal-task-id');
  const modalDesc   = $('modal-description');
  const assigneeEl  = $('assignee-select');
  const deadlineEl  = $('deadline-datetime');
  const statusEl    = $('status-select');
  const saveBtn     = $('save-task-btn');
  const deadlineInfo= $('deadline-info');
  const assigneePreview = $('modal-assignee-preview');
  const searchEl    = $('search-input');
  const filterUserEl = $('filter-user');
  const filterStatusEl = $('filter-status');
  const emptyState  = $('empty-state');
  const tabCount1   = $('tab-count-1');
  const tabCount2   = $('tab-count-2');
  const toast       = $('toast');
  const cursorGlow  = $('cursor-glow');

  /* ─────────────────────────────────────────
     TOAST
  ───────────────────────────────────────── */
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  }

  /* ─────────────────────────────────────────
     CURSOR GLOW
  ───────────────────────────────────────── */
  document.addEventListener('mousemove', e => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top  = e.clientY + 'px';
  });

  /* ─────────────────────────────────────────
     DEADLINE UTILITIES
  ───────────────────────────────────────── */
  function deadlineUrgency(deadline) {
    if (!deadline) return null;
    const ms = new Date(deadline) - Date.now();
    const hours = ms / 36e5;
    if (ms < 0)     return 'overdue';
    if (hours < 24) return 'urgent';
    if (hours < 72) return 'soon';
    return 'ok';
  }

  function formatDeadline(deadline) {
    if (!deadline) return '';
    const d = new Date(deadline);
    const now = new Date();
    const diffMs = d - now;
    const diffDays = Math.floor(diffMs / 864e5);
    const diffHours = Math.floor(diffMs / 36e5);

    if (diffMs < 0) return '⚠ Vencida';
    if (diffHours < 1) return `En ${Math.floor(diffMs/60000)} min`;
    if (diffHours < 24) return `En ${diffHours}h`;
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Mañana';
    if (diffDays < 7) return `En ${diffDays} días`;
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  }

  function deadlineClass(urgency) {
    if (urgency === 'overdue' || urgency === 'urgent') return 'urgent';
    if (urgency === 'soon') return 'soon';
    return 'ok';
  }

  /* ─────────────────────────────────────────
     COMPUTED STATS
  ───────────────────────────────────────── */
  function computeUserStats(user) {
    let b1 = 0, b2 = 0, done = 0;
    projectTasks.forEach(t => {
      const a = state[t.id];
      if (!a || a.assignee !== user) return;
      if (t.block === 1) b1++;
      if (t.block === 2) b2++;
      if (a.status === 'completed') done++;
    });
    return { b1, b2, total: b1 + b2, done };
  }

  function computeGlobal() {
    let assigned = 0, completed = 0;
    Object.values(state).forEach(a => {
      if (a.assignee && a.assignee !== 'unassigned') {
        assigned++;
        if (a.status === 'completed') completed++;
      }
    });
    return { assigned, completed, total: projectTasks.length };
  }

  /* ─────────────────────────────────────────
     RENDER: SIDEBAR TEAM CARDS
  ───────────────────────────────────────── */
  function renderTeam() {
    usersEl.innerHTML = '';
    USERS.forEach(user => {
      const s = computeUserStats(user);
      const b1Pct = (s.b1 / MAX_PER_BLOCK) * 100;
      const b2Pct = (s.b2 / MAX_PER_BLOCK) * 100;
      const isFull = s.b1 >= MAX_PER_BLOCK && s.b2 >= MAX_PER_BLOCK;

      const card = document.createElement('div');
      card.className = 'member-card';
      card.innerHTML = `
        <div class="member-top">
          <div class="member-name">
            <div class="member-avatar">${user[0]}</div>
            ${user}
          </div>
          ${s.done > 0 ? `<span class="member-done-badge">✓ ${s.done}</span>` : ''}
          ${isFull ? `<span class="member-done-badge" style="background:rgba(16,185,129,0.12);color:#10b981">★ Completo</span>` : ''}
        </div>
        <div class="member-bars">
          <div class="mini-bar-row">
            <span class="mini-bar-label">B1</span>
            <div class="mini-bar-track">
              <div class="mini-bar-fill b1" style="width:${b1Pct}%"></div>
            </div>
            <span class="mini-bar-val" style="color:${s.b1 > MAX_PER_BLOCK ? 'var(--hard)' : 'var(--text-2)'}">${s.b1}/${MAX_PER_BLOCK}</span>
          </div>
          <div class="mini-bar-row">
            <span class="mini-bar-label">B2</span>
            <div class="mini-bar-track">
              <div class="mini-bar-fill b2" style="width:${b2Pct}%"></div>
            </div>
            <span class="mini-bar-val" style="color:${s.b2 > MAX_PER_BLOCK ? 'var(--hard)' : 'var(--text-2)'}">${s.b2}/${MAX_PER_BLOCK}</span>
          </div>
        </div>
      `;
      usersEl.appendChild(card);
    });
  }

  /* ─────────────────────────────────────────
     RENDER: GLOBAL KPIs
  ───────────────────────────────────────── */
  function renderKPIs() {
    const g = computeGlobal();
    const pct = Math.round((g.assigned / g.total) * 100);
    progressEl.style.width = pct + '%';
    percentEl.textContent = pct + '%';
    kpiAssigned.textContent = g.assigned;
    kpiCompleted.textContent = g.completed;
  }

  /* ─────────────────────────────────────────
     RENDER: TASK CARDS
  ───────────────────────────────────────── */
  function getFilteredTasks(block) {
    return projectTasks.filter(t => {
      if (t.block !== block) return false;
      const a = state[t.id] || {};
      const isAssigned = a.assignee && a.assignee !== 'unassigned';
      const isCompleted = a.status === 'completed';

      if (filterUser !== 'all' && a.assignee !== filterUser) return false;
      if (filterStatus === 'unassigned' && isAssigned) return false;
      if (filterStatus === 'assigned' && (!isAssigned || isCompleted)) return false;
      if (filterStatus === 'completed' && !isCompleted) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!t.title.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }

  function renderTasks() {
    const b1Tasks = getFilteredTasks(1);
    const b2Tasks = getFilteredTasks(2);

    tabCount1.textContent = `${b1Tasks.length} tareas`;
    tabCount2.textContent = `${b2Tasks.length} tareas`;

    renderTaskGrid(block1El, b1Tasks);
    renderTaskGrid(block2El, b2Tasks);

    const activeTasks = activeBlock === 'block-1' ? b1Tasks : b2Tasks;
    emptyState.style.display = activeTasks.length === 0 ? 'flex' : 'none';
  }

  function renderTaskGrid(container, tasks) {
    container.innerHTML = '';
    tasks.forEach((task, i) => {
      const a = state[task.id] || {};
      const isAssigned = a.assignee && a.assignee !== 'unassigned';
      const isCompleted = a.status === 'completed';
      const urgency = deadlineUrgency(a.deadline);

      const card = document.createElement('div');
      card.className = `task-card${isCompleted ? ' completed' : ''}`;
      card.style.animationDelay = `${i * 0.03}s`;
      card.dataset.taskId = task.id;

      const deadlineStr = formatDeadline(a.deadline);
      const urgencyClass = urgency ? deadlineClass(urgency) : '';

      card.innerHTML = `
        <div class="card-top">
          <span class="card-num">TAREA-${String(task.id).padStart(2,'0')}</span>
          <div class="card-badges">
            ${isCompleted ? '<span class="badge badge-done">✓ Done</span>' : ''}
            <span class="badge badge-${task.difficulty === 'Fácil' ? 'easy' : task.difficulty === 'Media' ? 'medium' : 'hard'}">${task.difficulty}</span>
          </div>
        </div>
        <div class="card-title">${task.title}</div>
        <div class="card-footer">
          ${isAssigned
            ? `<div class="card-assignee"><div class="mini-avatar">${a.assignee[0]}</div>${a.assignee}</div>`
            : `<span style="font-size:0.75rem;color:var(--text-3)">Sin asignar</span>`
          }
          ${deadlineStr
            ? `<div class="card-deadline ${urgencyClass}">🕒 ${deadlineStr}</div>`
            : `<div></div>`
          }
        </div>
      `;

      card.addEventListener('click', () => openModal(task));
      container.appendChild(card);
    });
  }

  /* ─────────────────────────────────────────
     MODAL
  ───────────────────────────────────────── */
  function openModal(task) {
    currentTaskId = task.id;
    const a = state[task.id] || {};

    modalTitle.textContent = task.title;
    modalDiff.textContent = task.difficulty;
    modalDiff.className = `badge badge-${task.difficulty === 'Fácil' ? 'easy' : task.difficulty === 'Media' ? 'medium' : 'hard'}`;
    modalBlock.textContent = `Bloque ${task.block}`;
    modalTaskId.textContent = `#${String(task.id).padStart(2,'0')}`;
    modalDesc.innerHTML = task.description;

    assigneeEl.value = a.assignee || 'unassigned';
    deadlineEl.value = a.deadline || '';
    statusEl.value   = a.status   || 'pending';

    updateDeadlineInfo();
    updateAssigneePreview();

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Animate in the modal description items
    modalDesc.querySelectorAll('li').forEach((li, i) => {
      li.style.opacity = '0';
      li.style.transform = 'translateX(-8px)';
      li.style.transition = `opacity 0.3s ${i*0.04}s, transform 0.3s ${i*0.04}s`;
      requestAnimationFrame(() => { li.style.opacity = '1'; li.style.transform = 'none'; });
    });
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentTaskId = null;
  }

  function updateDeadlineInfo() {
    const dl = deadlineEl.value;
    if (!dl) { deadlineInfo.style.display = 'none'; return; }
    const urgency = deadlineUrgency(dl);
    const msgs = {
      overdue: '⚠ Este plazo ya ha vencido.',
      urgent:  '🔴 Menos de 24 horas. ¡Urgente!',
      soon:    '🟡 Menos de 3 días. A tener en cuenta.',
      ok:      '🟢 Plazo holgado. Sin presión.'
    };
    deadlineInfo.textContent = msgs[urgency];
    deadlineInfo.className = `deadline-info ${deadlineClass(urgency)}`;
    deadlineInfo.style.display = 'block';
  }

  function updateAssigneePreview() {
    const v = assigneeEl.value;
    if (v === 'unassigned') { assigneePreview.innerHTML = ''; return; }
    assigneePreview.innerHTML = `
      <div style="width:28px;height:28px;border-radius:50%;background:var(--grad);display:flex;align-items:center;justify-content:center;font-size:0.72rem;font-weight:700;color:white;">${v[0]}</div>
      <span style="font-weight:600;">${v}</span>
    `;
  }

  function saveTask() {
    if (!currentTaskId) return;
    const prev = state[currentTaskId] || {};
    const assignee = assigneeEl.value;
    const deadline = deadlineEl.value;
    const status   = statusEl.value;

    // Block size validation
    if (assignee !== 'unassigned' && assignee !== prev.assignee) {
      const task = projectTasks.find(t => t.id === currentTaskId);
      const stats = computeUserStats(assignee);
      const blockCount = task.block === 1 ? stats.b1 : stats.b2;
      if (blockCount >= MAX_PER_BLOCK) {
        showToast(`⚠ ${assignee} ya tiene ${MAX_PER_BLOCK} tareas en el Bloque ${task.block}.`);
        return;
      }
    }

    state[currentTaskId] = { assignee, deadline, status };
    saveState();
    renderAll();
    closeModal();

    const labels = { pending: 'Pendiente', 'in-progress': 'En progreso', completed: 'Completada' };
    showToast(`✓ Tarea guardada · ${assignee !== 'unassigned' ? assignee : 'Sin asignar'} · ${labels[status]}`);
  }

  /* ─────────────────────────────────────────
     RENDER ALL
  ───────────────────────────────────────── */
  function renderAll() {
    renderTasks();
    renderTeam();
    renderKPIs();
  }

  /* ─────────────────────────────────────────
     EVENT LISTENERS
  ───────────────────────────────────────── */
  // Tabs
  document.querySelectorAll('.block-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.block-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeBlock = btn.dataset.target;
      document.querySelectorAll('.task-grid').forEach(g => g.classList.remove('active'));
      document.getElementById(activeBlock).classList.add('active');
      renderTasks(); // refresh empty state visibility
    });
  });

  // Filters
  let searchDebounce;
  searchEl.addEventListener('input', () => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      searchQuery = searchEl.value.trim();
      renderAll();
    }, 200);
  });

  filterUserEl.addEventListener('change', () => { filterUser = filterUserEl.value; renderAll(); });
  filterStatusEl.addEventListener('change', () => { filterStatus = filterStatusEl.value; renderAll(); });

  // Modal controls
  $('close-modal').addEventListener('click', closeModal);
  $('close-modal-2').addEventListener('click', closeModal);
  saveBtn.addEventListener('click', saveTask);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  // Live deadline preview
  deadlineEl.addEventListener('change', updateDeadlineInfo);
  assigneeEl.addEventListener('change', updateAssigneePreview);

  // Keyboard: Escape closes modal
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Sidebar toggle
  const sidebarToggle = $('sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  sidebarToggle.addEventListener('click', () => {
    // Mobile: toggle class on sidebar directly
    // Desktop: toggle wrapper class
    if (window.innerWidth <= 900) {
      sidebar.classList.toggle('mobile-open');
    } else {
      document.querySelector('.app-wrapper').classList.toggle('sidebar-collapsed');
    }
  });

  /* ─────────────────────────────────────────
     BOOT
  ───────────────────────────────────────── */
  renderAll();

})();
