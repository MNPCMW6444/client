const express =require(  "express");
const cors = require("cors");
const path =require(  "path");
const manifiestJSONData =require( "./src/manifiestJSONData");
require('dotenv').config();

const app = express();

app.use(cors({
  origin: [process.env.REACT_APP_SERVER_URL]
}));


app.use('/', express.static(path.join(__dirname, 'website')));



app.get('/manifest.json', (_, res) => {
    res.json(manifiestJSONData);
});

app.use('/tos',
    express.static(path.join(__dirname, 'public', 'tos.html'))
);


app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || ( 5999);
app.listen(port, "0.0.0.0");

console.log('App is listening on port ' + port);
