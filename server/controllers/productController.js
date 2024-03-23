const { Product, Invoice, ProductSold } = require("../models");

class ProductController {
  static async get(req, res, next) {
    try {
      const products = await Product.findAll();
      return res.status(200).json(products);

    } catch (error) {
      next(error);
    }
  }

  static async post(req, res, next) {
    try {
      const { name, picture, stock, price } = req.body;
      const product = await Product.create({ name, picture, stock, price });
      return res.status(201).json(product);

    } catch (error) {
      next(error);
    }
  }

  static async createInvoice(req, res, next) {
    try {
      const newInvoice = await Invoice.create({});
      console.log(newInvoice)
      return res.status(201).json(newInvoice);

    } catch (error) {
      next(error);
    }
  }

  static async updateInvoice(req, res, next) {
    try {
      const { date, customerName, salesPersonName, paymentType, notes } = req.body;


      const newInvoice = await Invoice.update({ date, customerName, salesPersonName, paymentType, notes }, { where: { id: req.params.invoiceId } });

      return res.status(200).json(newInvoice);

    } catch (error) {
      next(error);
    }
  }

  static async addProductToInvoice(req, res, next) {
    try {
      const { ProductId, quantity, totalCogs, totalPrice } = req.body;
      const { invoiceId } = req.params;

      console.log(req.body);
      console.log(req.params)

      const invoice = await Invoice.findByPk(+invoiceId);
      const product = await Product.findByPk(ProductId);

      if (!invoice) {
        throw { name: "InvoiceNotFound" };
      }

      if (!product) {
        throw { name: "ProductNotFound" };
      }

      if (product.stock < quantity) {
        throw { name: "StockNotEnough" };
      }

      const newProductSold = await ProductSold.create({ InvoiceId: invoiceId, ProductId, quantity, totalCogs, totalPrice });

      const newStock = await product.update({ stock: product.stock - quantity });

      return res.status(200).json(newProductSold);

    } catch (error) {
      next(error);
    }
  }

  static async getOrderedProducts(req, res, next) {
    try {
      const { invoiceId } = req.params;
      const orderedProducts = await ProductSold.findAll({ where: { InvoiceId: invoiceId }, include: Product });
      console.log(orderedProducts);
      return res.status(200).json(orderedProducts);

    } catch (error) {
      next(error);
    }
  }

  static async getInvoices(req, res, next) {
    try {
      const invoices = await Invoice.findAll({ include: ProductSold });
      return res.status(200).json(invoices);

    } catch (error) {
      next(error);
    }
  }

}

module.exports = ProductController;