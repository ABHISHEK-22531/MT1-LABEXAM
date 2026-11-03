import http from "http";
import fs from "fs";

let books = [
    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho",
        price: 350
    },
    {
        id: 2,
        title: "Harry Potter",
        author: "J.K. Rowling",
        price: 500
    }
];

const server = http.createServer((req, res) => {

    // GET /
    if (req.url === "/" && req.method === "GET") {

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end("<h1>Welcome to Library Management System</h1>");
    }

    // GET /books
    else if (req.url === "/books" && req.method === "GET") {

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(books));
    }

    // GET /about
    else if (req.url === "/about" && req.method === "GET") {

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end("<h1>Library Management Application</h1>");
    }

    // GET /home
    else if (req.url === "/home" && req.method === "GET") {

        fs.readFile("./public/index.html", (err, data) => {

            if (err) {
                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });

                res.end("Error reading file");
            }
            else {
                res.writeHead(200, {
                    "Content-Type": "text/html"
                });

                res.end(data);
            }

        });
    }

    // POST /add-book
    else if (req.url === "/add-book" && req.method === "POST") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {

            const book = JSON.parse(body);

            if (!book.id || !book.title || !book.author || !book.price) {

                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });

                res.end("All book details are required");
                return;
            }

            books.push(book);

            res.writeHead(201, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                message: "Book added successfully",
                book: book
            }));
        });
    }

    // Invalid route
    else {

        res.writeHead(404, {
            "Content-Type": "text/plain"
        });

        res.end("Route not found");
    }

});

server.listen(3000, () => {

    console.log("HTTP Server running at http://localhost:3000");

});