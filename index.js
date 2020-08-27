const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

const router = require("./routes/dialogFlowRoutes");

// app.get('/', (req, res) => {
//     res.send({
//         'hello': 'there'
//     });
// });

app.use(router);
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});