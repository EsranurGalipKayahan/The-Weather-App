import express from "express";
import { handleApiRequest } from "../../controllers/api_weather.js";
const router = express.Router();

router.get("/:cityName", handleApiRequest);

export default router;
