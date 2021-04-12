const { Schema } = require("mongoose");
const Model = require("mongoose").model;

const BookSchema = new Schema({
  title: "String",
  authors: ["String"],
  description: "String",
  image: "String",
  link: "String"
});
const Book = new Model("Book", BookSchema);

module.exports = { Book };
