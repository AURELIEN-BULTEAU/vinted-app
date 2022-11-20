router.post(
  "/offer/publish",
  isAuthenticated,
  fileUpload(),
  async (req, res) => {
    try {
      /*const pictureToUpload = convertToBase64(req.files.picture);

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
      res.status(200).json({ newOffer });*/
      res.status(200).json(req.user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);
