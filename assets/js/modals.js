/**
 * @author Thành viên 5 (Modals & Forms)
 * @description Quản lý các pop-up thêm sửa xoá, tương tác form
 */
/* ============================================================
   POPOVER QUICK RE-SCHEDULER CONTROLLER
    ============================================================ */
    window.triggerMoveTaskPopover = function (taskId, event) {
      if (event) event.stopPropagation();
      document.querySelectorAll('.move-pop').forEach(p => p.remove());
      if (movingTaskId === taskId) { movingTaskId = null; return; }

      movingTaskId = taskId;
      const base = new Date(); base.setDate(base.getDate() + weekOffset * 7);
      const monday = getMonday(base);

      const pop = document.createElement('div');
      pop.className = 'move-pop';
      pop.innerHTML = `<div class="move-pop-title">Move to:</div><div class="move-pop-grid">${DAY_SHORTS.map((d, i) => `<button class="move-pop-day" data-i="${i}">${d}</button>`).join('')}</div>`;

      pop.querySelectorAll('.move-pop-day').forEach(btn => {
        btn.onclick = async e => {
          e.stopPropagation();
          const idx = parseInt(btn.dataset.i);
          const target = new Date(monday); target.setDate(monday.getDate() + idx);

          pop.remove(); movingTaskId = null;

          const { error } = await db.from('tasks').update({ date: toDateStr(target) }).eq('id', taskId);
          if (error) return toast('Reschedule request failure.', 'err');

          toast(`Task shifted to ${DAY_NAMES[idx]}.`, 'ok');
          loadAll();
        };
      });
      event.currentTarget.parentElement.appendChild(pop);
    };

    document.addEventListener('click', () => {
      if (movingTaskId) { document.querySelectorAll('.move-pop').forEach(p => p.remove()); movingTaskId = null; }
    });

    /* ============================================================
       PERSONAL PROJECT LIST CONFIGURATOR
    ============================================================ */
    $('addListBtn').onclick = () => {
      editingListId = null;
      $('listModalTitle').textContent = 'Create a Project List';
      $('listNameInput').value = '';
      $('listSaveBtn').textContent = 'Create List';
      selColor = LIST_COLORS[0];
      renderSwatches();
      showOverlay('listOverlay');
    };

    function renderSwatches() {
      const container = $('colorSwatches'); container.innerHTML = '';
      LIST_COLORS.forEach(c => {
        const sw = document.createElement('button');
        sw.className = `swatch ${selColor === c ? 'active' : ''}`; sw.style.background = c;
        sw.onclick = () => { selColor = c; renderSwatches(); };
        container.appendChild(sw);
      });
    }

    // Click on a personal project list to edit it
    function editList(listId) {
      const list = lists.find(l => l.id === listId);
      if (!list) return;

      editingListId = listId;
      $('listModalTitle').textContent = 'Edit Project List';
      $('listNameInput').value = list.name || '';
      selColor = list.color || LIST_COLORS[0];
      renderSwatches();
      $('listSaveBtn').textContent = 'Save Changes';
      showOverlay('listOverlay');
    }

    $('listSaveBtn').onclick = async () => {
      const name = $('listNameInput').value.trim();
      if (!name) return toast('List category name missing.', 'err');

      if (editingListId) {
        // Update existing list
        const { error } = await db.from('subjects').update({ name, color: selColor }).eq('id', editingListId);
        if (error) return toast('Error updating list.', 'err');
        toast('List updated.', 'ok');
      } else {
        // Create new list
        const { error } = await db.from('subjects').insert({ user_id: user.id, name, color: selColor });
        if (error) return toast('Error saving list.', 'err');
        toast('List created.', 'ok');
      }

      hideOverlay('listOverlay');
      loadAll();
    };


    /* ============================================================
       OVERLAY CONTROL LAYER SYSTEM FUNCTIONS
    ============================================================ */
    function showOverlay(id) { $(id).classList.remove('hidden'); }
    function hideOverlay(id) { $(id).classList.add('hidden'); }

    ['taskOverlay', 'listOverlay', 'confirmOverlay'].forEach(id => {
      $(id).addEventListener('click', e => { if (e.target === $(id)) hideOverlay(id); });
    });

    document.addEventListener('keydown', e => { if (e.key === 'Escape') ['taskOverlay', 'listOverlay', 'confirmOverlay'].forEach(hideOverlay); });

    const bindClick = (id, handler) => {
      const el = $(id);
      if (el) el.onclick = handler;
    };

    bindClick('taskClose', () => hideOverlay('taskOverlay'));
    bindClick('taskCancel', () => hideOverlay('taskOverlay'));
    bindClick('listClose', () => hideOverlay('listOverlay'));
    bindClick('listCancel', () => hideOverlay('listOverlay'));

    bindClick('confirmYes', () => {
      console.log('confirmYes clicked', { confirmCb });
      hideOverlay('confirmOverlay');
      if (confirmCb) {
        try {
          const result = confirmCb();
          if (result && typeof result.catch === 'function') {
            result.catch(err => {
              console.error('Confirm action failed:', err);
              toast('Action failed. Check console for details.', 'err');
            });
          }
        } catch (err) {
          console.error('Confirm action exception:', err);
          toast('Action failed. Check console for details.', 'err');
        }
        confirmCb = null;
      } else {
        console.warn('confirmYes clicked but confirmCb is null');
      }
    });
    bindClick('confirmNo', () => hideOverlay('confirmOverlay'));

/* ============================================================
   MỤC 15: PAST-TIME WARNING (INPUT LISTENER)
    ============================================================ */
    $('taskTimeInput').addEventListener('input', () => {
      const due_time = $('taskTimeInput').value;
      const warn = $('pastTimeWarn');
      if (!due_time || !targetTaskDate) { warn.classList.remove('show'); return; }

      const now = new Date();
      const taskDate = new Date(targetTaskDate + 'T' + due_time);
      if (taskDate < now) {
        warn.classList.add('show');
      } else {
        warn.classList.remove('show');
      }
    });