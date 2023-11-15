// server js 
const express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    app = express(),
    authRoute = require('./routes/AuthRoute'),
    cookieParser = require('cookie-parser');
require('dotenv').config();
const { MONGO_URL, PORT } = process.env;

mongoose
    .connect(MONGO_URL)
    .then((x) => {
        console.log(`Connected to Mongo! Database name: ${x.connections[0].name}`);
    })
    .catch((err) => {
        console.error("Error connecting to mongo", err.reason);
    });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

const corsOptions = {
    // connect to frontend
    origin: ["http://localhost:5173"],
    allowHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    credentials: true,
    methods: ['GET', 'POST'],
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use("/", authRoute);

/* app.get('/generate-token', (req, res) => {
    const payload = { user: 'example_user' };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    res.json({ token });
}); */

/* app.get('verify-token', (req, res) => {
    const token = req.query.token;

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) res.status(401).json({ message: 'Token verification failed' });
        else {
            res.json({ message: 'Token verified', decoded });
        }
    });
}); */

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
