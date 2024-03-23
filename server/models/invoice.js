'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.ProductSold)
    }
  }
  Invoice.init({
    date: { type: DataTypes.DATE, defaultValue: new Date() },
    customerName: {
      type: DataTypes.STRING, defaultValue: "default", allowNull: false, validate: {
        notNull: { msg: "Customer name is required" }, notEmpty: { msg: "Customer name is required" }
      }
    },
    salesPersonName: {
      type: DataTypes.STRING, defaultValue: "default", allowNull: false, validate: {
        notNull: { msg: "Sales name is required" }, notEmpty: { msg: "Sales name is required" }
      }
    },
    notes: { type: DataTypes.STRING, defaultValue: "" }
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};