const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();
const app = express();

/**Middleware */

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const port = process.env.PORT || 8001;
const mongourl = process.env.MONGO_URL;


const messageRoute = require("./routes/MessageRoutes");
app.use("/message", messageRoute);

const adminRoute = require("./routes/AdminRoutes");
app.use("/admin", adminRoute);


//http://localhost:8001/admin/loginAdmin
//http://localhost:8001/message/readMessage


/**connect to database */
mongoose.connect(mongourl)
.then(() => {
    console.log("Database connected");

    app.listen(port, () => {
        console.log("Working on port", port);
    });

}).catch((error) => console.log(error));

