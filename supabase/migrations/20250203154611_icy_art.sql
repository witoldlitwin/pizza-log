/*
  # Create Pizza Log Table
  
  1. New Tables
    - `pizza_log`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `date` (date, not null) 
      - `slices` (integer, not null)
      - `created_at` (timestamp with timezone)
  
  2. Security
    - Enable RLS on `pizza_log` table
    - Add policies for authenticated users to:
      - Read all records
      - Insert their own records
*/

CREATE TABLE IF NOT EXISTS pizza_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  date date NOT NULL,
  slices integer NOT NULL CHECK (slices > 0),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE pizza_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read access to all users"
  ON pizza_log
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow insert access to all users"
  ON pizza_log
  FOR INSERT
  TO authenticated
  WITH CHECK (true);