const express = require('express')
const mongoose = require('mongoose')
const app = express();
require('dotenv').config();
const expressJwt = require('express-jwt');

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/votes',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log("Connected to the DB")
)

app.use("/user", require("./routes/userRouter.js"));
app.use("/comment", require("./routes/commentRouter.js"));
app.use("/api/issue", require("./routes/issueRouter"));
app.use("/auth", require("./routes/authRouter"));
app.use('/api', expressJwt({secret: process.env.SECRET, algorithms: ['RS256']}))

app.use((err, req, res, next) => {
    console.log(err);
      if(err.name === "Unauthorized Error"){
        res.status(err.status)
      }
    return res.send({errMsg: err.message});
});

app.listen(9000, () => {
    console.log("Server is running on port 9000");
});