import express from 'express';
import { connectDatabase } from './infrastructure/db/database';

const app = express();
const PORT = 3000;

app.use(express.json());

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Failed to start the server', error);
});
