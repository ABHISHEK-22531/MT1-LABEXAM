import express from "express";

const app = express();

app.use(express.json());

let books = [
    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho",
        price: 350,
        category: "Fiction"
    },
    {
        id: 2,
        title: "Harry Potter",
        author: "J.K. Rowling",
        price: 500,
        category: "Fantasy"
    },
    {
        id: 3,
        title: "Clean Code",
        author: "Robert Martin",
        price: 550,
        category: "Programming"
    }
];

// GET all books
app.get("/books", (req, res) => {
    res.json(books);
});

// GET book by ID
app.get("/books/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.json(book);
});

// POST add new book
app.post("/books", (req, res) => {

    const book = req.body;

    books.push(book);

    res.status(201).json({
        message: "Book added successfully",
        book: book
    });
});

// PUT update book
app.put("/books/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    book.title = req.body.title;
    book.author = req.body.author;
    book.price = req.body.price;
    book.category = req.body.category;

    res.json({
        message: "Book updated successfully",
        book: book
    });
});

// DELETE book
app.delete("/books/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const deletedBook = books.splice(index, 1);

    res.json({
        message: "Book deleted successfully",
        book: deletedBook[0]
    });
});

// Start server
app.listen(4000, () => {
    console.log("Express Server running at http://localhost:4000");
});