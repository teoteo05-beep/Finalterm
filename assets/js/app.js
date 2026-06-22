/**
 * @author Thành viên 1 (Trưởng nhóm / Core Logic)
 * @description File chứa state toàn cục, giao diện tối sáng và khởi chạy init()
 */
/* ============================================================
   CONSTANTS & GLOBAL DATA STATES DECLARES
    ============================================================ */
    const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const DAY_SHORTS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const LIST_COLORS = ['#bd5338', '#5b8254', '#2d5a88', '#884488', '#caa030', '#448888', '#885522', '#556b3c', '#7a3050', '#3a6a8a'];

    let tasks = [];
    let lists = [];
    let user = null;
    let weekOffset = 0;
    let filterMode = 'all';
    let listFilter = null;
    let editingListId = null;
    let editTaskId = null;
    let targetTaskDate = null;
    let collapsedTaskIds = new Set();
    let selColor = LIST_COLORS[0];
    let confirmCb = null;
    let realtimeCh = null;
    let movingTaskId = null;
    let notifiedTasks = new Set();
    // Track tasks currently being processed to prevent double-click race conditions
    let processingTasks = new Set();
    let pendingSubtasks = [];

    window.addEventListener('unhandledrejection', event => {
      console.error('Unhandled promise rejection:', event.reason);
      toast('Unexpected error occurred. Check console.', 'err');
    });

    const $ = id => document.getElementById(id);
    const pad = n => String(n).padStart(2, '0');
    const todayStr = () => toDateStr(new Date());

    function toDateStr(d) {
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    }

    function getMonday(date) {
      const d = new Date(date);
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      return new Date(d.setDate(diff));
    }

    function formatWeekRange(mon) {
      const sun = new Date(mon);
      sun.setDate(mon.getDate() + 6);
      return `${mon.getDate()}/${mon.getMonth() + 1} - ${sun.getDate()}/${sun.getMonth() + 1}`;
    }

    function resetConfirmButtons() {
      const yesBtn = $('confirmYes');
      const noBtn = $('confirmNo');
      if (yesBtn) yesBtn.classList.remove('hidden');
      if (noBtn) {
        noBtn.textContent = 'No';
        noBtn.onclick = () => hideOverlay('confirmOverlay');
      }
      const extra = $('confirmExtraContainer');
      if (extra) {
        extra.classList.add('hidden');
        extra.innerHTML = '';
      }
    }

    function confirmAction(msg, cb, extraHtml = '') {
      resetConfirmButtons();
      $('confirmMessage').textContent = msg;
      const extra = $('confirmExtraContainer');
      if (extra) {
        if (extraHtml) {
          extra.innerHTML = extraHtml;
          extra.classList.remove('hidden');
        } else {
          extra.classList.add('hidden');
          extra.innerHTML = '';
        }
      }
      confirmCb = cb;
      showOverlay('confirmOverlay');
    }

/* ============================================================
   THEME MANAGEMENT CONTROLLER
    ============================================================ */
    function initTheme() {
      const saved = localStorage.getItem('tido-theme') || 'dark';
      document.documentElement.setAttribute('data-theme', saved);
      updateThemeIcons(saved);
    }

    function toggleTheme() {
      const curr = document.documentElement.getAttribute('data-theme');
      const next = curr === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('tido-theme', next);
      updateThemeIcons(next);
    }

    function updateThemeIcons(theme) {
      const ico = theme === 'dark' ? '☀️' : '🌙';
      $('themeBtn').textContent = ico;
      $('authThemeBtn').textContent = ico;
    }

    $('themeBtn').onclick = toggleTheme;
    $('authThemeBtn').onclick = toggleTheme;

/* ============================================================
   APPLICATION LIFECYCLE INITIALIZER & AUTH TRACKING
    ============================================================ */
    window.addEventListener('DOMContentLoaded', () => {
      initTheme();

      db.auth.onAuthStateChange((event, session) => {
        if (session) {
          user = session.user;
          const emailLocal = user.email.split('@')[0];
          const displayName = emailLocal.length > 14 ? emailLocal.substring(0, 13) + '…' : emailLocal;
          $('userEmail').textContent = displayName;
          $('userEmail').title = user.email;
          $('userAvatar').textContent = user.email.charAt(0).toUpperCase();
          $('authScreen').classList.add('hidden');
          $('appScreen').classList.remove('hidden');
          loadAll();
          subscribeRealtime();
          startNotificationDaemon();
        } else {
          user = null;
          unsubscribeRealtime();
          $('appScreen').classList.add('hidden');
          $('authScreen').classList.remove('hidden');
        }
      });
    });