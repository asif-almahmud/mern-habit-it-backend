require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const habitRoutes = require("./routes/habits");
const userRoutes = require("./routes/user");

//-> express app
const app = express();

//-> setting the PORT
const PORT = process.env.PORT || 4000; // if the place we would deploy it would have a PORT number saved in the environment variables then it would grab that, otherwise we're going to run it here locally at PORT 4000

//-> middlewares
app.use(express.json()); // this middleware attaches the body(data/payload) sent from the client end to the "req" object of the server end

app.use((req, res, next) => {
  console.log(
    `requested path: "${req.path}", requested method: "${req.method}"`
  );
  next();
});

//-> registering the routes to our main app
app.use("/api/habits", habitRoutes);
app.use("/api/user", userRoutes);

//-> connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to db");
    //-> listen for requests
    app.listen(PORT, () => {
      console.log("listening on port", process.env.PORT || 4000);
    });
  })
  .catch((error) => {
    console.log(error);
  });
