const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const { connectToServer } = require("./utils/dbConnect");
const eventRoutes = require("./routes/v1/event.route.js");
const courseRoutes = require("./routes/v1/course.route.js");
const errorHandler = require("./middleware/errorHandler");

app.use(cors());
app.use(express.json());



connectToServer((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`Doctor Yourself app listening on port ${port}`);
    });
  } else {
    console.log(err); 
  }
});



//All Routers
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/event", eventRoutes);








app.get("/", (req, res) => {
  res.send("Server is Running");

});

app.all("*", (req, res) => {
  res.send("NO route found.");
});

app.use(errorHandler);

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});
