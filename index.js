import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(compression()); // Compress responses
app.use(cors()); // Enable CORS
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for development
}));

// Serve static files from the dist directory
app.use(express.static(join(__dirname, 'dist')));

// API routes can be added here
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Listen on the port provided by Firebase App Hosting or default to 8080
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
}); 