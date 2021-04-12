require("isomorphic-fetch");
const router = require("express").Router();
const { Book } = require("../models");

router.get("/api/search/:query", async (req, res) => {
  try {
    const { query } = req.params;
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const books = await response.json();

    res.json(books);
  } catch (error) {
    res.sendStatus(500);

    throw error;
  }
});

router.get("/api/books", async (req, res) => {
  try {
    const scores = await Book.find();

    res.json(scores);
  } catch (error) {
    res.sendStatus(500);

    throw error;
  }
});

router.post("/api/books", async (req, res) => {
  try {
    const { title, authors, description, image, link } = req.body;
    const book = new Book({ title, authors, description, image, link });

    await book.save();

    res.json(book);
  } catch (error) {
    res.sendStatus(500);

    throw error;
  }
});

module.exports = router;
