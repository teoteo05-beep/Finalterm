/**
 * @author Thành viên 2 (Database & API)
 * @description Các hàm lấy dữ liệu (loadTasks, loadLists) và realtime database.
 */
/* ============================================================
   DATABASE SYNCHRONIZATION ENGINE
    ============================================================ */
    async function loadAll() {
      if (!user) {
        console.warn('loadAll aborted because user is null or signed out');
        return;
      }
      await Promise.all([loadLists(), loadTasks()]);
      renderAll();
    }

    async function loadLists() {
      const { data, error } = await db.from('subjects').select('*').order('name', { ascending: true });
      if (!error && data) lists = data;
    }

    async function loadTasks() {
      const { data, error } = await db.from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('due_time', { ascending: true });
      if (!error && data) tasks = data;
    }

    function subscribeRealtime() {
      if (realtimeCh) db.removeChannel(realtimeCh);
      realtimeCh = db.channel('tido-rt-v2')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => loadAll())
        .on('postgres_changes', { event: '*', schema: 'public', table: 'subjects' }, () => loadAll())
        .subscribe();
    }

    function unsubscribeRealtime() {
      if (realtimeCh) db.removeChannel(realtimeCh);
    }