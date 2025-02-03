/*
  # Allow public access to pizza log

  1. Security Changes
    - Enable public access to pizza_log table for both read and write operations
    - Remove authentication requirement from existing policies
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow read access to all users" ON pizza_log;
DROP POLICY IF EXISTS "Allow insert access to all users" ON pizza_log;

-- Create new policies for public access
CREATE POLICY "Allow public read access"
  ON pizza_log
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert access"
  ON pizza_log
  FOR INSERT
  TO anon
  WITH CHECK (true);