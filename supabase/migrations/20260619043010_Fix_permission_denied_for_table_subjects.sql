-- Cấp quyền truy cập bảng subjects cho người dùng
GRANT ALL ON TABLE public.subjects TO anon, authenticated, service_role;

-- Cấp quyền truy cập bảng tasks cho người dùng
GRANT ALL ON TABLE public.tasks TO anon, authenticated, service_role;
