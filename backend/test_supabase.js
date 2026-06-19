const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = "https://xemhjbfuxsqbslfshswg.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_hh6fD9DywNlsKtUweNHY3Q_XLnKlfHN";
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testUpdate() {
  // Try to find a task
  const { data: tasks, error: fetchErr } = await db.from('tasks').select('*').limit(1);
  if (fetchErr) {
    console.error('Fetch Error:', fetchErr);
    return;
  }
  
  if (!tasks || tasks.length === 0) {
    console.log('No tasks found to update.');
    return;
  }

  const task = tasks[0];
  console.log('Found task:', task);

  // Try to update the task
  const targetState = !task.done;
  console.log('Attempting to update done to:', targetState);
  const { data, error } = await db.from('tasks').update({ done: targetState }).eq('id', task.id);
  
  if (error) {
    console.error('Update Error:', error);
  } else {
    console.log('Update Success:', data);
  }
}

testUpdate();
