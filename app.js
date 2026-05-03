(() => {
  'use strict';

  /* ─────────────────────────────────────────
     CONSTANTS & INITIAL STATE
  ───────────────────────────────────────── */
  const USERS = ['Bamba', 'Ruben', 'Oscar', 'Josias'];
  const STORE_KEY_APP = 'stm_app_v3';
  const MAX_PER_BLOCK = 5;

  let appState = loadAppState();
  let currentProject = null; // Object from projects.js
  let projectState = {}; // assignments: { [taskId]: { assignee, deadline, status } }
  
  let activeBlock = 'block-1';
  let searchQuery = '';
  let filterUser = 'all';
  let filterStatus = 'all';
  let currentTaskId = null;
  let isOnline = false;

  // Firebase Ref
  let dbRef = null;

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
  
  // Modals
  const taskModal   = $('task-modal');
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
  const depWarning  = $('dep-warning');
  
  const bulkModal   = $('bulk-modal');
  const newProjModal= $('new-project-modal');
  const settingsModal=$('settings-modal');
  const readmeModal = $('readme-modal');
  
  // Filters & Tabs
  const searchEl    = $('search-input');
  const filterUserEl = $('filter-user');
  const filterStatusEl = $('filter-status');
  const emptyState  = $('empty-state');
  const tabCount1   = $('tab-count-1');
  const tabCount2   = $('tab-count-2');
  const tabLabel1   = $('tab-label-1');
  const tabLabel2   = $('tab-label-2');
  
  // Project Selector
  const psBtn = $('project-dropdown-btn');
  const psMenu = $('ps-menu');
  const psProjectList = $('ps-project-list');
  const psDot = $('ps-dot');
  const psName = $('ps-name');
  
  // UI Elements
  const toast       = $('toast');
  const cursorGlow  = $('cursor-glow');
  const connBadge   = $('conn-badge');
  const connDot     = $('conn-dot');
  const connLabel   = $('conn-label');
  const syncBanner  = $('sync-banner');

  /* ─────────────────────────────────────────
     PERSISTENCE & APP STATE
  ───────────────────────────────────────── */
  function loadAppState() {
    const defaultSettings = {
      firebase: {
        apiKey: "AIzaSyAkAdHsZTQ8t28NukYShtmJC7p8Dyzu6x4",
        authDomain: "gestion-de-proyectos-46597.firebaseapp.com",
        databaseURL: "https://gestion-de-proyectos-46597-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "gestion-de-proyectos-46597"
      },
      telegram: {},
      theme: 'dark'
    };

    try {
      const data = JSON.parse(localStorage.getItem(STORE_KEY_APP)) || {};
      
      // FORZAMOS LA CONFIGURACIÓN DE FIREBASE HARDCODEADA SIEMPRE.
      // Así evitamos que un fallo al guardar los ajustes deje la app "offline".
      // Respetamos los ajustes de Telegram del usuario.
      const mergedSettings = {
        firebase: defaultSettings.firebase,
        telegram: (data.settings && data.settings.telegram) ? data.settings.telegram : defaultSettings.telegram,
        theme: (data.settings && data.settings.theme) ? data.settings.theme : defaultSettings.theme
      };

      return {
        projects: data.projects || window.DEFAULT_PROJECTS || [],
        currentProjectId: data.currentProjectId || 'smarttimemanager',
        settings: mergedSettings
      };
    } catch {
      return {
        projects: window.DEFAULT_PROJECTS || [],
        currentProjectId: 'smarttimemanager',
        settings: defaultSettings
      };
    }
  }

  function saveAppState() {
    localStorage.setItem(STORE_KEY_APP, JSON.stringify(appState));
  }

  function getProjectDataKey(projectId) {
    return `stm_proj_data_${projectId}`;
  }

  function loadProjectStateLocal(projectId) {
    try {
      return JSON.parse(localStorage.getItem(getProjectDataKey(projectId))) || {};
    } catch {
      return {};
    }
  }

  function saveProjectStateLocal(projectId, state) {
    localStorage.setItem(getProjectDataKey(projectId), JSON.stringify(state));
  }

  /* ─────────────────────────────────────────
     FIREBASE SYNC
  ───────────────────────────────────────── */
  function initFirebase() {
    const bannerText = $('sync-banner-text');
    const fb = appState.settings.firebase;

    // 1. Check config exists
    if (!fb || !fb.databaseURL || !fb.databaseURL.includes('firebase')) {
      setOnlineStatus(false);
      if (bannerText) bannerText.textContent = '🔌 Config Firebase no encontrada — usa Ajustes para configurar.';
      syncBanner.style.display = 'flex';
      loadLocalCurrentProject();
      return;
    }

    // 2. Check Firebase SDK loaded
    if (typeof firebase === 'undefined') {
      setOnlineStatus(false);
      if (bannerText) bannerText.textContent = '🔌 SDK Firebase bloqueado — desactiva el bloqueador de anuncios.';
      syncBanner.style.display = 'flex';
      loadLocalCurrentProject();
      return;
    }

    try {
      // 3. Initialize app if needed
      if (!firebase.apps || firebase.apps.length === 0) {
        firebase.initializeApp({
          apiKey: fb.apiKey || "",
          authDomain: fb.authDomain || "",
          databaseURL: fb.databaseURL,
          projectId: fb.projectId || ""
        });
      }

      // 4. Check database function
      if (typeof firebase.database !== 'function') {
        setOnlineStatus(false);
        if (bannerText) bannerText.textContent = '🔌 SDK incompleto — falta firebase-database.';
        syncBanner.style.display = 'flex';
        loadLocalCurrentProject();
        return;
      }

      // 5. Success!
      setOnlineStatus(true);
      syncBanner.style.display = 'none';
      listenToCurrentProject();

    } catch (err) {
      // If the error is "app already exists", that's fine
      if (err.message && err.message.includes('already exists')) {
        setOnlineStatus(true);
        syncBanner.style.display = 'none';
        listenToCurrentProject();
        listenToActivity();
        return;
      }

      console.error("Firebase init error:", err);
      setOnlineStatus(false);
      if (bannerText) bannerText.textContent = `🔌 Error Firebase: ${err.message}`;
      syncBanner.style.display = 'flex';
      loadLocalCurrentProject();
    }
  }

  function setOnlineStatus(online) {
    isOnline = online;
    if (online) {
      connBadge.className = 'conn-badge online';
      connLabel.textContent = 'En vivo';
    } else {
      connBadge.className = 'conn-badge';
      connLabel.textContent = 'Local';
    }
  }

  function listenToCurrentProject() {
    if (!isOnline || !currentProject) return;
    
    if (dbRef) {
      dbRef.off(); // Remove previous listener
    }
    
    dbRef = firebase.database().ref(`projects/${currentProject.id}/tasks`);
    dbRef.on('value', snap => {
      let data = snap.val();
      if (!data) data = {};
      
      const cleanData = {};
      Object.keys(data).forEach(k => {
        if (data[k] !== null && data[k] !== undefined) {
          cleanData[k] = data[k];
        }
      });
      projectState = cleanData;
      saveProjectStateLocal(currentProject.id, projectState);
      renderAll();
    });
    listenToActivity();
  }

  function logActivity(text, icon = '📌') {
    if (isOnline && currentProject) {
      const actRef = firebase.database().ref(`projects/${currentProject.id}/activity`);
      actRef.push({ text, icon, time: Date.now() });
    }
  }

  function listenToActivity() {
    if (!isOnline || !currentProject) return;
    const actRef = firebase.database().ref(`projects/${currentProject.id}/activity`);
    
    actRef.limitToLast(50).on('value', snap => {
      const listEl = $('activity-list');
      if (!listEl) return;
      listEl.innerHTML = '';
      
      const items = [];
      snap.forEach(child => { items.push(child.val()); });
      items.reverse(); // Newest first
      
      if (items.length === 0) {
        listEl.innerHTML = '<div style="color:var(--text-3); text-align:center; padding: 2rem;">No hay actividad reciente.</div>';
        return;
      }
      
      items.forEach(act => {
        const d = new Date(act.time).toLocaleString('es-ES', { dateStyle:'short', timeStyle:'short' });
        const div = document.createElement('div');
        div.className = 'activity-item';
        div.innerHTML = `
          <div class="activity-icon">${act.icon || '📌'}</div>
          <div class="activity-content">
            <div>${act.text}</div>
            <div class="activity-time">${d}</div>
          </div>
        `;
        listEl.appendChild(div);
      });
    });
  }

  function saveTaskToFirebase(taskId, data) {
    if (isOnline && currentProject) {
      firebase.database().ref(`projects/${currentProject.id}/tasks/${taskId}`).set(data);
    } else {
      saveTaskLocally(taskId, data);
    }
  }

  function saveTaskLocally(taskId, data) {
    projectState[taskId] = data;
    saveProjectStateLocal(currentProject.id, projectState);
    renderAll();
  }

  function loadLocalCurrentProject() {
    if (!currentProject) return;
    projectState = loadProjectStateLocal(currentProject.id);
    renderAll();
  }

  /* ─────────────────────────────────────────
     TELEGRAM INTEGRATION
  ───────────────────────────────────────── */
  async function notifyTelegram(msg) {
    const tg = appState.settings.telegram;
    if (!tg || !tg.botToken || !tg.chatId) {
      console.warn("Telegram no configurado. Token o ChatId faltantes.");
      return;
    }
    
    const url = `https://api.telegram.org/bot${tg.botToken}/sendMessage`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: tg.chatId,
          text: msg,
          parse_mode: 'HTML'
        })
      });
      if (!res.ok) {
        const errData = await res.text();
        console.error('Telegram Error HTTP:', errData);
        showToast("⚠ Fallo al enviar a Telegram (revisa el Chat ID)");
      }
    } catch (e) {
      console.error('Telegram Fetch Error:', e);
      showToast("⚠ Error de red al contactar con Telegram");
    }
  }

  /* ─────────────────────────────────────────
     PROJECT MANAGEMENT
  ───────────────────────────────────────── */
  function switchProject(projectId) {
    const proj = appState.projects.find(p => p.id === projectId);
    if (!proj) return;
    
    currentProject = proj;
    appState.currentProjectId = projectId;
    saveAppState();
    
    updateProjectUI();
    
    if (isOnline) {
      listenToCurrentProject();
    } else {
      loadLocalCurrentProject();
    }
  }

  function updateProjectUI() {
    if (!currentProject) return;
    
    // Sidebar
    $('sidebar-proj-name').textContent = currentProject.name;
    $('sidebar-proj-stack').textContent = currentProject.stack || 'Project Board';
    
    // Topbar
    $('topbar-proj-title').textContent = currentProject.name;
    $('topbar-proj-stack').textContent = currentProject.stack || currentProject.description || '';
    
    // Dropdown btn
    psName.textContent = currentProject.name;
    psDot.style.background = currentProject.color || 'var(--primary)';
    
    // Tabs
    if (currentProject.blocks && currentProject.blocks.length >= 2) {
      tabLabel1.textContent = currentProject.blocks[0].name || 'Bloque 1';
      tabLabel2.textContent = currentProject.blocks[1].name || 'Bloque 2';
    } else {
      tabLabel1.textContent = 'Bloque 1';
      tabLabel2.textContent = 'Bloque 2';
    }
  }

  function renderProjectList() {
    psProjectList.innerHTML = '';
    appState.projects.forEach(p => {
      const item = document.createElement('div');
      item.className = `ps-item ${p.id === currentProject?.id ? 'active' : ''}`;
      item.innerHTML = `
        <span class="ps-dot" style="background:${p.color || '#666'}"></span>
        <span style="flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${p.name}</span>
        ${p.id === currentProject?.id ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
      `;
      item.addEventListener('click', () => {
        switchProject(p.id);
        psMenu.classList.remove('active');
      });
      psProjectList.appendChild(item);
    });
  }

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
    if (diffHours < 1) return `En ${Math.max(0, Math.floor(diffMs/60000))} min`;
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
    
    // We use window.projectTasks since this represents the current project's schema
    // In a full multi-project we'd fetch tasks per project, but here we assume SmartTimeManager structure or empty.
    let tasks = window.projectTasks || [];
    
    tasks.forEach(t => {
      const a = projectState[t.id];
      if (!a || a.assignee !== user) return;
      if (t.block === 1) b1++;
      if (t.block === 2) b2++;
      if (a.status === 'completed') done++;
    });
    return { b1, b2, total: b1 + b2, done };
  }

  function computeGlobal() {
    let assigned = 0, completed = 0;
    let tasks = window.projectTasks || [];
    Object.values(projectState).forEach(a => {
      if (a && a.assignee && a.assignee !== 'unassigned') {
        assigned++;
        if (a.status === 'completed') completed++;
      }
    });
    return { assigned, completed, total: tasks.length || 1 }; // prevent div by 0
  }

  /* ─────────────────────────────────────────
     RENDER: SIDEBAR TEAM CARDS
  ───────────────────────────────────────── */
  function renderTeam() {
    usersEl.innerHTML = '';
    USERS.forEach(user => {
      const s = computeUserStats(user);
      const b1Pct = Math.min(100, (s.b1 / MAX_PER_BLOCK) * 100);
      const b2Pct = Math.min(100, (s.b2 / MAX_PER_BLOCK) * 100);
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
    const pct = g.total > 0 ? Math.round((g.completed / g.total) * 100) : 0;
    progressEl.style.width = pct + '%';
    percentEl.textContent = pct + '%';
    kpiAssigned.textContent = g.assigned;
    kpiCompleted.textContent = g.completed;
  }

  /* ─────────────────────────────────────────
     RENDER: TASK CARDS
  ───────────────────────────────────────── */
  function getFilteredTasks(block) {
    let tasks = window.projectTasks || [];
    return tasks.filter(t => {
      if (t.block !== block) return false;
      const a = projectState[t.id] || {};
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

    renderKanban(1, b1Tasks);
    renderKanban(2, b2Tasks);

    const activeTasks = activeBlock === 'block-1' ? b1Tasks : b2Tasks;
    emptyState.style.display = activeTasks.length === 0 ? 'flex' : 'none';
  }

  function renderKanban(blockNum, tasks) {
    const colPending = $(`b${blockNum}-pending`);
    const colAssigned = $(`b${blockNum}-assigned`);
    const colCompleted = $(`b${blockNum}-completed`);
    
    colPending.innerHTML = '';
    colAssigned.innerHTML = '';
    colCompleted.innerHTML = '';

    let cntP = 0, cntA = 0, cntC = 0;

    tasks.forEach((task, i) => {
      const a = projectState[task.id] || {};
      const status = a.status || 'pending';
      const isAssigned = a.assignee && a.assignee !== 'unassigned';
      const isCompleted = status === 'completed';
      const urgency = deadlineUrgency(a.deadline);

      const card = document.createElement('div');
      let cardClasses = 'task-card';
      if (isCompleted) cardClasses += ' completed';
      else if (status === 'assigned' || isAssigned) cardClasses += ' assigned';
      card.className = cardClasses;
      card.style.animationDelay = `${(i % 10) * 0.03}s`;
      card.dataset.taskId = task.id;
      card.draggable = true;

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
        ${a.subtasks && a.subtasks.length > 0 ? `<div style="font-size:0.75rem; color:var(--text-2); margin-bottom: 0.5rem;">☑ ${a.subtasks.filter(s=>s.done).length}/${a.subtasks.length} subtareas</div>` : ''}
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
      
      card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', task.id);
        setTimeout(() => card.style.opacity = '0.5', 0);
      });
      card.addEventListener('dragend', () => {
        card.style.opacity = '1';
      });

      if (status === 'completed') {
        colCompleted.appendChild(card);
        cntC++;
      } else if (status === 'assigned' || isAssigned) {
        colAssigned.appendChild(card);
        cntA++;
      } else {
        colPending.appendChild(card);
        cntP++;
      }
    });

    $(`b${blockNum}-c-pending`).textContent = cntP;
    $(`b${blockNum}-c-assigned`).textContent = cntA;
    $(`b${blockNum}-c-completed`).textContent = cntC;
  }

  /* ─────────────────────────────────────────
     MODAL: TASK
  ───────────────────────────────────────── */
  function openModal(task) {
    currentTaskId = task.id;
    const a = projectState[task.id] || {};

    modalTitle.textContent = task.title;
    modalDiff.textContent = task.difficulty;
    modalDiff.className = `badge badge-${task.difficulty === 'Fácil' ? 'easy' : task.difficulty === 'Media' ? 'medium' : 'hard'}`;
    modalBlock.textContent = `Bloque ${task.block}`;
    modalTaskId.textContent = `#${String(task.id).padStart(2,'0')}`;
    
    // Render instructions properly (HTML from data.js)
    modalDesc.innerHTML = task.description;

    // Check dependencies (simple check if previous task is completed)
    if (task.id > 1) {
      const prevA = projectState[task.id - 1] || {};
      if (prevA.status !== 'completed') {
        depWarning.innerHTML = `⚠ <b>Dependencia sugerida:</b> Es posible que necesites completar la Tarea #${task.id - 1} antes.`;
        depWarning.style.display = 'block';
      } else {
        depWarning.style.display = 'none';
      }
    } else {
      depWarning.style.display = 'none';
    }

    assigneeEl.value = a.assignee || 'unassigned';
    deadlineEl.value = a.deadline || '';
    statusEl.value   = a.status   || 'pending';

    updateDeadlineInfo();
    updateAssigneePreview();
    renderChecklist(currentTaskId);
    renderComments(currentTaskId);

    taskModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Animate in the modal description items
    modalDesc.querySelectorAll('li, h3, p').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-8px)';
      el.style.transition = `opacity 0.3s ${i*0.03}s, transform 0.3s ${i*0.03}s`;
      requestAnimationFrame(() => { el.style.opacity = '1'; el.style.transform = 'none'; });
    });
  }

  function closeModal() {
    taskModal.classList.remove('active');
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

  function renderChecklist(taskId) {
    const listEl = $('checklist-items');
    listEl.innerHTML = '';
    const a = projectState[taskId] || {};
    const subtasks = a.subtasks || [];
    
    subtasks.forEach((st, idx) => {
      const item = document.createElement('div');
      item.className = `checklist-item ${st.done ? 'done' : ''}`;
      item.innerHTML = `
        <input type="checkbox" ${st.done ? 'checked' : ''}>
        <span>${st.text}</span>
      `;
      item.querySelector('input').addEventListener('change', (e) => {
        a.subtasks[idx].done = e.target.checked;
        saveTaskToFirebase(taskId, a);
        renderChecklist(taskId);
      });
      listEl.appendChild(item);
    });
  }

  function renderComments(taskId) {
    const listEl = $('comments-list');
    listEl.innerHTML = '';
    const a = projectState[taskId] || {};
    const comments = a.comments || [];
    
    comments.forEach(c => {
      const item = document.createElement('div');
      item.className = 'comment-item';
      const d = new Date(c.time).toLocaleString('es-ES', { dateStyle:'short', timeStyle:'short' });
      item.innerHTML = `
        <div class="comment-meta">
          <span class="comment-author">${c.author}</span>
          <span>${d}</span>
        </div>
        <div>${c.text}</div>
      `;
      listEl.appendChild(item);
    });
    listEl.scrollTop = listEl.scrollHeight;
  }

  function saveTask() {
    if (!currentTaskId) return;
    const prev = projectState[currentTaskId] || {};
    const assignee = assigneeEl.value;
    const deadline = deadlineEl.value;
    const status   = statusEl.value;

    let tasks = window.projectTasks || [];
    const task = tasks.find(t => t.id === currentTaskId);

    // Block size validation
    if (assignee !== 'unassigned' && assignee !== prev.assignee) {
      const stats = computeUserStats(assignee);
      const blockCount = task.block === 1 ? stats.b1 : stats.b2;
      if (blockCount >= MAX_PER_BLOCK) {
        showToast(`⚠ ${assignee} ya tiene ${MAX_PER_BLOCK} tareas en el Bloque ${task.block}.`);
        return;
      }
    }

    const newData = { assignee, deadline, status };
    
    // Save state
    saveTaskToFirebase(currentTaskId, newData);
    
    closeModal();

    const labels = { pending: 'Pendiente', assigned: 'Asignada', completed: 'Completada' };
    showToast(`✓ Tarea guardada · ${assignee !== 'unassigned' ? assignee : 'Sin asignar'}`);

    // Telegram Notify
    if (assignee !== 'unassigned') {
      const dateStr = deadline ? new Date(deadline).toLocaleDateString('es-ES') : 'Sin fecha';
      let actionStr = prev.assignee === assignee ? 'actualizó' : 'se asignó';
      let statusIcon = status === 'completed' ? '✅' : status === 'assigned' ? '🚧' : '📌';
      let msg = `<b>${currentProject.name}</b>\n${statusIcon} <b>${assignee}</b> ${actionStr} la Tarea #${currentTaskId}: <i>${task.title}</i>\nEstado: ${labels[status]} | Plazo: ${dateStr}`;
      notifyTelegram(msg);
      logActivity(`<b>${assignee}</b> ${actionStr} la Tarea #${currentTaskId} (${labels[status]})`, statusIcon);
    }
  }

  /* ─────────────────────────────────────────
     MODAL: BULK DEADLINE
  ───────────────────────────────────────── */
  function openBulkModal() {
    bulkModal.classList.add('active');
  }
  function closeBulkModal() {
    bulkModal.classList.remove('active');
  }
  function applyBulkDeadline() {
    const block = $('bulk-block-select').value;
    const dateStr = $('bulk-deadline-input').value;
    const overwrite = $('bulk-overwrite').checked;
    
    if (!dateStr) {
      showToast("⚠ Debes seleccionar una fecha.");
      return;
    }

    let tasks = window.projectTasks || [];
    let count = 0;

    tasks.forEach(t => {
      if (block === 'all' || String(t.block) === block) {
        let a = projectState[t.id] || {};
        if (!a.deadline || overwrite) {
          a.deadline = dateStr;
          if (!a.status) a.status = 'pending';
          if (!a.assignee) a.assignee = 'unassigned';
          saveTaskToFirebase(t.id, a);
          count++;
        }
      }
    });

    closeBulkModal();
    showToast(`✓ Plazo aplicado a ${count} tareas.`);
    
    if (count > 0) {
      const blockName = block === 'all' ? 'Todos los bloques' : `Bloque ${block}`;
      const dStr = new Date(dateStr).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });
      notifyTelegram(`<b>${currentProject.name}</b>\n📅 <b>Plazo masivo</b>\n${blockName}: Se fijó el plazo ${dStr} a ${count} tareas.`);
    }
  }

  /* ─────────────────────────────────────────
     MODAL: SETTINGS
  ───────────────────────────────────────── */
  function openSettingsModal() {
    const pwd = prompt("🔒 Área reservada. Introduce la contraseña para acceder a la configuración:");
    if (pwd !== "69696969") {
      showToast("⚠ Contraseña incorrecta.");
      return;
    }

    const fb = appState.settings.firebase || {};
    const tg = appState.settings.telegram || {};
    
    $('fb-api-key').value = fb.apiKey || '';
    $('fb-auth-domain').value = fb.authDomain || '';
    $('fb-db-url').value = fb.databaseURL || '';
    $('fb-project-id').value = fb.projectId || '';
    
    $('tg-bot-token').value = tg.botToken || '';
    $('tg-chat-id').value = tg.chatId || '';
    
    // Render static telegram members list for reference
    const tgList = $('tg-members-list');
    tgList.innerHTML = `
      <div>Josias: @Josias_nin</div>
      <div>Ruben: @RubenCampal</div>
      <div>Oscar: (falta)</div>
      <div>Bamba: (falta)</div>
    `;

    settingsModal.classList.add('active');
  }

  function closeSettingsModal() {
    settingsModal.classList.remove('active');
  }

  function saveSettings() {
    appState.settings.firebase = {
      apiKey: $('fb-api-key').value.trim(),
      authDomain: $('fb-auth-domain').value.trim(),
      databaseURL: $('fb-db-url').value.trim(),
      projectId: $('fb-project-id').value.trim()
    };
    appState.settings.telegram = {
      botToken: $('tg-bot-token').value.trim(),
      chatId: $('tg-chat-id').value.trim()
    };
    saveAppState();
    closeSettingsModal();
    showToast("✓ Ajustes guardados. Recargando...");
    setTimeout(() => window.location.reload(), 1000); // Reload to re-init firebase
  }

  async function testTelegram() {
    const tg = {
      botToken: $('tg-bot-token').value.trim(),
      chatId: $('tg-chat-id').value.trim()
    };
    if (!tg.botToken || !tg.chatId) {
      showToast("⚠ Faltan datos de Telegram");
      return;
    }
    
    // Auto-guardar para evitar que el usuario se olvide de darle a "Guardar ajustes"
    appState.settings.telegram = tg;
    saveAppState();

    const btn = $('test-telegram-btn');
    btn.textContent = "Enviando...";
    const url = `https://api.telegram.org/bot${tg.botToken}/sendMessage`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: tg.chatId, text: "👋 ¡Hola desde SmartTime Project Board!" })
      });
      if (res.ok) {
        showToast("✓ Mensaje enviado. Ajustes de Telegram guardados automáticamente.");
      } else {
        const errText = await res.text();
        console.error('Telegram HTTP Error:', errText);
        showToast("❌ Error al enviar. Verifica el Chat ID.");
      }
    } catch {
      showToast("❌ Error de red");
    }
    btn.textContent = "🧪 Probar Telegram";
  }

  /* ─────────────────────────────────────────
     MODAL: README
  ───────────────────────────────────────── */
  function openReadmeModal() {
    // In a real app we'd fetch the actual README.md file and parse it.
    // Here we'll simulate the rendering with basic HTML
    const content = `
      <h3>¿Qué es esto?</h3>
      <p>Tablero web colaborativo para gestionar el desarrollo. Permite asignar tareas, configurar plazos y ver el progreso del equipo.</p>
      
      <h3>Guía rápida para Principiantes</h3>
      <ul>
        <li><b>Leer la tarea:</b> Cada tarea ahora tiene instrucciones paso a paso detalladas.</li>
        <li><b>Asignación:</b> Solo coge las tareas que puedas hacer. Máximo 5 por bloque.</li>
        <li><b>Telegram:</b> Cada vez que guardes o actualices una tarea, se enviará un aviso al grupo (si está configurado).</li>
      </ul>

      <h3>Tecnologías (Frontend Board)</h3>
      <p>HTML5, CSS3, Vanilla JS. Sin frameworks. Sincronización mediante Firebase Realtime Database opcional.</p>
    `;
    $('readme-body').innerHTML = content;
    readmeModal.classList.add('active');
  }

  function closeReadmeModal() {
    readmeModal.classList.remove('active');
  }

  /* ─────────────────────────────────────────
     MODAL: NEW PROJECT
  ───────────────────────────────────────── */
  function openNewProjectModal() {
    // init color/emoji pickers
    const cPicker = $('np-color-picker');
    const ePicker = $('np-emoji-picker');
    cPicker.innerHTML = '';
    ePicker.innerHTML = '';
    
    let selectedColor = window.PROJECT_COLORS[0];
    let selectedEmoji = window.PROJECT_EMOJIS[0];
    
    window.PROJECT_COLORS.forEach(c => {
      const btn = document.createElement('button');
      btn.className = `color-btn ${c===selectedColor?'active':''}`;
      btn.style.background = c;
      btn.onclick = () => {
        cPicker.querySelectorAll('.color-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        selectedColor = c;
      };
      cPicker.appendChild(btn);
    });
    
    window.PROJECT_EMOJIS.forEach(e => {
      const btn = document.createElement('button');
      btn.className = `emoji-btn ${e===selectedEmoji?'active':''}`;
      btn.textContent = e;
      btn.onclick = () => {
        ePicker.querySelectorAll('.emoji-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        selectedEmoji = e;
      };
      ePicker.appendChild(btn);
    });

    $('create-project-btn').onclick = () => {
      const name = $('np-name').value.trim();
      if (!name) { showToast("⚠ El nombre es obligatorio"); return; }
      
      const newProj = {
        id: window.generateProjectId(name),
        name: name,
        description: $('np-description').value.trim(),
        stack: $('np-stack').value.trim(),
        color: selectedColor,
        emoji: selectedEmoji,
        blocks: [
          { id: 1, name: 'Fase 1' },
          { id: 2, name: 'Fase 2' }
        ]
      };
      
      appState.projects.push(newProj);
      saveAppState();
      closeNewProjectModal();
      
      switchProject(newProj.id);
      renderProjectList();
      showToast(`✓ Proyecto ${name} creado`);
    };

    newProjModal.classList.add('active');
  }

  function closeNewProjectModal() {
    newProjModal.classList.remove('active');
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
     EVENT LISTENERS SETUP
  ───────────────────────────────────────── */
  function setupEventListeners() {
    // Tabs
    document.querySelectorAll('.block-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.block-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeBlock = btn.dataset.target;
        document.querySelectorAll('.task-grid').forEach(g => g.classList.remove('active'));
        document.getElementById(activeBlock).classList.add('active');
        renderTasks();
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

    // Modals Close
    $('close-modal').addEventListener('click', closeModal);
    $('close-modal-2').addEventListener('click', closeModal);
    $('close-bulk-modal').addEventListener('click', closeBulkModal);
    $('close-bulk-modal-2').addEventListener('click', closeBulkModal);
    $('close-settings-modal').addEventListener('click', closeSettingsModal);
    $('close-settings-modal-2').addEventListener('click', closeSettingsModal);
    $('close-readme-modal').addEventListener('click', closeReadmeModal);
    $('close-new-project-modal').addEventListener('click', closeNewProjectModal);
    $('close-new-project-modal-2').addEventListener('click', closeNewProjectModal);
    $('close-activity-modal').addEventListener('click', () => $('activity-modal').classList.remove('active'));
    $('close-activity-modal-2').addEventListener('click', () => $('activity-modal').classList.remove('active'));

    // Save Buttons
    saveBtn.addEventListener('click', saveTask);
    $('apply-bulk-deadline-btn').addEventListener('click', applyBulkDeadline);
    $('save-settings-btn').addEventListener('click', saveSettings);
    $('test-telegram-btn').addEventListener('click', testTelegram);

    // Opening Modals
    $('bulk-deadline-btn').addEventListener('click', openBulkModal);
    $('settings-btn').addEventListener('click', openSettingsModal);
    $('readme-btn').addEventListener('click', openReadmeModal);
    $('activity-btn').addEventListener('click', () => $('activity-modal').classList.add('active'));
    $('new-project-btn').addEventListener('click', () => {
      psMenu.classList.remove('active');
      openNewProjectModal();
    });
    $('sync-banner-btn').addEventListener('click', openSettingsModal);

    // Live preview
    deadlineEl.addEventListener('change', updateDeadlineInfo);
    assigneeEl.addEventListener('change', updateAssigneePreview);

    // Checklist & Comments Add buttons
    $('add-subtask-btn').addEventListener('click', () => {
      if (!currentTaskId) return;
      const input = $('new-subtask-input');
      const text = input.value.trim();
      if (!text) return;
      
      let a = projectState[currentTaskId] || {};
      if (!a.subtasks) a.subtasks = [];
      a.subtasks.push({ text, done: false });
      saveTaskToFirebase(currentTaskId, a);
      input.value = '';
      renderChecklist(currentTaskId);
    });

    $('add-comment-btn').addEventListener('click', () => {
      if (!currentTaskId) return;
      const input = $('new-comment-input');
      const text = input.value.trim();
      if (!text) return;
      
      let a = projectState[currentTaskId] || {};
      if (!a.comments) a.comments = [];
      
      const author = assigneeEl.value !== 'unassigned' ? assigneeEl.value : 'Equipo';
      a.comments.push({ text, author, time: Date.now() });
      saveTaskToFirebase(currentTaskId, a);
      input.value = '';
      renderComments(currentTaskId);
      
      // Telegram Notify
      const task = window.projectTasks.find(t => t.id === currentTaskId);
      let msg = `<b>${currentProject.name}</b>\n💬 <b>${author}</b> comentó en la Tarea #${currentTaskId}:\n<i>"${text}"</i>`;
      notifyTelegram(msg);
    });

    // Sidebar toggle
    const sidebarToggle = $('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    sidebarToggle.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        sidebar.classList.toggle('mobile-open');
      } else {
        document.querySelector('.app-wrapper').classList.toggle('sidebar-collapsed');
      }
    });

    // Project Dropdown
    psMenu.addEventListener('click', e => e.stopPropagation());
    
    const darkModeBtn = $('dark-mode-btn');
    if (darkModeBtn) {
      darkModeBtn.addEventListener('click', () => {
        appState.settings.theme = appState.settings.theme === 'light' ? 'dark' : 'light';
        applyTheme();
        saveAppState();
      });
    }
    
    psBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      psMenu.classList.toggle('active');
    });

    // Close dropdowns/modals on outside click
    document.addEventListener('click', (e) => {
      if (!psBtn.contains(e.target) && !psMenu.contains(e.target)) {
        psMenu.classList.remove('active');
      }
      if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Keyboard ESC
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
        document.body.style.overflow = '';
      }
    });

    // Drag and Drop
    document.querySelectorAll('.kanban-col-body').forEach(col => {
      col.addEventListener('dragover', e => {
        e.preventDefault();
        col.classList.add('drag-over');
      });
      col.addEventListener('dragleave', e => {
        col.classList.remove('drag-over');
      });
      col.addEventListener('drop', e => {
        e.preventDefault();
        col.classList.remove('drag-over');
        const taskIdStr = e.dataTransfer.getData('text/plain');
        if (!taskIdStr) return;
        const taskId = parseInt(taskIdStr);
        const newStatus = col.parentElement.dataset.status;
        
        let a = projectState[taskId] || {};
        if (a.status !== newStatus) {
          const oldStatus = a.status || 'pending';
          a.status = newStatus;
          saveTaskToFirebase(taskId, a);
          
          if (a.assignee && a.assignee !== 'unassigned') {
            let tasks = window.projectTasks || [];
            const task = tasks.find(t => t.id === taskId);
            if (task) {
              const labels = { pending: 'Pendiente', assigned: 'Asignada', completed: 'Completada' };
              let statusIcon = newStatus === 'completed' ? '✅' : newStatus === 'assigned' ? '🚧' : '📌';
              let msg = `<b>${currentProject.name}</b>\n${statusIcon} <b>${a.assignee}</b> movió la Tarea #${taskId} a <b>${labels[newStatus]}</b>\n<i>${task.title}</i>`;
              notifyTelegram(msg);
              logActivity(`<b>${a.assignee}</b> movió la Tarea #${taskId} a ${labels[newStatus]}`, statusIcon);
            }
          }
        }
      });
    });
  }

  /* ─────────────────────────────────────────
     THEME
  ───────────────────────────────────────── */
  function applyTheme() {
    const theme = appState.settings.theme || 'dark';
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    const btn = $('dark-mode-btn');
    if (btn) btn.textContent = theme === 'light' ? '☀️' : '🌙';
  }

  /* ─────────────────────────────────────────
     BOOT
  ───────────────────────────────────────── */
  function boot() {
    setupEventListeners();
    
    // Ensure we have projects
    if (!appState.projects.length) {
      appState.projects = window.DEFAULT_PROJECTS;
      appState.currentProjectId = 'smarttimemanager';
      saveAppState();
    }
    
    // Find current or fallback
    let currentId = appState.currentProjectId;
    if (!appState.projects.find(p => p.id === currentId)) {
      currentId = appState.projects[0].id;
    }
    
    switchProject(currentId);
    renderProjectList();
    applyTheme();
    
    // Initialize Firebase
    initFirebase();
  }

  // Run on load
  boot();

})();
