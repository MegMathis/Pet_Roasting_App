////Pulling in Modules\\\\
//requiring express framework
const express = require("express");
//creating PORT variable
const PORT = process.env.PORT || 3000;
//pulling in handlebars engine
const { engine } = require("express-handlebars");
//pulling in the database
const db = require("./config/connection");
//pulling in the route files
const view_routes = require("./controllers/view_routes");
const auth_routes = require("./controllers/auth_routes");
//requiring session framework
const session = require("express-session");

//creating a new instance of express
const app = express();

//configuring middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

//loadign all routes at root
app.use("/", [view_routes, auth_routes]);

// change file ext from .handlebars to .hbs
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

//syncing the database and starting the server
db.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Server running on port %s", PORT));
});
