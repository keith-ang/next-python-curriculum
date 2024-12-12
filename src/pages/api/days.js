// pages/api/days.js
import fs from 'fs';
import path from 'path';

// Helper function to set CORS headers
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
}

export default function handler(req, res) {
  setCorsHeaders(res);

  try {
    const jsonFilesDir = path.join(process.cwd(), 'public/json_files');
    if (!fs.existsSync(jsonFilesDir)) {
      console.error('Directory not found: ', jsonFilesDir);
      return res.status(500).json({ error: 'Directory not found' });
    }

    fs.readdir(jsonFilesDir, (err, files) => {
      if (err) {
        console.error('Error reading directory: ', err);
        return res.status(500).json({ error: 'Unable to read files' });
      }

      const days = files.filter(file => file.endsWith('.json')).map(file => {
        const filePath = path.join(jsonFilesDir, file);
        const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return {
          day: fileContent.day,
          title: fileContent.title,
          filename: file.replace('.json', '')
        };
      });

      return res.status(200).json(days);
    });
  } catch (error) {
    console.error('Unexpected error: ', error);
    return res.status(500).json({ error: 'Unexpected error' });
  }
}