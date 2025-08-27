const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = 4000;

/**
 * proxy-endpoint for mock-api
 * example: GET /posts?page=2&limit=5
 */
app.get("/posts", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();

        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedData = data.slice(start, end);

        res.json({
            page,
            limit,
            total: data.length,
            totalPages: Math.ceil(data.length / limit),
            data: paginatedData
        });
    } catch (error) {
        res.status(500).json({ error: "error load posts" });
    }
});

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
});