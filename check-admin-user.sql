-- Fixed SQL query to check admin user
select 
  u.id,
  u.email,
  u.email_confirmed_at,
  p.role,
  p.full_name
from auth.users u
left join profiles p on u.id = p.id
where u.email = 'your-admin-email@example.com';

-- Alternative: Check all users with their roles
select 
  u.id,
  u.email,
  u.email_confirmed_at,
  p.role,
from auth.users u
left join profiles p on u.id = p.id
order by u.created_at desc;
