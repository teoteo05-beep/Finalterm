-- 1. Đảm bảo đã có 2 cột cho Priority và Repeat và parent_id cho Sub-task
ALTER TABLE tasks 
ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'normal',
ADD COLUMN IF NOT EXISTS repeat_mode TEXT DEFAULT 'none',
ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES tasks(id) ON DELETE CASCADE;

-- 2. Logic tự động lặp lại Task (Auto-recurring tasks)
CREATE OR REPLACE FUNCTION auto_clone_repeating_task()
RETURNS TRIGGER AS $$
DECLARE
    next_date DATE;
BEGIN
    -- Kiểm tra: Nếu task VỪA ĐƯỢC CHUYỂN SANG DONE và có chế độ lặp lại
    IF NEW.done = true AND OLD.done = false AND NEW.repeat_mode != 'none' THEN
        -- Tính toán ngày của chu kỳ tiếp theo
        IF NEW.repeat_mode = 'daily' THEN
            next_date := NEW.date + INTERVAL '1 day';
        ELSIF NEW.repeat_mode = 'weekly' THEN
            next_date := NEW.date + INTERVAL '1 week';
        ELSIF NEW.repeat_mode = 'monthly' THEN
            next_date := NEW.date + INTERVAL '1 month';
        END IF;

        -- Tự động sinh ra 1 task mới tinh cho ngày tiếp theo
        INSERT INTO tasks (
            user_id, title, date, subject_id, group_id, assigned_to, 
            due_time, notes, parent_id, done, priority, repeat_mode
        ) VALUES (
            NEW.user_id, NEW.title, next_date, NEW.subject_id, NEW.group_id, NEW.assigned_to, 
            NEW.due_time, NEW.notes, NEW.parent_id, false, NEW.priority, NEW.repeat_mode
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Tạo Trigger gắn vào bảng tasks
DROP TRIGGER IF EXISTS trigger_auto_repeat_task ON tasks;
CREATE TRIGGER trigger_auto_repeat_task
AFTER UPDATE OF done ON tasks
FOR EACH ROW
EXECUTE FUNCTION auto_clone_repeating_task();