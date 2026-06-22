const fs = require('fs');

let content = fs.readFileSync('index (1).html', 'utf-8');

// 1. HTML Removals
// assigneeGroup in Task Modal
content = content.replace(/<div class="form-group" id="assigneeGroup">\s*<label class="form-label">Assign To \(Team Mode\)<\/label>\s*<select class="form-input" id="taskAssigneeSelect">\s*<option value="">-- Unassigned --<\/option>\s*<\/select>\s*<\/div>\s*/g, '');

// groupOverlay Modal
content = content.replace(/<!-- TEAM GROUP MODAL -->[\s\S]*?(?=<!-- CONFIRM OVERLAY -->)/g, '');

// Sidebar Team Groups
content = content.replace(/<!--\s*<div>\s*<div class="sidebar-section-title">\s*<span>👥 Team Groups<\/span>[\s\S]*?<\/div>\s*-->\s*/g, '');

// Onboarding text
content = content.replace("<h3>Make a project or group</h3>", "<h3>Make a project</h3>");
content = content.replace("Create a personal list or collaborative group to start planning with your teammates.", "Create a personal list to start planning.");


// 2. JS Variables
content = content.replace(/\s*let groups = \[\];/g, '');
content = content.replace(/\s*let groupMembersCache = \{\};/g, '');
content = content.replace(/\s*let groupFilter = null;/g, '');
content = content.replace(/\s*let groupModalMode = 'create';/g, '');
content = content.replace(/\s*let activeManageGroupId = null;/g, '');

// 3. loadAll and loadGroups
content = content.replace("await Promise.all([loadLists(), loadGroups(), loadTasks()]);", "await Promise.all([loadLists(), loadTasks()]);");
content = content.replace(/\s*async function loadGroups\(\) \{[\s\S]*?\n    \}/g, '');

// 4. subscribeRealtime
content = content.replace(/\s*\.on\('postgres_changes', \{ event: '\*', schema: 'public', table: 'groups' \}, \(\) => loadAll\(\)\)/g, '');
content = content.replace(/\s*\.on\('postgres_changes', \{ event: '\*', schema: 'public', table: 'group_members' \}, \(\) => loadAll\(\)\)/g, '');

// 5. loadTasks
const load_tasks_new = `    async function loadTasks() {
      const { data, error } = await db.from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('due_time', { ascending: true });
      if (!error && data) tasks = data;
    }`;
content = content.replace(/    async function loadTasks\(\) \{[\s\S]*?if \(!error && data\) tasks = data;\n    \}/g, load_tasks_new);

// 6. renderSidebar
content = content.replace(/      \/\/ Collaborative Groups[\s\S]*?\/\/ Ensure groupFilter remains null because groups now use a separate page\s*groupFilter = null;/g, '');
content = content.replace("const count = personalWeekTasks.filter(t => t.subject_id === l.id).length;", "const count = weekRootTasks.filter(t => t.subject_id === l.id).length;");
content = content.replace(/personalWeekTasks\.length/g, "weekRootTasks.length");
content = content.replace(/personalWeekTasks\.filter\(t => !t\.done\)\.length/g, "weekRootTasks.filter(t => !t.done).length");
content = content.replace(/personalWeekTasks\.filter\(t => t\.done\)\.length/g, "weekRootTasks.filter(t => t.done).length");
content = content.replace("const personalWeekTasks = weekRootTasks.filter(t => !t.group_id);", "");

// 7. renderGrid
content = content.replace("if (lists.length === 0 && groups.length === 0) {", "if (lists.length === 0) {");
content = content.replace(/\s*if \(t\.group_id\) return false;/g, '');

const grid_group_tag = `          if (t.group_id) {
            const g = groups.find(x => x.id === t.group_id);
            if (g) tagHtml = \`<div class="task-tag-clean">\${escapeHtml(g.name)}</div>\`;
          } else if (t.subject_id) {`;
content = content.replace(grid_group_tag, "          if (t.subject_id) {");

content = content.replace(/\s*let hasControl = true;\s*if \(t\.group_id\) \{\s*const g = groups\.find\(x => x\.id === t\.group_id\);\s*if \(g && g\.userRole !== 'admin'\) hasControl = false;\s*\}/g, '');


// 8. populateParentDropdown
const parent_dropdown_old = `      const value = selectedSpace || $('taskSubjSelect').value;
      const targetDate = dateStr || targetTaskDate || todayStr();
      let spaceType = null;
      let spaceId = null;
      if (value.startsWith('personal:')) {
        spaceType = 'personal';
        spaceId = value.split(':')[1];
      } else if (value.startsWith('group:')) {
        spaceType = 'group';
        spaceId = value.split(':')[1];
      }

      if (!spaceType || !spaceId) return;
      const excludedIds = editTaskId ? [editTaskId, ...getTaskDescendants(editTaskId)] : [];

      const filteredTasks = tasks.filter(t => {
        if (t.date !== targetDate) return false;
        if (excludedIds.includes(t.id)) return false;
        if (spaceType === 'personal') return t.subject_id === spaceId && !t.group_id;
        return t.group_id === spaceId;
      });`;

const parent_dropdown_new = `      const spaceId = selectedSpace || $('taskSubjSelect').value;
      const targetDate = dateStr || targetTaskDate || todayStr();

      if (!spaceId) return;
      const excludedIds = editTaskId ? [editTaskId, ...getTaskDescendants(editTaskId)] : [];

      const filteredTasks = tasks.filter(t => {
        if (t.date !== targetDate) return false;
        if (excludedIds.includes(t.id)) return false;
        return t.subject_id === spaceId;
      });`;
content = content.replace(parent_dropdown_old, parent_dropdown_new);


// 9. taskSubjSelect onchange & populateAssigneeDropdown
content = content.replace(/\s*\$\('taskSubjSelect'\)\.onchange = \(\) => \{[\s\S]*?\};/g, '');
content = content.replace(/\s*function populateAssigneeDropdown.*?\{[\s\S]*?\}/g, '');

// 10. populateSpaceDropdown
const space_dropdown_old = `    function populateSpaceDropdown(selectedId = null, isGroup = false) {
      const select = $('taskSubjSelect');
      select.innerHTML = '';

      const projectOptions = [];
      lists.forEach(l => {
        const opt = document.createElement('option');
        opt.value = \`personal:\${l.id}\`;
        opt.textContent = \`📁 \${l.name}\`;
        if (!isGroup && l.id === selectedId) opt.selected = true;
        projectOptions.push(opt);
      });

      groups.forEach(g => {
        if (g.userRole === 'admin' || (isGroup && g.id === selectedId)) {
          const opt = document.createElement('option');
          opt.value = \`group:\${g.id}\`;
          opt.textContent = \`👥 \${g.name}\`;
          if (isGroup && g.id === selectedId) opt.selected = true;
          projectOptions.push(opt);
        }
      });

      if (projectOptions.length === 0) {
        const optEmpty = document.createElement('option');
        optEmpty.value = '';
        optEmpty.textContent = '-- Create a project first --';
        optEmpty.disabled = true;
        select.appendChild(optEmpty);
        select.disabled = true;
        return;
      }

      projectOptions.forEach(opt => select.appendChild(opt));
      select.disabled = false;

      if (selectedId) {
        const matchingOption = Array.from(select.options).find(o => o.selected || o.value.endsWith(\`:\${selectedId}\`));
        if (!matchingOption) select.selectedIndex = 0;
      } else if (!select.value && select.options.length > 0) {
        select.selectedIndex = 0;
      }
    }`;

const space_dropdown_new = `    function populateSpaceDropdown(selectedId = null) {
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
        opt.textContent = \`📁 \${l.name}\`;
        if (l.id === selectedId) opt.selected = true;
        select.appendChild(opt);
      });

      select.disabled = false;
      if (!select.value && select.options.length > 0) {
        select.selectedIndex = 0;
      }
    }`;
content = content.replace(space_dropdown_old, space_dropdown_new);


// 11. openNewTask
const open_new_task_old = `      // Check if user has any projects (personal or group as admin)
      const hasPersonalProjects = lists && lists.length > 0;
      const hasGroupProjects = groups && groups.some(g => g.userRole === 'admin');
      
      if (!hasPersonalProjects && !hasGroupProjects) {`;
const open_new_task_new = `      if (!lists || lists.length === 0) {`;
content = content.replace(open_new_task_old, open_new_task_new);
content = content.replace("populateSpaceDropdown(preselectId, false);", "populateSpaceDropdown(preselectId);");


// 12. openEditTask
const open_edit_task_old = `      let canEdit = true;
      if (t.group_id) {
        const g = groups.find(x => x.id === t.group_id);
        if (g && g.userRole !== 'admin') canEdit = false;
      }

      editTaskId = id;
      $('taskModalTitle').textContent = canEdit ? 'Edit Task' : 'Task Details';`;
const open_edit_task_new = `      let canEdit = true;

      editTaskId = id;
      $('taskModalTitle').textContent = 'Edit Task';`;
content = content.replace(open_edit_task_old, open_edit_task_new);
content = content.replace("populateSpaceDropdown(t.group_id || t.subject_id, !!t.group_id);", "populateSpaceDropdown(t.subject_id);");

const assignee_old = `      if (t.group_id) {
        $('assigneeGroup').classList.remove('hidden');
        populateAssigneeDropdown(t.group_id, t.assigned_to);
        $('taskAssigneeSelect').disabled = !canEdit;
      } else {
        $('assigneeGroup').classList.add('hidden');
      }`;
content = content.replace(assignee_old, "");

// 13. taskSaveBtn
content = content.replace(/\s*let subject_id = null;\s*let group_id = null;\s*if \(spaceVal\.startsWith\('personal:'\)\) subject_id = spaceVal\.split\(':'\)\[1\];\s*if \(spaceVal\.startsWith\('group:'\)\) group_id = spaceVal\.split\(':'\)\[1\];/g, "\n      let subject_id = spaceVal;");
content = content.replace(/\s*if \(!subject_id && !group_id\) \{\s*return toast\('Task must be assigned to a project\. Please select a project\.', 'err'\);\s*\}/g, "\n      if (!subject_id) {\n        return toast('Task must be assigned to a project. Please select a project.', 'err');\n      }");
content = content.replace(/\s*if \(group_id\) \{[\s\S]*?\n\s*\}/g, "");
content = content.replace("const assigned_to = group_id ? ($('taskAssigneeSelect').value || null) : null;", "");
content = content.replace(/\s*if \(original && original\.group_id\) \{[\s\S]*?\n\s*\}/g, "");
content = content.replace(/group_id, assigned_to, due_time/g, "due_time");
content = content.replace(/group_id, assigned_to: null, due_time: null/g, "due_time: null");

// 14. Group Collaboration Logic Section
content = content.replace(/    \/\* ============================================================\s*GROUP COLLABORATION LOGIC MANAGEMENT\s*============================================================ \*\/[\s\S]*?\/\* ============================================================/g, '    /* ============================================================');


// 15. endWeekBtn, searchInput, statsBtn, archiveBtn, renderDayView
content = content.replace("const weekPersonalTasks = tasks.filter(t => !t.group_id && t.date >= monStr && t.date <= sunStr && !t.done);", "const weekPersonalTasks = tasks.filter(t => t.date >= monStr && t.date <= sunStr && !t.done);");
content = content.replace("const matches = tasks.filter(t => !t.group_id && !t.parent_id && t.title.toLowerCase().includes(q));", "const matches = tasks.filter(t => !t.parent_id && t.title.toLowerCase().includes(q));");
content = content.replace("const wt = tasks.filter(t => !t.group_id && !t.parent_id && t.date >= monStr && t.date <= sunStr);", "const wt = tasks.filter(t => !t.parent_id && t.date >= monStr && t.date <= sunStr);");
content = content.replace("const doneTasks = tasks.filter(t => !t.group_id && t.done);", "const doneTasks = tasks.filter(t => t.done);");
content = content.replace("const targetTasks = tasks.filter(t => t.date === dayViewDate && !t.parent_id && !t.group_id);", "const targetTasks = tasks.filter(t => t.date === dayViewDate && !t.parent_id);");

fs.writeFileSync('index (1).html', content, 'utf-8');

console.log("Done");
