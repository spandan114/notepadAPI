const express = require("express");
const mongoose = require("mongoose");
const {mongoURI} = require('./keys')

const app = express();

app.use(express.json());

mongoose
  .connect(mongoURI,
    {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
  .then(() => console.log("Mondodb Connected...."))
  .catch(err => console.error(err));

//Register All Models 
  require('./models/note')

  require('./models/user')

  require('./models/nestedModel')

// Register All Route Here

app.use('/', require('./router/crud'))
app.use('/', require('./router/auth'))
app.use('/', require('./router/nestedarray'))

app.get("/", (req, res) => {
  res.send("Server working");
});


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));