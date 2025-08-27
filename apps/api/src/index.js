const express = require("express");
const cors = require("cors"); // импорт cors
const app = express();
const port = 4000;

// Разрешить все домены (для разработки)
app.use(cors());

/**
 * Прокси-эндпоинт для получения списка постов с пагинацией
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
        console.error(error);
        res.status(500).json({ error: "Ошибка загрузки постов" });
    }
});

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
});