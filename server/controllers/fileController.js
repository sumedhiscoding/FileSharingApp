const asyncHandler = require("express-async-handler");
const File = require("../models/File");
const bcrypt = require("bcrypt");
const path=require("path");
// @desc    Upload a file
// @route   POST /api/v1/file/upload
// @access public
const UploadFile = asyncHandler(async (req, res, next) => {
  const fileData = {
    path: req.file.path,
    originalName: req.file.originalname,
  };
  if (req.body.password != null && req.body.password != "") {
    fileData.password = await bcrypt.hash(req.body.password, 10);
  }
  const file = await File.create(fileData);
  console.log(file);
  if (file) {
    res
      .status(200)
      .json({ fileLink: `${req.headers.origin}/file/${file._id}` });
  } else {
    console.log("no file found");
  }
});

//@desc Get the file
//@router Get /api/v1/file/:id
//@access public
const GetFileById = asyncHandler(async (req, res, next) => {
  const file = await File.findById(req.params.id);

  if (!file || !file.originalName) {
    // Handle the case where 'file' or 'originalName' is undefined
    return res.status(404).send("File not found.");
  }

  let responseSent = false;

  // Only proceed to download if the response hasn't been sent yet
  file.downloadCount++;
  await file.save();

  // Set Content-Disposition header
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${file.originalName}"`
  );

  // Set Content-Type header
  res.setHeader("Content-Type", "application/octet-stream");

  // Send the file
  res.sendFile(path.join(__dirname,"..", file.path.toString()));

});

module.exports = { UploadFile, GetFileById };
