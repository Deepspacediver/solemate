const express = require('express');
const cors = require('cors');

const corsOptions = {
    origin:['http://localhost:5173'],
}

const app = express();
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5001;

app.get('/api', (req, res) => {
    res.json([{name: "my name"}, {name: "second name"}]);
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


