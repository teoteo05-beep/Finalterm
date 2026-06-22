/**
 * @author Thành viên 4 (UI/UX & Layout)
 * @description Các hàm render giao diện, vẽ cột ngày, vẽ sidebar
 */
/* ============================================================
   UI PRESENTATION LAYER RENDER METHODS
    ============================================================ */
    function renderAll() {
      renderWeekLabel();
      renderSidebar();
      renderProgress();
      renderGrid();
      if (typeof dayViewDate !== 'undefined' && dayViewDate && !$('dayViewPage').classList.contains('hidden')) {
        renderDayView();
      }
    }

    function renderWeekLabel() {
      const base = new Date();
      base.setDate(base.getDate() + weekOffset * 7);
      $('weekLabel').textContent = formatWeekRange(getMonday(base));

      // Mục 14: Nhãn tương đối
      let relLabel = 'This week';
      if (weekOffset === -1) relLabel = '1w earlier';
      else if (weekOffset === -2) relLabel = '2w earlier';
      else if (weekOffset < -2) relLabel = `${Math.abs(weekOffset)}w earlier`;
      else if (weekOffset === 1) relLabel = 'Next week';
      else if (weekOffset === 2) relLabel = '+2w';
      else if (weekOffset >= 3) relLabel = `+${weekOffset}w`;
      $('weekRelative').textContent = relLabel;
    }

    function renderSidebar() {
      const base = new Date();
      base.setDate(base.getDate() + weekOffset * 7);
      const monStr = toDateStr(getMonday(base));
      const sun = getMonday(base); sun.setDate(sun.getDate() + 6);
      const sunStr = toDateStr(sun);

      // Week root tasks, excluding subtasks
      const weekRootTasks = tasks.filter(t => t.date >= monStr && t.date <= sunStr && !t.parent_id);
      const personalWeekTasks = weekRootTasks;

      $('cntAll').textContent = personalWeekTasks.length;
      $('cntPending').textContent = personalWeekTasks.filter(t => !t.done).length;
      $('cntDone').textContent = personalWeekTasks.filter(t => t.done).length;

      // Personal projects
      const listContainer = $('listItems');
      listContainer.innerHTML = '';
      lists.forEach(l => {
        const count = personalWeekTasks.filter(t => t.subject_id === l.id).length;
        const btn = document.createElement('button');
        btn.className = `list-item ${listFilter === l.id ? 'active' : ''}`;
        btn.onclick = () => { listFilter = (listFilter === l.id) ? null : l.id; renderAll(); };
        btn.innerHTML = `
          <span class="list-dot" style="background:${l.color}"></span>
          <span class="list-name">${escapeHtml(l.name)}</span>
          <span class="list-count">${count}</span>
          <span class="list-item-actions">
            <button class="list-item-act edit-list-btn" title="Edit">✎</button>
            <button class="list-item-act del del-list-btn" title="Delete">✕</button>
          </span>
        `;
        btn.querySelector('.edit-list-btn').addEventListener('click', e => { e.stopPropagation(); editList(l.id); });
        btn.querySelector('.del-list-btn').addEventListener('click', e => {
          e.stopPropagation();
          const extraHtml = `
            <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer; color: var(--ink-soft); padding: 4px 0; user-select: none;">
              <input type="checkbox" id="deleteProjectTasksCheck" style="width: 14px; height: 14px; accent-color: var(--accent);" checked>
              <span>Delete all tasks inside this project</span>
            </label>
          `;
          confirmAction(`Delete project "${l.name}"?`, async () => {
            const deleteTasks = $('deleteProjectTasksCheck') && $('deleteProjectTasksCheck').checked;
            if (deleteTasks) {
              const { error: taskErr } = await db.from('tasks').delete().eq('subject_id', l.id);
              if (taskErr) return toast('Error deleting project tasks.', 'err');
            } else {
              const { error: taskErr } = await db.from('tasks').update({ subject_id: null }).eq('subject_id', l.id);
              if (taskErr) return toast('Error unassigning project tasks.', 'err');
            }
            const { error } = await db.from('subjects').delete().eq('id', l.id);
            if (error) return toast('Error deleting project.', 'err');
            toast('Project deleted.', 'ok');
            if (listFilter === l.id) listFilter = null;
            loadAll();
          }, extraHtml);
        });
        listContainer.appendChild(btn);
      });


    }

    function renderProgress() {
      // 1. Get HTML elements needed for updating progress display
      const progressFill = document.getElementById('progressFill');
      const progressPct = document.getElementById('progressPct');

      if (!progressFill || !progressPct) return; // If UI not ready yet, stop

      // 2. Determine current week range based on weekOffset
      const base = new Date();
      base.setDate(base.getDate() + (typeof weekOffset !== 'undefined' ? weekOffset : 0) * 7);

      // Helper to get Monday of the week safely
      const getMonday = (d) => {
        const date = new Date(d);
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
      };

      const mon = getMonday(base);
      const sun = new Date(mon);
      sun.setDate(mon.getDate() + 6);

      // Format date to YYYY-MM-DD to match task data
      const toDateStr = (d) => d.toISOString().split('T')[0];
      const monStr = toDateStr(mon);
      const sunStr = toDateStr(sun);

      // 3. Filter all root task entries that belong to the current week
      // Note: change the tasks variable below if your task array uses a different name (e.g. state.tasks)
      const currentWeekTasks = (typeof tasks !== 'undefined' ? tasks : []).filter(t => {
        return t.date >= monStr && t.date <= sunStr && !t.parent_id;
      });

      const total = currentWeekTasks.length;
      const doneCount = currentWeekTasks.filter(t => t.done).length;

      // 4. Calculate completion percentage
      const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;

      // 5. Update UI with exact "X/Y • P%" formatting
      progressFill.style.width = `${pct}%`;
      progressPct.textContent = `${doneCount}/${total} • ${pct}%`;
    }

    function renderGrid() {
      if (lists.length === 0) {
        $('onboardingCard').classList.remove('hidden');
        $('daysGrid').classList.add('hidden');
        $('searchCount').textContent = '';
        return;
      }
      $('onboardingCard').classList.add('hidden');
      if ($('dayViewPage').classList.contains('hidden')) {
        $('daysGrid').classList.remove('hidden');
      }

      const base = new Date();
      base.setDate(base.getDate() + weekOffset * 7);
      const monday = getMonday(base);

      const grid = $('daysGrid');
      grid.innerHTML = '';

      for (let i = 0; i < 7; i++) {
        const day = new Date(monday);
        day.setDate(monday.getDate() + i);
        const ds = toDateStr(day);
        const isToday = ds === todayStr();

        const dayTasks = tasks.filter(t => {
          if (t.date !== ds) return false;

          if (listFilter && t.subject_id !== listFilter) return false;
          if (filterMode === 'pending') return !t.done;
          if (filterMode === 'done') return t.done;
          return true;
        });
        const showAddButton = true;

        const col = document.createElement('div');
        col.className = `day-col ${isToday ? 'today' : ''}`;

        const DAY_NAMES_VN = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        col.innerHTML = `
          <div class="day-col-head" style="cursor:pointer;" data-date="${ds}" data-day-idx="${i}">
            <span class="day-name">${DAY_SHORTS[i]}</span>
            <span class="day-num">${day.getDate()}</span>
          </div>
          <div class="day-col-body" data-date="${ds}"></div>
          <div class="day-col-foot ${showAddButton ? '' : 'hidden'}">
            <button class="add-task-btn" onclick="openNewTask('${ds}')">＋ Add task</button>
          </div>
        `;

        // Mục 18: Click day header to open detail
        col.querySelector('.day-col-head').addEventListener('click', () => {
          openDayDetail(ds, `${DAY_NAMES_VN[i]} — ${day.getDate()} ${MONTH_NAMES[day.getMonth()]}, ${day.getFullYear()}`);
        });

        const body = col.querySelector('.day-col-body');
        const taskMap = new Map();
        const childrenMap = new Map();
        dayTasks.forEach(t => {
          taskMap.set(t.id, t);
          if (t.parent_id) {
            const arr = childrenMap.get(t.parent_id) || [];
            arr.push(t);
            childrenMap.set(t.parent_id, arr);
          }
        });

        const rootTasks = dayTasks.filter(t => !t.parent_id);

        const renderTask = (t, level = 0) => {
          const card = document.createElement('div');
          card.className = `task-card ${t.done ? 'done' : ''}`;
          card.style.marginLeft = `${level * 16}px`;
          card.onclick = () => openEditTask(t.id);

          let tagHtml = '';
          if (t.subject_id) {
            const l = lists.find(x => x.id === t.subject_id);
            if (l) tagHtml = `<div class="task-tag-clean">${escapeHtml(l.name)}</div>`;
          }

          let priorityBadge = '';
          if (t.priority === 'urgent') priorityBadge = '<span class="priority-badge urgent">🔴 Urgent</span>';
          else if (t.priority === 'high') priorityBadge = '<span class="priority-badge high">🟡 High</span>';

          // Mục 5: Repeat badge
          let repeatBadge = '';
          if (t.repeat_mode && t.repeat_mode !== 'none') {
            const repeatLabels = { daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly' };
            repeatBadge = `<span class="repeat-badge">🔁 ${repeatLabels[t.repeat_mode] || t.repeat_mode}</span>`;
          }

          const timeHtml = t.due_time ? `<span class="task-time-badge"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -1px; margin-right: 2px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>${t.due_time.substring(0, 5)}</span>` : '';
          const assignHtml = t.assigned_to ? `<span class="task-assignee" title="Assigned">👤 User</span>` : '';
          const notesIndicator = t.notes ? `<span class="task-notes-indicator" title="${escapeHtml(t.notes)}">📝</span>` : '';



          const children = childrenMap.get(t.id) || [];
          const isCollapsed = collapsedTaskIds.has(t.id);
          const collapseButton = children.length > 0 ? `<button class="chip-act collapse-btn" title="${isCollapsed ? 'Expand' : 'Collapse'}">${isCollapsed ? '▶' : '▼'}</button>` : '';

          card.innerHTML = `
            <div class="task-top" style="align-items: flex-start; gap: 8px;">
              <div class="task-check" style="margin-top: 4px;"></div>
              <div class="task-texts" style="display: flex; flex-direction: column; flex-grow: 1; min-width: 0;">
                ${tagHtml}
                <div class="task-title">${escapeHtml(t.title)}</div>
              </div>
            </div>
          `;

          card.querySelector('.task-check').addEventListener('click', e => {
            e.stopPropagation();
            toggleTaskStatus(t.id);
          });

          body.appendChild(card);
        };

        rootTasks.sort((a, b) => (a.due_time || '').localeCompare(b.due_time || '')).forEach(t => renderTask(t));
        grid.appendChild(col);
      }

      // Search count removed as it's now global in the dropdown
    }
    function getTaskDescendants(taskId) {
      const childMap = new Map();
      tasks.forEach(t => {
        if (t.parent_id) {
          const list = childMap.get(t.parent_id) || [];
          list.push(t);
          childMap.set(t.parent_id, list);
        }
      });

      const collected = [];
      const walk = id => {
        const children = childMap.get(id) || [];
        children.forEach(child => {
          collected.push(child.id);
          walk(child.id);
        });
      };
      walk(taskId);
      return collected;
    }

    function populateParentDropdown(selectedParentId = null, selectedSpace = null, dateStr = '') {
      const select = $('taskParentSelect');
      select.innerHTML = '';
      const optNone = document.createElement('option');
      optNone.value = '';
      optNone.textContent = '-- No parent task / top-level task --';
      select.appendChild(optNone);

      const spaceId = selectedSpace || $('taskSubjSelect').value;
      const targetDate = dateStr || targetTaskDate || todayStr();

      if (!spaceId) return;
      const excludedIds = editTaskId ? [editTaskId, ...getTaskDescendants(editTaskId)] : [];

      const filteredTasks = tasks.filter(t => {
        if (t.date !== targetDate) return false;
        if (excludedIds.includes(t.id)) return false;
        return t.subject_id === spaceId;
      });

      const tree = new Map();
      filteredTasks.forEach(t => {
        const parent = t.parent_id || null;
        const list = tree.get(parent) || [];
        list.push(t);
        tree.set(parent, list);
      });

      const renderOptions = (parentId, level = 0) => {
        const branch = tree.get(parentId) || [];
        branch.sort((a, b) => (a.due_time || '').localeCompare(b.due_time || '') || a.title.localeCompare(b.title));
        branch.forEach(t => {
          const opt = document.createElement('option');
          opt.value = t.id;
          opt.textContent = `${' '.repeat(level * 2)}${level ? '↳ ' : '- '}${t.title}`;
          if (t.id === selectedParentId) opt.selected = true;
          select.appendChild(opt);
          renderOptions(t.id, level + 1);
        });
      };

      renderOptions(null, 0);
    }

    $('taskSubjSelect').onchange = () => {
      const val = $('taskSubjSelect').value;
      if (val.startsWith('group:')) {
        const gid = val.split(':')[1];
        $('assigneeGroup').classList.remove('hidden');
        populateAssigneeDropdown(gid);
      } else {
        $('assigneeGroup').classList.add('hidden');
      }
    };



    function populateSpaceDropdown(selectedId = null) {
      const select = $('taskSubjSelect');
      select.innerHTML = '';

      if (lists.length === 0) {
        const optEmpty = document.createElement('option');
        optEmpty.value = '';
        optEmpty.textContent = '-- Create a project first --';
        optEmpty.disabled = true;
        select.appendChild(optEmpty);
        select.disabled = true;
        return;
      }

      lists.forEach(l => {
        const opt = document.createElement('option');
        opt.value = l.id;
        opt.textContent = `📁 ${l.name}`;
        if (l.id === selectedId) opt.selected = true;
        select.appendChild(opt);
      });

      select.disabled = false;
      if (!select.value && select.options.length > 0) {
        select.selectedIndex = 0;
      }
    }

    window.openNewTask = function (dateStr) {
      if (lists.length === 0) {
        toast('Create a project first before adding tasks.', 'info');
        $('addListBtn').click();
        return;
      }

      editTaskId = null;
      targetTaskDate = dateStr;
      $('taskModalTitle').textContent = 'New Task';
      $('taskTitleInput').value = '';
      $('taskTimeInput').value = '';
      $('taskPrioritySelect').value = 'normal';
      $('taskRepeatSelect').value = 'none';
      $('pastTimeWarn').classList.remove('show');
      $('taskDeleteBtn').classList.add('hidden');
      $('subtasksList').innerHTML = '';
      $('subtaskInput').value = '';
      pendingSubtasks = [];

      let preselectId = listFilter;
      populateSpaceDropdown(preselectId);
      $('taskSubjSelect').dispatchEvent(new Event('change'));

      showOverlay('taskOverlay');
      $('taskTitleInput').focus();
    };

    window.openNewSubtask = function (parentId) {
      // legacy stub — no longer used
    };

    window.openEditTask = function (id) {
      const t = tasks.find(x => x.id === id);
      if (!t) return;

      // Block editing subtasks directly — open parent instead
      if (t.parent_id) {
        openEditTask(t.parent_id);
        return;
      }

      let canEdit = true;

      editTaskId = id;
      $('taskModalTitle').textContent = 'Edit Task';
      $('taskTitleInput').value = t.title;
      $('taskTitleInput').disabled = !canEdit;
      $('taskTimeInput').value = t.due_time || '';
      $('taskTimeInput').disabled = !canEdit;
      $('taskPrioritySelect').value = t.priority || 'normal';
      $('taskPrioritySelect').disabled = !canEdit;
      $('taskRepeatSelect').value = t.repeat_mode || 'none';
      $('taskRepeatSelect').disabled = !canEdit;
      $('pastTimeWarn').classList.remove('show');

      if (canEdit) $('taskDeleteBtn').classList.remove('hidden');
      else $('taskDeleteBtn').classList.add('hidden');

      populateSpaceDropdown(t.subject_id);
      $('taskSubjSelect').disabled = !canEdit;

      // Load existing subtasks into pendingSubtasks
      pendingSubtasks = tasks
        .filter(x => x.parent_id === t.id)
        .map(x => ({ id: x.id, title: x.title, saved: true, done: x.done }));
      $('subtaskInput').value = '';
      $('subtaskInput').disabled = !canEdit;
      $('addSubtaskInlineBtn').classList.toggle('hidden', !canEdit);
      renderSubtaskList(canEdit);

      showOverlay('taskOverlay');
    };

    // ─── Pending subtasks (in-memory before save) ───
    // (declared at top with other state variables)

    function renderSubtaskList(canEdit = true) {
      const list = $('subtasksList');
      list.innerHTML = '';
      pendingSubtasks.filter(s => !s._delete).forEach((s, i) => {
        const row = document.createElement('div');
        row.style.cssText = 'display:flex; align-items:center; gap:8px; padding:7px 10px; background:var(--bg); border-radius:6px; border:1px solid var(--line);';
        row.innerHTML = `
          <span style="font-size:12px; color:var(--ink-faint); flex-shrink:0;">↳</span>
          <span style="flex:1; font-size:13px; color:var(--ink); ${s.done ? 'text-decoration:line-through;opacity:.6;' : ''}">${escapeHtml(s.title)}</span>
          ${canEdit ? `<button type="button" style="font-size:12px;color:var(--ink-faint);padding:0 4px;background:none;border:none;cursor:pointer;" data-idx="${i}">✕</button>` : ''}
        `;
        if (canEdit) {
          row.querySelector('button').onclick = () => {
            if (s.saved) s._delete = true;
            else pendingSubtasks.splice(i, 1);
            renderSubtaskList(canEdit);
          };
        }
        list.appendChild(row);
      });
    }

    function addSubtaskFromInput() {
      const val = $('subtaskInput').value.trim();
      if (!val) return;
      pendingSubtasks.push({ id: null, title: val, saved: false });
      $('subtaskInput').value = '';
      renderSubtaskList(true);
      $('subtaskInput').focus();
    }

    $('addSubtaskInlineBtn').onclick = addSubtaskFromInput;

    $('subtaskInput').addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); addSubtaskFromInput(); }
    });

    $('taskDeleteBtn').onclick = () => {
      if (editTaskId) quickDeleteTask(editTaskId);
    };

    $('taskSaveBtn').onclick = async () => {
      const title = $('taskTitleInput').value.trim();
      if (!title) return toast('Task description missing.', 'err');

      const spaceVal = $('taskSubjSelect').value;
      if (!spaceVal) return toast('Please select a project or space first.', 'err');

      let subject_id = spaceVal;

      // Ensure task belongs to a project
      if (!subject_id) {
        return toast('Task must be assigned to a project. Please select a project.', 'err');
      }

      const due_time = $('taskTimeInput').value || null;
      const notes = null;
      const priority = $('taskPrioritySelect').value || 'normal';
      const repeat_mode = $('taskRepeatSelect').value || 'none';

      // Mục 15: Chỉ cảnh báo, không chặn lưu
      // (past-time warning is shown dynamically via input listener)

      let parentTaskId = editTaskId;

      if (editTaskId) {
        // UPDATE existing task
        const { error } = await db.from('tasks').update({ title, subject_id, due_time, notes, priority, repeat_mode }).eq('id', editTaskId);
        if (error) return toast('Error updating task.', 'err');
        toast('Task updated.', 'ok');
      } else {
        // INSERT new task
        const { data, error } = await db.from('tasks').insert({
          user_id: user.id, title, date: targetTaskDate, subject_id, due_time, notes, parent_id: null, done: false, priority, repeat_mode
        }).select();
        if (error) {
          console.error('Task insert error:', error);
          return toast('Error creating task: ' + (error.message || 'Unknown error'), 'err');
        }
        parentTaskId = data && data[0] ? data[0].id : null;
        if (!parentTaskId) return toast('Failed to get task ID.', 'err');
        toast('Task created.', 'ok');
      }

      // Handle subtasks
      const toDelete = pendingSubtasks.filter(s => s._delete && s.id);
      const toAdd = pendingSubtasks.filter(s => !s.saved && !s._delete && s.title);

      if (toDelete.length) {
        await db.from('tasks').delete().in('id', toDelete.map(s => s.id));
      }
      for (const s of toAdd) {
        await db.from('tasks').insert({
          user_id: user.id, title: s.title, date: targetTaskDate || tasks.find(x => x.id === parentTaskId)?.date, subject_id, due_time: null, notes: null, parent_id: parentTaskId, done: false
        });
      }

      hideOverlay('taskOverlay');
      loadAll();
    };

    window.toggleTaskStatus = async function (id) {
      if (processingTasks.has(id)) return; // already processing this task
      processingTasks.add(id);
      try {
        const t = tasks.find(x => x.id === id);
        if (!t) return;
        const originalDone = t.done;
        const targetState = !originalDone;

        // Optimistic UI: update local state immediately and re-render
        t.done = targetState;
        renderAll();

        // Persist change to server
        const { error } = await db.from('tasks').update({ done: targetState }).eq('id', id);
        if (error) {
          console.error(error);
          // revert optimistic change on error
          t.done = originalDone;
          toast('Error: ' + (error.message || 'Failed to update task status'), 'err');
          return;
        }

        // If marking done and task repeats, the DB trigger will create the next occurrence.
        // Refresh tasks after a short delay so we pick up the server-created recurring task
        if (targetState === true && t.repeat_mode && t.repeat_mode !== 'none' && t.date) {
          // give the DB trigger a moment to insert the recurring task, then reload
          setTimeout(() => { loadAll(); }, 300);
        }
      } finally {
        processingTasks.delete(id);
        renderAll();
        if (typeof dayViewDate !== 'undefined' && dayViewDate && !$('dayViewPage').classList.contains('hidden')) renderDayView();
      }
    };

    window.quickDeleteTask = function (id) {
      const t = tasks.find(x => x.id === id);
      if (t) deleteTask(t);
    };

    function deleteTask(task) {
      console.log('deleteTask called', task);
      const descendants = getTaskDescendants(task.id);
      const message = descendants.length
        ? `Delete "${task.title}" and its ${descendants.length} subtask(s)?`
        : `Delete "${task.title}"?`;

      confirmAction(message, async () => {
        const idsToDelete = [task.id, ...descendants];
        const { error } = await db.from('tasks').delete().in('id', idsToDelete);
        if (error) {
          console.error('Error deleting task:', error);
          return toast('Error deleting task.', 'err');
        }
        toast('Task removed.', 'ok');
        hideOverlay('taskOverlay');
        loadAll();
      });
    }

/* ============================================================
   WEEK NAVIGATION
    ============================================================ */
    $('weekPrev').onclick = () => { weekOffset--; $('searchInput').value = ''; renderAll(); };
    $('weekNext').onclick = () => { weekOffset++; $('searchInput').value = ''; renderAll(); };
    $('weekTodayBtn').onclick = () => { weekOffset = 0; $('searchInput').value = ''; renderAll(); };
    $('weekNextBtn').onclick = () => { weekOffset = 1; $('searchInput').value = ''; renderAll(); };

    if ($('deleteAllTasksBtn')) {
      $('deleteAllTasksBtn').addEventListener('click', () => {
        $('confirmMessage').textContent = 'Are you sure you want to DELETE ALL your tasks? This action cannot be undone!';
        confirmCb = async () => {
          const { error } = await db.from('tasks').delete().eq('user_id', user.id);
          if (error) {
            console.error('Error deleting all tasks:', error);
            return toast('An error occurred while deleting tasks.', 'err');
          }
          toast('All tasks deleted.', 'ok');
          loadAll();
        };
        showOverlay('confirmOverlay');
      });
    }

    /* ============================================================
       GLOBAL SEARCH LOGIC
    ============================================================ */
    $('searchInput').addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const resContainer = $('searchResults');
      if (!q) {
        resContainer.style.display = 'none';
        return;
      }
      const matches = tasks.filter(t => !t.parent_id && t.title.toLowerCase().includes(q));
      if (matches.length === 0) {
        resContainer.innerHTML = '<div style="padding: 10px; color: var(--ink-faint); font-size: 13px; text-align: center;">No tasks found</div>';
      } else {
        resContainer.innerHTML = '';
        matches.forEach(t => {
          const div = document.createElement('div');
          div.style.padding = '8px 12px';
          div.style.borderBottom = '1px solid var(--line)';
          div.style.cursor = 'pointer';
          div.style.fontSize = '13px';
          div.innerHTML = `<div>${escapeHtml(t.title)}</div><div style="font-size: 11px; color: var(--ink-faint);">${t.date}</div>`;
          div.onmouseover = () => div.style.background = 'var(--line-strong)';
          div.onmouseout = () => div.style.background = 'transparent';
          div.onclick = () => {
            const taskDate = new Date(t.date);
            const today = new Date();
            const taskMonday = getMonday(taskDate);
            const todayMonday = getMonday(today);
            const diffTime = taskMonday.getTime() - todayMonday.getTime();
            const diffWeeks = Math.round(diffTime / (1000 * 60 * 60 * 24 * 7));
            weekOffset = diffWeeks;
            $('searchInput').value = '';
            resContainer.style.display = 'none';
            renderAll();
          };
          resContainer.appendChild(div);
        });
      }
      resContainer.style.display = 'block';
    });
    
    document.addEventListener('click', (e) => {
      if ($('searchInput') && !$('searchInput').contains(e.target) && $('searchResults') && !$('searchResults').contains(e.target)) {
        $('searchResults').style.display = 'none';
      }
    });

    /* ============================================================
       FILTER CHIPS (All / Pending / Done)
    ============================================================ */
    document.querySelectorAll('.filter-item').forEach(btn => {
      btn.addEventListener('click', () => {
        filterMode = btn.dataset.f;
        document.querySelectorAll('.filter-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderGrid();
      });
    });

    /* ============================================================
       ONBOARDING BUTTON
    ============================================================ */
    $('onboardingActionBtn').onclick = () => $('addListBtn').click();

    /* ============================================================
       STATS PANEL — số liệu tổng quan tuần này
    ============================================================ */
    $('statsBtn').onclick = () => {
      const base = new Date(); base.setDate(base.getDate() + weekOffset * 7);
      const mon = getMonday(base);
      const sun = new Date(mon); sun.setDate(mon.getDate() + 6);
      const monStr = toDateStr(mon), sunStr = toDateStr(sun);
      const wt = tasks.filter(t => !t.parent_id && t.date >= monStr && t.date <= sunStr);
      const done = wt.filter(t => t.done).length;
      const pct = wt.length ? Math.round(done / wt.length * 100) : 0;

      // build per-day breakdown
      const DAY_FULL = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      let rows = '';
      for (let i = 0; i < 7; i++) {
        const d = new Date(mon); d.setDate(mon.getDate() + i);
        const ds = toDateStr(d);
        const dt = wt.filter(t => t.date === ds);
        const dc = dt.filter(t => t.done).length;
        rows += `<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid var(--line);font-size:13px;">
          <span style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--ink-soft);">${DAY_FULL[i]} ${d.getDate()}</span>
          <span>${dc}/${dt.length} done</span>
        </div>`;
      }

      // reuse confirmOverlay as a quick info modal
      $('confirmMessage').innerHTML = `
        <div style="text-align:left">
          <div style="font-family:'Fraunces',serif;font-size:18px;font-weight:600;margin-bottom:14px;">📊 Week Stats</div>
          <div style="font-family:'JetBrains Mono',monospace;font-size:22px;font-weight:700;color:var(--accent);margin-bottom:4px;">${pct}%</div>
          <div style="font-size:12px;color:var(--ink-soft);margin-bottom:16px;">${done} of ${wt.length} tasks complete</div>
          ${rows}
        </div>`;
      // hide the Yes button, repurpose No as Close
      $('confirmYes').classList.add('hidden');
      $('confirmNo').textContent = 'Close';
      $('confirmNo').onclick = () => {
        hideOverlay('confirmOverlay');
        resetConfirmButtons();
      };
      showOverlay('confirmOverlay');
    };

    /* ============================================================
       ARCHIVE — show & restore completed tasks
    ============================================================ */
    $('archiveBtn').onclick = () => {
      const doneTasks = tasks.filter(t => t.done);

      if (!doneTasks.length) {
        toast('No completed tasks to archive.', 'info');
        return;
      }

      let cards = '';
      doneTasks.slice(0, 30).forEach(t => {
        // Get the project name
        const project = lists.find(l => l.id === t.subject_id);
        const projectName = project ? project.name : 'Uncategorized';
        
        // Format the date
        const dateObj = t.date ? new Date(t.date + 'T00:00:00') : null;
        const dateStr = dateObj ? `${pad(dateObj.getDate())}/${pad(dateObj.getMonth() + 1)}/${dateObj.getFullYear()}` : 'No date';

        cards += `<div class="archive-card">
          <div class="archive-task-title">${escapeHtml(t.title)}</div>
          <div class="archive-task-meta">
            <div class="archive-meta-row">
              <span class="archive-meta-label">📅 Date</span>
              <span class="archive-meta-value">${dateStr}</span>
            </div>
            <div class="archive-meta-row">
              <span class="archive-meta-label">📂 Project</span>
              <span class="archive-meta-value" title="${escapeHtml(projectName)}">${escapeHtml(projectName)}</span>
            </div>
          </div>
          <button onclick="restoreTask('${t.id}')" class="archive-restore-btn">↻ Restore</button>
        </div>`;
      });
      
      if (doneTasks.length > 30) {
        cards += `<div style="grid-column:1/-1;text-align:center;font-size:13px;color:var(--ink-faint);padding:16px 0;">… and ${doneTasks.length - 30} more completed tasks</div>`;
      }

      $('confirmMessage').innerHTML = `
        <div style="text-align:left;max-width:100%;width:100%;">
          <div style="font-family:'Fraunces',serif;font-size:22px;font-weight:600;margin-bottom:20px;display:flex;align-items:center;gap:10px;">🗂 Completed Tasks <span style="font-size:16px;color:var(--accent);font-family:'JetBrains Mono',monospace;font-weight:700;">${doneTasks.length}</span></div>
          <div class="archive-grid">${cards}</div>
        </div>`;
      $('confirmYes').classList.add('hidden');
      $('confirmNo').textContent = 'Close';
      $('confirmNo').onclick = () => {
        hideOverlay('confirmOverlay');
        resetConfirmButtons();
        $('confirmOverlay').querySelector('.modal').classList.remove('archive-modal');
      };
      const modal = $('confirmOverlay').querySelector('.modal');
      if (modal) modal.classList.add('archive-modal');
      showOverlay('confirmOverlay');
    };

    window.restoreTask = async function (id) {
      const { error } = await db.from('tasks').update({ done: false }).eq('id', id);
      if (error) return toast('Restore failed.', 'err');
      toast('Task restored.', 'ok');
      hideOverlay('confirmOverlay');
      $('confirmYes').classList.remove('hidden');
      $('confirmNo').textContent = 'No';
      $('confirmNo').onclick = () => hideOverlay('confirmOverlay');
      loadAll();
    };
    // 1. Load group list into management panel when Manage is clicked
    window.openManageGroup = function () {
      const listEl = document.getElementById('manageGroupList');
      if (!listEl) return;
      listEl.innerHTML = '';

      // Initialize empty state when opening the management panel
      document.getElementById('editGroupNameInput').value = '';
      document.getElementById('editGroupNameInput').placeholder = 'Select a team above...';
      document.getElementById('editGroupNameInput').dataset.selectedGroupId = '';
      document.getElementById('editGroupCodeInput').value = '';

      if (!groups || groups.length === 0) {
        listEl.innerHTML = `<div style="font-size:12px; color:var(--ink-faint); padding:12px 0; text-align:center;">You are not in any teams.</div>`;
        showOverlay('groupOverlay');
        return;
      }

      // Iterate the groups array to render each entry
      groups.forEach(g => {
        const div = document.createElement('div');
        div.style = 'display:flex; justify-content:space-between; align-items:center; padding:10px; border-radius:6px; border:1px solid var(--line); cursor:pointer; background:var(--paper);';

        div.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${g.color || 'var(--accent)'}"></span>
        <span style="font-weight:500; font-size:13px; color:var(--ink);">${escapeHtml(g.name)}</span>
      </div>
      <span style="font-size:11px; color:var(--accent);">Select ➔</span>
    `;

        // CLICK EVENT: When user clicks this team row
        div.onclick = () => {
          // Change background so the user can see which row is selected
          Array.from(listEl.children).forEach(c => c.style.background = 'var(--paper)');
          div.style.background = 'var(--accent-soft)';

          // Fill this team's data into the edit inputs below
          document.getElementById('editGroupNameInput').value = g.name || '';
          document.getElementById('editGroupCodeInput').value = g.invite_code || g.id || '';

          // Temporarily store the selected group ID in dataset for the later update call
          document.getElementById('editGroupNameInput').dataset.selectedGroupId = g.id;
        };

        listEl.appendChild(div);
      });

      showOverlay('groupOverlay');
    };

    // 2. Handle saving new team name when Save Changes is clicked
    window.saveTeamChanges = async function () {
      const groupId = document.getElementById('editGroupNameInput').dataset.selectedGroupId;
      const newName = document.getElementById('editGroupNameInput').value.trim();

      if (!groupId) return toast('Please select a team from the list first!', 'err');
      if (!newName) return toast('Team name cannot be empty.', 'err');

      // Send update request to Supabase groups table
      const { error } = await db.from('groups').update({ name: newName }).eq('id', groupId);

      if (error) {
        console.error(error);
        return toast('Failed to update team name.', 'err');
      }

      toast('Team name updated successfully!', 'ok');
      hideOverlay('groupOverlay');

      // Reload data to refresh the sidebar after editing
      if (window.loadAllData) window.loadAllData();
    };

    // 3. Handle deleting a team when Delete Team is clicked
    window.deleteSelectedTeam = function () {
      const groupId = document.getElementById('editGroupNameInput').dataset.selectedGroupId;
      if (!groupId) return toast('Please select a team to delete!', 'err');

      confirmAction("Are you sure you want to delete this team? All shared data will be lost.", async () => {
        const { error } = await db.from('groups').delete().eq('id', groupId);
        if (error) return toast('Delete failed.', 'err');

        toast('Team deleted successfully.', 'ok');
        hideOverlay('groupOverlay');
        if (window.loadAllData) window.loadAllData();
      });
    };

/* ============================================================
   MỤC 18: DAY DETAIL SECTION RENDER LOGIC (FULL PAGE)
    ============================================================ */
    let dayViewDate = null;

    window.openDayDetail = function (dateStr, titleStr) {
      dayViewDate = dateStr;
      $('dayViewTitle').textContent = titleStr;

      // Chuyển đổi giao diện sang chế độ chi tiết
      $('daysGrid').classList.add('hidden');
      $('workspaceTitle').classList.add('hidden');
      if ($('appSidebar')) $('appSidebar').classList.add('hidden');
      if ($('appHeader')) $('appHeader').classList.add('hidden');
      if ($('appProgressBar')) $('appProgressBar').classList.add('hidden');
      const wb = $('welcomeBanner'); if (wb) wb.classList.add('hidden');
      $('dayViewPage').classList.remove('hidden');

      renderDayView();
    };

    function closeDayDetail() {
      $('dayViewPage').classList.add('hidden');
      $('daysGrid').classList.remove('hidden');
      $('workspaceTitle').classList.remove('hidden');
      if ($('appSidebar')) $('appSidebar').classList.remove('hidden');
      if ($('appHeader')) $('appHeader').classList.remove('hidden');
      if ($('appProgressBar')) $('appProgressBar').classList.remove('hidden');
      const wb = $('welcomeBanner'); if (wb) wb.classList.remove('hidden');
    }

    if ($('dayViewClose')) $('dayViewClose').addEventListener('click', closeDayDetail);

    if ($('dayViewAddBtn')) {
      $('dayViewAddBtn').addEventListener('click', () => {
        openNewTask(dayViewDate);
      });
    }

    function renderDayView() {
      if (!dayViewDate) return;
      const c = $('dayViewTasks');
      if (!c) return;
      c.innerHTML = '';

      const targetTasks = tasks.filter(t => t.date === dayViewDate && !t.parent_id);
      const total = targetTasks.length;
      const doneCount = targetTasks.filter(t => t.done).length;
      const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;
      if ($('dayViewProgressFill')) $('dayViewProgressFill').style.width = `${pct}%`;
      if ($('dayViewProgressText')) $('dayViewProgressText').textContent = `${doneCount}/${total} • ${pct}%`;
      if (targetTasks.length === 0) {
        c.innerHTML = '<div style="color:var(--ink-faint);text-align:center;padding:24px;">No tasks for this day yet.</div>';
        return;
      }

      targetTasks.sort((a, b) => {
        if (a.done !== b.done) return a.done ? 1 : -1;
        const pa = a.priority === 'urgent' ? 3 : (a.priority === 'high' ? 2 : 1);
        const pb = b.priority === 'urgent' ? 3 : (b.priority === 'high' ? 2 : 1);
        if (pa !== pb) return pb - pa;
        return (a.due_time || '').localeCompare(b.due_time || '');
      }).forEach(t => {
        const card = document.createElement('div');
        const priorityClass = t.priority === 'urgent' ? 'priority-urgent' : (t.priority === 'high' ? 'priority-high' : '');
        card.className = `task-card ${t.done ? 'done' : ''} ${priorityClass}`;
        card.onclick = () => openEditTask(t.id);

        let tagHtml = '';
        if (t.subject_id) {
          const l = lists.find(x => x.id === t.subject_id);
          if (l) tagHtml = `<div class="task-tag-clean">${escapeHtml(l.name)}</div>`;
        }

        let priorityBadge = '';
        if (t.priority === 'urgent') priorityBadge = '<span class="priority-badge urgent">🔴 Urgent</span>';
        else if (t.priority === 'high') priorityBadge = '<span class="priority-badge high">🟡 High</span>';

        // Mục 5: Repeat badge
        let repeatBadge = '';
        if (t.repeat_mode && t.repeat_mode !== 'none') {
          const repeatLabels = { daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly' };
          repeatBadge = `<span class="repeat-badge">🔁 ${repeatLabels[t.repeat_mode] || t.repeat_mode}</span>`;
        }

        const timeHtml = t.due_time ? `<span class="task-time-badge"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -1px; margin-right: 2px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>${t.due_time.substring(0, 5)}</span>` : '';
        const notesIndicator = t.notes ? `<span class="task-notes-indicator" title="${escapeHtml(t.notes)}">📝</span>` : '';

        const children = tasks.filter(x => x.parent_id === t.id);
        const isCollapsed = collapsedTaskIds.has(t.id);
        const collapseButton = children.length > 0 ? `<button class="chip-act collapse-btn" title="${isCollapsed ? 'Expand' : 'Collapse'}">${isCollapsed ? '▶' : '▼'}</button>` : '';

        const hasMetaContent = !!(priorityBadge || repeatBadge || timeHtml || notesIndicator);
        const metaClass = hasMetaContent ? 'task-meta has-meta' : 'task-meta';

        card.innerHTML = `
                <div class="task-top" style="align-items: flex-start; gap: 8px;">
                  <div class="task-check" style="margin-top: 4px;"></div>
                  <div class="task-texts" style="display: flex; flex-direction: column; flex-grow: 1; min-width: 0;">
                    ${tagHtml}
                    <div class="task-title">${escapeHtml(t.title)}</div>
                  </div>
                </div>
                ${hasMetaContent ? `<div class="${metaClass}" style="margin-left:24px; margin-top:4px; opacity: 1;">${priorityBadge} ${repeatBadge} ${timeHtml} ${notesIndicator}</div>` : ''}
                <div class="task-acts">
                  ${collapseButton}
                  <button class="chip-act move-btn" title="Move Day">📅</button>
                  <button class="chip-act del del-btn" title="Delete Task">✕</button>
                </div>
              `;

        card.querySelector('.task-check').addEventListener('click', e => {
          e.stopPropagation();
          toggleTaskStatus(t.id);
          // Cần update lại UI của full page
          renderDayView();
        });

        if (children.length > 0) {
          card.querySelector('.collapse-btn').addEventListener('click', e => {
            e.stopPropagation();
            if (collapsedTaskIds.has(t.id)) collapsedTaskIds.delete(t.id);
            else collapsedTaskIds.add(t.id);
            renderDayView();
          });
        }

        card.querySelector('.move-btn').addEventListener('click', e => {
          e.stopPropagation();
          triggerMoveTaskPopover(t.id, e);
        });

        card.querySelector('.del-btn').addEventListener('click', e => {
          e.stopPropagation();
          quickDeleteTask(t.id);
          renderDayView();
        });

        c.appendChild(card);

        // Render subtasks if expanded
        if (children.length > 0 && !isCollapsed) {
          children.sort((a, b) => (a.due_time || '').localeCompare(b.due_time || '')).forEach(child => {
            const subCard = document.createElement('div');
            const pC = child.priority === 'urgent' ? 'priority-urgent' : (child.priority === 'high' ? 'priority-high' : '');
            subCard.className = `task-card ${child.done ? 'done' : ''} ${pC}`;
            subCard.style.marginLeft = '16px';
            subCard.onclick = () => openEditTask(child.id);

            subCard.innerHTML = `
                    <div class="task-top" style="align-items: flex-start; gap: 8px;">
                      <div class="task-check" style="margin-top: 4px;"></div>
                      <div class="task-texts" style="display: flex; flex-direction: column; flex-grow: 1; min-width: 0;">
                        <div class="task-title">${escapeHtml(child.title)}</div>
                      </div>
                    </div>
                  `;
            subCard.querySelector('.task-check').addEventListener('click', e => {
              e.stopPropagation();
              toggleTaskStatus(child.id);
              renderDayView();
            });
            c.appendChild(subCard);
          });
        }
      });
    }

/* ============================================================
   MỤC 9: ENHANCED NOTIFICATION — ONLY FOR URGENT TASKS
    ============================================================ */
    function startNotificationDaemon() {
      if (window.Notification && Notification.permission === 'default') {
        Notification.requestPermission();
      }

      setInterval(() => {
        const now = new Date();

        tasks.forEach(t => {
          if (t.done || !t.date || !t.due_time) return;
          // Mục 9: Chỉ nhắc nhở cho task Urgent
          if (t.priority !== 'urgent') return;

          const timePart = t.due_time.length === 5 ? t.due_time + ':00' : t.due_time;
          const taskDate = new Date(`${t.date}T${timePart}`);
          if (isNaN(taskDate.getTime())) return;
          
          const diffMs = taskDate.getTime() - now.getTime();
          const diffMinutes = Math.round(diffMs / 60000);

          if (diffMinutes < -2) return; // Đã quá hạn hơn 2 phút

          // Fire reminders at 24h, 12h, 1h, and 0min
          const key24h = t.id + '_24h';
          const key12h = t.id + '_12h';
          const key1h = t.id + '_1h';
          const key0 = t.id + '_0';

          if (diffMinutes <= 24 * 60 && diffMinutes > 12 * 60 && !notifiedTasks.has(key24h)) {
            notifiedTasks.add(key24h);
            triggerVisualNotification(t, '24 hours remaining');
          } else if (diffMinutes <= 12 * 60 && diffMinutes > 60 && !notifiedTasks.has(key12h)) {
            notifiedTasks.add(key12h);
            triggerVisualNotification(t, '12 hours remaining');
          } else if (diffMinutes <= 60 && diffMinutes > 0 && !notifiedTasks.has(key1h)) {
            notifiedTasks.add(key1h);
            triggerVisualNotification(t, '1 hour remaining');
          } else if (diffMinutes <= 0 && diffMinutes >= -2 && !notifiedTasks.has(key0)) {
            notifiedTasks.add(key0);
            triggerVisualNotification(t, 'DUE NOW');
          }
        });
      }, 30000); // Quét mỗi 30 giây
    }

    function triggerVisualNotification(task, timeLabel) {
      const alertMessage = `🔔 URGENT: "${task.title}" — ${timeLabel} (${task.due_time.substring(0, 5)})`;
      toast(alertMessage, 'err', 7000);

      if (window.Notification && Notification.permission === 'granted') {
        new Notification('⚡ Planner — Task Urgent', { body: alertMessage, icon: '📓' });
      }
    }