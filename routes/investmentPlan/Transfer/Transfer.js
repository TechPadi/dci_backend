const express = require('express');
const router = express.Router();

const transferCTRL = require("../../../controllers/Transfer")

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");

const {API_SECRET,API_KEY,CLOUD_NAME} =require("../../../config");

cloudinary.config({
	cloud_name: CLOUD_NAME,
	api_key: API_KEY,
	api_secret:API_SECRET
  });
  const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	folder: "TransferProofs",
	allowedFormats: ["jpg", "png"],
	transformation: [{ width: 500, height: 500, crop: "limit" }]
  });	
  
  const upload = multer({ storage: storage }).single("image");


  router.post("/transfer/proof/:id",upload,transferCTRL.proof)


module.exports = router;