UPDATE public.site_content SET updated_by = NULL WHERE updated_by IN (SELECT user_id FROM public.user_roles WHERE role = 'admin');
DELETE FROM public.user_roles WHERE role = 'admin';
DELETE FROM auth.users WHERE id = '328d8b29-efd9-42a5-9935-ce8a611f6ae6';