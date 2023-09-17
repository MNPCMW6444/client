const express = require("express");
const path = require("path");
const manifestJSONData = require("./src/manifestJSONData");
require('dotenv').config();

const app = express();


app.use('/', express.static(path.join(__dirname, 'website')));

app.get('/manifest.json', (_, res) => {
    res.json(manifestJSONData);
});

app.get('/tos', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'tos.html'));
});

app.get('/sub', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'subscription.html'));
});

app.get('/tok', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'tokens.html'));
});

app.get('/pay', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pay.html'));
});


// Production environment: serve the build
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'build')));

    app.get('*', (_, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}
// Development environment: forward the requests to localhost:5992
else if (process.env.NODE_ENV === 'development') {
    const {createProxyMiddleware} = require('http-proxy-middleware');

    app.use(createProxyMiddleware({
        target: 'http://localhost:5992',
        changeOrigin: true
    }));
}

const port = 5999;
app.listen(port, "0.0.0.0");

console.log('App is listening on port ' + port);
