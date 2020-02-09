const express = require("express");
const app = express();
require("./config/LoaderEnvironmentVariable");
const database = require("./config/Database");

/**
 * @description Settings view engine.
 */
app.set("views", "views");
app.set("view engine", "ejs");

/**
 * @description Setting directory static files.
 */
app.use(express.static("public"));

app.get("/", async (request, response) => {
    const categories = await database("categories").select();
    console.log(categories);
    response.render("home");
})

app.listen(process.env.PORT, (error) => {
    if (error) {
        console.log(error);
        return;
    }

    console.log("Devshop running in address: http://localhost:3000");
})