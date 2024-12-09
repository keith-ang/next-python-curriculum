import fs from 'fs';
import path from 'path';

// Helper function to set CORS headers
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_FRONTEND_URL || '*'); // Update with your frontend URL
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
}

export default function handler(req, res) {
  setCorsHeaders(res);

  const jsonFilesDir = path.join(process.cwd(), 'public/json_files');
  fs.readdir(jsonFilesDir, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Unable to read files' });
    }
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    res.json(jsonFiles);
  });
}