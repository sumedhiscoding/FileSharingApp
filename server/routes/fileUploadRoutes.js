const express = require("express");
const { UploadFile, GetFileById } = require("../controllers/fileController");
const router = express.Router();
const multer = require("multer");
const cors = require("cors");

router.use(
  cors({
    exposedHeaders: ["Content-Disposition"],
  })
);

const upload = multer({ dest: "uploads" });
router.post("/upload", upload.single("file"), UploadFile);

router.get("/file/:id", GetFileById);

module.exports = router;
