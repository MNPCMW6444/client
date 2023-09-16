const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  // Redirect to the register page on failean.com
  res.redirect('https://failean.com/register');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
