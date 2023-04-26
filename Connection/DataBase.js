const mongoose = require('mongoose')
require("dotenv").config();


mongoose
.connect(process.env.DATABASE, {
  useNewUrlParser: true,
})
.then(() => {
  // console.log("DB CONNECTED");
});


// const DB='mongodb+srv://ishwardatttripathi:MjTN6OOC4lMXPaF8@cluster0.mx7thnk.mongodb.net/mern?retryWrites=true&w=majority'