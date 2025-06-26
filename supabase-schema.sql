-- Create contact_messages table
create table contact_messages (
  id uuid default gen_random_uuid() primary key,
  first_name text not null,
  last_name text not null,
  email text not null,
  company text,
  subject text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS (Row Level Security) policy if needed
-- alter table contact_messages enable row level security;

-- Create an index on email for faster lookups
create index contact_messages_email_idx on contact_messages(email);

-- Create an index on created_at for faster sorting
create index contact_messages_created_at_idx on contact_messages(created_at desc);

-- Create a function to automatically update the updated_at column
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create a trigger to automatically update updated_at
create trigger update_contact_messages_updated_at
  before update on contact_messages
  for each row
  execute function update_updated_at_column();