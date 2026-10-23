import express from 'express';
import router from './routes/characterRoutes.js'

const app = express();
const PORT = process.env.PORT || 3001;

// Serve the static frontend from ./public
app.use(express.static('public'));
app.use('/api/character',router);


app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
});