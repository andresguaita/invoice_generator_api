import express from 'express';
import { createConnection } from 'typeorm';

const app = express();
const PORT = 3000;

app.use(express.json());

createConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => console.log('Error: ', error));
