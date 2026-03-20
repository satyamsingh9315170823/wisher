import Wish from "../models/Wish.js";

import cloudinary from "../config/cloudinary.js";

import generateShareId from "../utils/generateShareId.js";

export const createWish = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      message: "Please upload media",
    });
  }
  try {
    let images = 0;

    let video = 0;

    let media = [];

    for (const file of req.files) {
      if (file.mimetype.startsWith("image")) images++;

      if (file.mimetype.startsWith("video")) video++;
    }

    if (images > 5)
      return res.json({
        message: "Max 5 images",
      });

    if (video > 1)
      return res.json({
        message: "Max 1 video",
      });

    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {

        cloudinary.uploader.upload_stream(

          { resource_type: "auto" },

          (error, result) => {

            if (error) {

              reject(error);

            } else {

              resolve(result);

            }

          }

        ).end(file.buffer);

      });

      media.push({
        url: result.secure_url,

        type: result.resource_type,
      });
    }
console.log("MEDIA TYPE:",typeof media);
console.log("MEDIA:",media);

    const wish = await Wish.create({
      creator: req.user.id,

      recipientName: req.body.recipientName,

      message: req.body.message,

      senderName: req.body.senderName,

      media,

      shareId: generateShareId(),
    });

    res.json({
      message: "Created",

      link: `/wish/${wish.shareId}`,
    });
  } catch (error) {
    console.log("CREATE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getWish = async (req, res) => {
  const wish = await Wish.findOne({
    shareId: req.params.id,
  });

  res.json(wish);
};

export const myWishes = async (req, res) => {
  const wishes = await Wish.find({
    creator: req.user.id,
  })

    .sort({ createdAt: -1 });

  res.json(wishes);
};

export const deleteWish = async (req, res) => {
  await Wish.deleteOne({
    _id: req.params.id,

    creator: req.user.id,
  });

  res.json({
    message: "Deleted",
  });
};
