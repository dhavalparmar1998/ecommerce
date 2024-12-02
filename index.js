import express from "express";
import 'dotenv/config'
import userroute from "./routes/user/routes.js";
import bodyParser from "body-parser";
import categoryroute from "./routes/category/routes.js";
import brandroute from "./routes/brand/routes.js";
import productroute from "./routes/product/routes.js";
import dbconnect from "./database/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";


dbconnect().then(()=>console.log("connected")).catch(err=>console.log(err))

const app = express();
app.use(cors());
app.use(cookieParser())
app.set("view engine","ejs")
app.use(bodyParser.urlencoded());
app.use("/public", express.static("public"))
app.use("/" , userroute);
app.use("/category", categoryroute);
app.use("/brand", brandroute);
app.use("/product", productroute);



app.listen(process.env.PORT);



