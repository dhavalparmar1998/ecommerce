import express from "express";
import {productactionpage, productpage} from '../../controllers/product/controller.js';

const productroute = express.Router();

productroute
.get("/",productpage)
.post("/",productactionpage)

export default productroute;