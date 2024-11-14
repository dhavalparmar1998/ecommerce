import express from 'express';
import { categoryactionpage, categorypage } from '../../controllers/category/controller.js';

const categoryroute = express.Router();

categoryroute
.get("/", categorypage)
.post("/", categoryactionpage)

export default categoryroute