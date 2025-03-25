// /api/create-classroom.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { teacherId } = req.body;
      const classCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  
      // Use Supabase client (server-side) to insert a new classroom
      const { createClient } = require('@supabase/supabase-js');
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // Service key for secure server-side operations
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
      const { data, error } = await supabase
        .from('classrooms')
        .insert([{ class_code: classCode, teacher_id: teacherId }]);
  
      if (error) return res.status(400).json({ error: error.message });
      return res.status(200).json({ classCode, teacherId });
    }
    res.status(405).end(); // Method Not Allowed
  }