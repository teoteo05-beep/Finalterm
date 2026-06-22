/**
 * @author Thành viên 3 (Authentication & Security)
 * @description Quản lý đăng nhập, đăng ký, đăng xuất, theo dõi phiên (session) người dùng.
 */
/* ============================================================
   AUTHENTICATION FORM PROCESSING CONTROLLER
    ============================================================ */
    let authMode = 'login';
    $('tabLoginBtn').onclick = () => { authMode = 'login'; $('tabLoginBtn').classList.add('active'); $('tabSignupBtn').classList.remove('active'); $('authSubmitBtn').querySelector('span').textContent = 'Sign In'; $('authConfirmPasswordField').style.display = 'none'; $('authConfirmPassword').removeAttribute('required'); clearAuthNotice(); };
    $('tabSignupBtn').onclick = () => { authMode = 'signup'; $('tabSignupBtn').classList.add('active'); $('tabLoginBtn').classList.remove('active'); $('authSubmitBtn').querySelector('span').textContent = 'Sign Up'; $('authConfirmPasswordField').style.display = 'block'; $('authConfirmPassword').setAttribute('required', 'true'); clearAuthNotice(); };

    function showAuthNotice(msg, type) { const n = $('authNotice'); n.className = `auth-notice show ${type}`; n.textContent = msg; }
    function clearAuthNotice() { const n = $('authNotice'); n.className = 'auth-notice'; n.textContent = ''; }

    function setupPasswordToggle(inputId, toggleId) {
      const input = $(inputId);
      const toggle = $(toggleId);
      if(!input || !toggle) return;
      toggle.addEventListener('click', () => {
        if (input.type === 'password') {
          input.type = 'text';
          toggle.textContent = '👁‍🗨';
          toggle.title = 'Hide password';
        } else {
          input.type = 'password';
          toggle.textContent = '👁';
          toggle.title = 'Show password';
        }
      });
    }
    setupPasswordToggle('authPassword', 'togglePassword');
    setupPasswordToggle('authConfirmPassword', 'toggleConfirmPassword');

    $('authForm').onsubmit = async (e) => {
      e.preventDefault(); clearAuthNotice();
      const email = $('authEmail').value.trim();
      const password = $('authPassword').value;
      const btn = $('authSubmitBtn');

      if (authMode === 'signup') {
        const confirmPassword = $('authConfirmPassword').value;
        if (password !== confirmPassword) {
          showAuthNotice('Passwords do not match.', 'error');
          return;
        }
      }

      btn.disabled = true; const originalText = btn.querySelector('span').textContent; btn.innerHTML = '<div class="spin"></div>';

      if (authMode === 'login') {
        const { error } = await db.auth.signInWithPassword({ email, password });
        if (error) { showAuthNotice(error.message, 'error'); btn.disabled = false; btn.innerHTML = `<span>${originalText}</span>`; }
      } else {
        const { error } = await db.auth.signUp({ email, password });
        if (error) showAuthNotice(error.message, 'error');
        else showAuthNotice('Registration successful! Check your inbox.', 'success');
        btn.disabled = false; btn.innerHTML = `<span>${originalText}</span>`;
      }
    };

    /* ============================================================
       USER DROPDOWN MENU + LOGOUT + END WEEK
    ============================================================ */
    // User dropdown toggle
    $('userChip').addEventListener('click', (e) => {
      e.stopPropagation();
      const existing = document.querySelector('.user-dropdown');
      if (existing) { existing.remove(); return; }

      const dd = document.createElement('div');
      dd.className = 'user-dropdown';
      dd.innerHTML = `
        <div style="padding:8px 12px;font-size:11px;color:var(--ink-faint);font-family:'JetBrains Mono',monospace;">📧 ${user ? user.email : '...'}</div>
        <div class="user-dropdown-sep"></div>
        <button class="user-dropdown-item" id="ddChangePassword">🔒 Change password</button>
        <div class="user-dropdown-sep"></div>
        <button class="user-dropdown-item danger" id="ddLogout">🚨 Log out</button>
      `;
      $('userChip').appendChild(dd);

      dd.querySelector('#ddChangePassword').onclick = async (ev) => {
        ev.stopPropagation();
        dd.remove();
        const email = user?.email;
        if (!email) return toast('Email not found.', 'err');
        const { error } = await db.auth.resetPasswordForEmail(email);
        if (error) return toast('Error: ' + error.message, 'err');
        toast('Password reset link sent to your email.', 'ok');
      };
      dd.querySelector('#ddLogout').onclick = (ev) => {
        ev.stopPropagation();
        dd.remove();
        confirmAction('Are you sure you want to log out?', async () => { await db.auth.signOut(); });
      };
    });

    // Close dropdown on outside click
    document.addEventListener('click', () => {
      const dd = document.querySelector('.user-dropdown');
      if (dd) dd.remove();
    });

    // End Week button: mark all current week tasks as done
    $('endWeekBtn').onclick = () => {
      const base = new Date(); base.setDate(base.getDate() + weekOffset * 7);
      const mon = getMonday(base);
      const sun = new Date(mon); sun.setDate(mon.getDate() + 6);
      const monStr = toDateStr(mon), sunStr = toDateStr(sun);
      const weekPersonalTasks = tasks.filter(t => t.date >= monStr && t.date <= sunStr && !t.done);

      if (weekPersonalTasks.length === 0) {
        toast('All tasks for this week completed!', 'info');
        return;
      }

      confirmAction(`End week: mark ${weekPersonalTasks.length} remaining tasks as done and move to the next week?`, async () => {
        const ids = weekPersonalTasks.map(t => t.id);
        const { error } = await db.from('tasks').update({ done: true }).in('id', ids);
        if (error) return toast('Error ending week.', 'err');
        toast(`Completed ${ids.length} tasks. Moved to the new week!`, 'ok');
        weekOffset++;
        loadAll();
      });
    };

    function toast(msg, type = 'ok', duration = 3000) {
      const el = document.createElement('div'); el.className = `toast ${type}`; el.textContent = msg;
      $('toastWrap').appendChild(el);
      setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 220); }, duration);
    }

    function escapeHtml(str) {
      return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    }