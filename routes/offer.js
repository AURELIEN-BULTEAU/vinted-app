const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const fileUpload = require("express-fileupload");

const Offer = require("../models/Offer");

const cloudinary = require("cloudinary").v2;
const convertToBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};
cloudinary.config({
  cloud_name: "dsncw7g0v",
  api_key: "996443328558879",
  api_secret: "jfqrd7ilCOGtUdOFbt7qP8hC-W0",
});

router.post(
  "/offer/publish",
  isAuthenticated,
  fileUpload(),
  async (req, res) => {
    try {
      const pictureToUpload = convertToBase64(req.files.picture);

      const newOffer = new Offer({
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_price: req.body.product_price,
        product_details: [
          {
            MARQUE: req.body.brand,
          },
          {
            TAILLE: req.body.size,
          },
          {
            ÉTAT: req.body.condition,
          },
          {
            COULEUR: req.body.color,
          },
          {
            EMPLACEMENT: req.body.city,
          },
        ],

        owner: req.user,
      });
      const uploadResult = await cloudinary.uploader.upload(pictureToUpload, {
        folder: `/vinted/offers/${newOffer._id}`,
      });

      newOffer.product_image = uploadResult;

      await newOffer.save();
      res.status(200).json({ newOffer });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);
module.exports = router;
