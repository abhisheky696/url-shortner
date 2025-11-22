import express from "express";
import {
  getUniqueCode,
  testing,
  redirectHandler,
  getAnalytics,
  getAllLinks,
} from "../controllers/url.controller.js";

const router = express.Router();

router.get("/test", testing);

router.get("/analytics/:code", getAnalytics);

router.get("/getAllLinks", getAllLinks);

router.post("/shorten", getUniqueCode);

router.get("/:code", redirectHandler);




export default router;
