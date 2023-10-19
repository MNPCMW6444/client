const express = require('express');
const app = express();
const port = 3000;


let emdot = "09:40";


app.get('/getEmdot', (req, res) => 
  res.status(200).send(emdot)
);


app.get('/', (req, res) => {
  // Redirect to the register page on failean.com
  res.redirect('https://failean.com');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
