CREATE OR REPLACE FUNCTION auto_clone_repeating_task()
RETURNS TRIGGER AS $$
DECLARE
    next_date DATE;
    next_date_str TEXT;
BEGIN
    -- Kiểm tra: Nếu task VỪA ĐƯỢC CHUYỂN SANG DONE và có chế độ lặp lại
    IF NEW.done = true AND OLD.done = false AND NEW.repeat_mode != 'none' THEN
        
        -- Sửa lỗi: Cột date trong DB là TEXT, nên cần ép kiểu (::DATE) trước khi cộng INTERVAL
        IF NEW.repeat_mode = 'daily' THEN
            next_date := NEW.date::DATE + INTERVAL '1 day';
        ELSIF NEW.repeat_mode = 'weekly' THEN
            next_date := NEW.date::DATE + INTERVAL '1 week';
        ELSIF NEW.repeat_mode = 'monthly' THEN
            next_date := NEW.date::DATE + INTERVAL '1 month';
        END IF;

        -- Chuyển lại ngày mới tính được thành TEXT (định dạng YYYY-MM-DD)
        next_date_str := to_char(next_date, 'YYYY-MM-DD');

        -- Tự động sinh ra 1 task mới tinh cho chu kỳ tiếp theo
        INSERT INTO tasks (
            user_id, title, date, subject_id, group_id, assigned_to, 
            due_time, notes, parent_id, done, priority, repeat_mode
        ) VALUES (
            NEW.user_id, NEW.title, next_date_str, NEW.subject_id, NEW.group_id, NEW.assigned_to, 
            NEW.due_time, NEW.notes, NEW.parent_id, false, NEW.priority, NEW.repeat_mode
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
