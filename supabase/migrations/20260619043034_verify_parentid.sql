-- 1. Đảm bảo cột parent_id đã được tạo trên bảng tasks (để lưu Sub-task)
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES tasks(id) ON DELETE CASCADE;

-- 2. Tải lại Schema Cache để API nhận diện cột mới ngay lập tức
NOTIFY pgrst, 'reload schema';
