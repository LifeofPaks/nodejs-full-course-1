const express = require("express");
const app = express();

const moviesRouter = require("./routes/moviesRoute")
// const morgan = require("morgan")
// const logger = (req, res, next) =>{
//     console.log("Custom Middleware")
//     next()
// }
// app.use(logger)
// app.use(morgan("dev"))
app.use(express.json());
app.use("/api/v1/movies", moviesRouter)


//CREATE A SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
