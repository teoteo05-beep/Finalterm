-- 1. Tạo bảng subjects (Lưu danh sách Project cá nhân)
CREATE TABLE public.subjects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bật bảo mật RLS cho bảng subjects
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

-- Cấp quyền: User chỉ được xem/thêm/sửa/xóa project của chính mình
CREATE POLICY "Users can manage their own subjects" 
ON public.subjects FOR ALL 
USING (auth.uid() = user_id);

-- ==========================================

-- 2. Tạo bảng tasks (Lưu danh sách Công việc)
CREATE TABLE public.tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  date TEXT,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  due_time TEXT,
  notes TEXT,
  done BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bật bảo mật RLS cho bảng tasks
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Cấp quyền: User có thể thao tác với task cá nhân HOẶC task trong Group mà họ là thành viên
CREATE POLICY "Users can manage their own tasks and group tasks"
ON public.tasks FOR ALL
USING (
  auth.uid() = user_id 
  OR 
  group_id IN (
    SELECT group_id FROM public.group_members WHERE user_id = auth.uid()
  )
);
