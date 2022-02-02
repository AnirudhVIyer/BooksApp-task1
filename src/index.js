const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const app = express();
app.use(express.json()); // parse incoming req

//user router
app.use(userRouter);

app.listen(3000, () => {
  console.log("server is up");
});
