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

  const { filename } = req.query;
  const filePath = path.join(process.cwd(), 'public/json_files', `${filename}.json`);
  
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(JSON.parse(fileContent));
  } else {
    res.status(404).json({ error: 'File not found' });
  }
}