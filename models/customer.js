const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 40,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  })
);

function validateCustomer(body) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(40).required(),
    phone: Joi.string().min(5).max(40).required(),
    isGold: Joi.boolean(),
  });

  const result = schema.validate(body);
  return result;
}

// module.exports.Customer = Customer
// module.exports.validate = validateCustomer;

//shorter alternative way exporting module
exports.Customer = Customer;
exports.validate = validateCustomer;
