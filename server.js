import express from  "express";
import path from  "path";
import manifiestJSONData from "./src/manifiestJSONData"

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.use('/website', express.static(path.join(__dirname, 'website')));

console.log('Max header size:', require('http').maxHeaderSize);


app.get('/manifest.json', (_, res) => {
    res.json(manifiestJSONData);
});

app.get('/tos', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'tos.html'));
});



app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 5999;
app.listen(port);

console.log('App is listening on port ' + port);
