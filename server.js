const express =require(  "express");
const path =require(  "path");
const manifiestJSONData =require( "./src/manifiestJSONData");
require('dotenv').config();

const app = express();


app.use('/website', express.static(path.join(__dirname, 'website')));



app.get('/manifest.json', (_, res) => {
    res.json(manifiestJSONData);
});

app.get('/tos', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'tos.html'));
});


app.get('*', (_, res) =>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || ( process.env.NODE_ENV==="development" ? 5920 : 5999);
app.listen(port);

console.log('App is listening on port ' + port);
