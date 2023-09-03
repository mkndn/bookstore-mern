import express from "express";
import { Book } from "../models/book-models.js";

const booksRouter = express.Router();

booksRouter.post("/", async (request, response) => {
  try {
    const { book } = request.body;
    if (!book.title || !book.author || !book.publishedYear) {
      return response.status(400).send({
        message: "Missing required details title or author or published year",
      });
    }

    const created = await Book.create(book);
    response.status(201).send(created);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ error: error.message });
  }
});

booksRouter.put("/", async (request, response) => {
  try {
    const { book } = request.body;
    if (!book) {
      return response.status(400).send({
        message: "No book object found in the request",
      });
    }
    if (!book._id) {
      return response.status(400).send({
        message: "Can't update a book without _id",
      });
    }
    if (!book.title || !book.author || !book.publishedYear) {
      return response.status(400).send({
        message: "Missing required details title or author or published year",
      });
    }

    const bookFromDB = await Book.findByIdAndUpdate(book._id, book);
    if (!bookFromDB) {
      return response.status(404).send({
        message: `Book with id ${book._id} not found`,
      });
    }
    response.status(200).send(bookFromDB);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ error: error.message });
  }
});

booksRouter.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const removed = await Book.findByIdAndRemove(id);
    if (!removed) {
      return response.status(404).send(`Can't find book with id: ${id}`);
    }
    response.status(200).json(removed);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

booksRouter.get("/", async (_, response) => {
  try {
    const books = await Book.find({});
    response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ error: error.message });
  }
});

booksRouter.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    if (!book) {
      return response.status(404).send(`Can't find a book with id ${id}`);
    }
    response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ error: error.message });
  }
});

export default booksRouter;
