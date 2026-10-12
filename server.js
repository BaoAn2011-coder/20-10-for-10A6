import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Register custom MIME types
express.static.mime.define({
  'image/jpeg': ['jfif'],
  'text/plain': ['obj'],
  'font/ttf': ['ttf'],
  'audio/mpeg': ['mp3']
});

// Serve static assets from the root applet directory
app.use(express.static(__dirname, {
  index: ['index.html'],
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
    }
  }
}));

// Route fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
