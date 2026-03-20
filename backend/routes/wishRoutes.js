import express from "express";

import {
  createWish,
  getWish,
  myWishes,
  deleteWish,
} from "../controllers/wishController.js";

import auth from "../middleware/authMiddleware.js";

import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/create",

  auth,

  upload.array("media", 6),

  createWish,
);

router.get(
  "/my",

  auth,

  myWishes,
);

router.get(
  "/:id",

  getWish,
);

router.delete(
  "/:id",

  auth,

  deleteWish,
);

export default router;
