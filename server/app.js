import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import categoriesRouter from "./routes/categories-routes.js";
import zodMiddleware from "./middlewares/zod-middleware.js";
import shoeRouter from "./routes/shoe-routes.js";

const corsOptions = {
    origin: ['http://localhost:5173'],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/categories', categoriesRouter);
app.use('/shoes', shoeRouter);


app.get('/api', (req, res) => {
    res.json([{name: "my name"}, {name: "second name"}]);
});


app.use(zodMiddleware);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

