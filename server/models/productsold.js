'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductSold extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product)
      this.belongsTo(models.Invoice)
    }
  }
  ProductSold.init({
    ProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    totalCogs: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    InvoiceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductSold',
  });
  return ProductSold;
};