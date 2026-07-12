const Banner = require("../models/Banner");

const getBanner = async (req, res) => {
  try {
    if (typeof Banner?.find !== "function") {
      return res.status(500).json({ message: "Banner model is unavailable" });
    }

    const banners = await Banner.find({ active: true }).sort({ createdAt: -1 });
    res.status(200).json(banners || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBanner = async (req, res) => {
  try {
    if (typeof Banner?.create !== "function") {
      return res.status(500).json({ message: "Banner model is unavailable" });
    }

    const banner = await Banner.create(req.body);
    res.status(201).json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBanner,
  createBanner,
};
