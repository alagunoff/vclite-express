import express from "express";

import { authenticateUser, authenticateAuthor } from "middlewares/auth";

import {
  createDraft,
  getDrafts,
  updateDraft,
  publishDraft,
  deleteDraft,
} from "./controllers";

const router = express.Router();

router.post("", authenticateUser(), authenticateAuthor, createDraft);
router.get("", authenticateUser(), authenticateAuthor, getDrafts);
router.patch("/:id(\\d+)", authenticateUser(), authenticateAuthor, updateDraft);
router.post(
  "/:id(\\d+)/publish",
  authenticateUser(),
  authenticateAuthor,
  publishDraft
);
router.delete(
  "/:id(\\d+)",
  authenticateUser(),
  authenticateAuthor,
  deleteDraft
);

export default router;