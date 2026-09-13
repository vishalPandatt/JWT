const express = require('express');
const signUpRoute = require("./routers/signup");
const bodyParser = require('body-parser');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use(bodyParser.json());
app.use("/user" ,signUpRoute);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});