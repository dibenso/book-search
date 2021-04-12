require("isomorphic-fetch");
const router = require("express").Router();
const { Book } = require("../models");

router.get("/api/books", async (req, res) => {
  try {
    const books = await Book.find();

    res.json(books);
  } catch (error) {
    res.sendStatus(500);

    throw error;
  }
});

router.post("/api/books", async (req, res) => {
  try {
    const io = req.app.get("socketio");
    const { title, authors, description, image, link } = req.body;
    const book = new Book({ title, authors, description, image, link });

    await book.save();
    io.emit("bookSaved", title);
    res.json(book);
  } catch (error) {
    res.sendStatus(500);

    throw error;
  }
});

router.delete("/api/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);

    res.json(book);
  } catch (error) {
    res.sendStatus(500);

    console.log(error);
  }
});

module.exports = router;
