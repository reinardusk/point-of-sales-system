const { Op } = require("sequelize");
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

      return res.status(200).json(orderedProducts);
    } catch (error) {
      next(error);
    }
  }

  static async getInvoices(req, res, next) {
    try {
      const { month, year } = req.query;

      let payload = { include: ProductSold, order: [['date', 'desc']] }

      if (month == "January") {
        payload.where = { date: { [Op.between]: [`${year}-01-01`, `${year}-01-31`] } }
      }

      if (month == "February") {
        payload.where = { date: { [Op.between]: [`${year}-02-01`, `${year}-02-29`] } }
      }

      if (month == "March") {
        payload.where = { date: { [Op.between]: [`${year}-03-01`, `${year}-03-31`] } }
      }

      if (month == "April") {
        payload.where = { date: { [Op.between]: [`${year}-04-01`, `${year}-04-30`] } }
      }

      if (month == "May") {
        payload.where = { date: { [Op.between]: [`${year}-05-01`, `${year}-05-31`] } }
      }

      if (month == "June") {
        payload.where = { date: { [Op.between]: [`${year}-06-01`, `${year}-06-30`] } }
      }

      if (month == "July") {
        payload.where = { date: { [Op.between]: [`${year}-07-01`, `${year}-07-31`] } }
      }

      if (month == "August") {
        payload.where = { date: { [Op.between]: [`${year}-08-01`, `${year}-08-31`] } }
      }

      if (month == "September") {
        payload.where = { date: { [Op.between]: [`${year}-09-01`, `${year}-09-30`] } }
      }

      if (month == "October") {
        payload.where = { date: { [Op.between]: [`${year}-10-01`, `${year}-10-31`] } }
      }

      if (month == "November") {
        payload.where = { date: { [Op.between]: [`${year}-11-01`, `${year}-11-30`] } }
      }

      if (month == "December") {
        payload.where = { date: { [Op.between]: [`${year}-12-01`, `${year}-12-31`] } }
      }

      const invoices = await Invoice.findAll(payload);
      return res.status(200).json(invoices);

    } catch (error) {
      next(error);
    }
  }

  static async getInvoiceDetail(req, res, next) {
    try {
      const { invoiceId } = req.params;
      const invoice = await Invoice.findByPk(invoiceId, { include: { model: ProductSold, include: { model: Product } } });

      return res.status(200).json(invoice);

    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;