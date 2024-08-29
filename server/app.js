import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import categoriesRouter from "./routes/categories.js";

const corsOptions = {
    origin: ['http://localhost:5173'],
};

const app = express();
app.use(cors(corsOptions));

app.use('/categories', categoriesRouter);

const PORT = process.env.PORT || 5001;

app.get('/api', (req, res) => {
    res.json([{name: "my name"}, {name: "second name"}]);
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


