const express = require("express");
const Offer = require("../models/Offer");
const router = express.Router();

router.get("/offer", async (req, res) => {
  try {
    const limit = 5;

    const filters = {};

    if (req.query.title) {
      filters.product_name = new RegExp(req.query.title, "i");
    }
    if (req.query.priceMin) {
      filters.product_price = { $gte: req.query.priceMin };
    }

    if (req.query.priceMax) {
      if (filters.product_price) {
        filters.product_price.$lte = req.query.priceMax;
      } else {
        filters.product_price = {};
        filters.product_price.$lte = req.query.priceMax;
      }
    }
    const sortValue = {};
    if (req.query.sort === "price-desc") {
      sortValue.product_price = "desc";
    } else if (req.query.sort === "price-asc") {
      sortValue.product_price = "asc";
    }

    const page = req.query.page;
    const listOffer = await Offer.find(filters)
      .sort(sortValue)
      .limit(limit)
      .skip((page - 1) * limit)
      .select("product_name product_price -_id");

    const count = await Offer.find(filters).countDocuments();
    res.status(200).json({ count: count, offers: listOffer });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});
router.get("/offer/:id", async (req, res) => {
  try {
    const offerFound = await Offer.findById(req.params.id).populate(
      "owner",
      "account"
    );
    res.status(200).json(offerFound);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
