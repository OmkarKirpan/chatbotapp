const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config/keys');
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true
})

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

const router = require("./routes/dialogFlowRoutes");


app.use(router);
app.use(cors());

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (res, req) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});