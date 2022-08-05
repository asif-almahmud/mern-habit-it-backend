require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const habitRoutes = require("./routes/habits");

//-> express app
const app = express();

//-> middlewares
app.use(express.json()); // this middleware attaches the body(data/payload) sent from the client end to the "req" object of the server end

app.use((req, res, next) => {
   console.log(
      `requested path: "${req.path}", requested method: "${req.method}"`
   );
   next();
});

//-> routes
app.use("/api/habits", habitRoutes);

//-> connect to db
mongoose
   .connect(process.env.MONGO_URI)
   .then(() => {
      console.log("connected to db");
      //-> listen for requests
      app.listen(process.env.PORT, () => {
         console.log("listening on port", process.env.PORT);
      });
   })
   .catch((error) => {
      console.log(error);
   });
