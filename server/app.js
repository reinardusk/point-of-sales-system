
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const errorHandler = require('./middlewares/errorHandler');
const ProductController = require('./controllers/productController');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", ProductController.get);
app.post("/", ProductController.post);
app.post("/invoices", ProductController.createInvoice);
app.put("/invoices/:invoiceId", ProductController.updateInvoice);
app.post("/addProductToInvoice/:invoiceId", ProductController.addProductToInvoice);
app.get("/orderedProducts/:invoiceId", ProductController.getOrderedProducts);
app.get("/invoices", ProductController.getInvoices);
app.get("/invoices/:invoiceId", ProductController.getInvoiceDetail);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});