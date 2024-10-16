import express from 'express';
import { connectDatabase } from './infrastructure/repositories/db/database';
import { invoiceRoutes } from './interfaces/routes/invoiceRoutes';
import { productRoutes } from './interfaces/routes/productRoutes';


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.json());  
app.use('/invoices', invoiceRoutes);
app.use('/products', productRoutes);
connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Failed to start the server', error);
});
