import express from 'express';

import { brandactionpage, brandpage } from '../../controllers/brand/controller.js';

const brandroute = express.Router();

brandroute
.get("/", brandpage)
.post("/", brandactionpage)

export default brandroute;