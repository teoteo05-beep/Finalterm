-- Xóa chính sách bảo mật cũ có dính líu tới group
DROP POLICY IF EXISTS "Users can manage their own tasks and group tasks" ON public.tasks;

-- Tạo chính sách mới: Trực tiếp, đơn giản, chỉ dành cho task cá nhân
CREATE POLICY "Users can manage their own tasks" 
ON public.tasks 
FOR ALL 
USING (auth.uid() = user_id);

