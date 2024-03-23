const errorHandler = (err, req, res, next) => {
  console.error(err);
  let status = 500
  let message = 'Internal server error'

  if (err.name === 'SequelizeValidationError') {
    status = 400
    message = err.errors.map(e => e.message)
  }
  if (err.name === 'SequelizeUniqueConstraintError') {
    status = 400
    message = err.errors.map(e => e.message)
  }
  if (err.name === "StockNotEnough") {
    status = 400
    message = "Stock is not enough"
  }

  res.status(status).json({ message });
};

module.exports = errorHandler;