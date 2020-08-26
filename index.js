const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send({
        'hello': 'there'
    });
});

app.use(cors());

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});