import { nanoid } from "nanoid";
import Url from "../models/url.model.js";

export const testing = (req, res) => {
  res.status(200).send({
    success: true,
    message: "Testing route working fine!",
  });
};

export const getAllLinks =  async (req,res) => {
  try {
    const allLinks=await Url.find({});
    res.status(200).send({
      sucess:true,
      message:"links fetched successfully",
      data:allLinks
    })
  } catch (error) {
    console.log("some error occured while fetching all the links")
    res.status(400).send({
      success:false,
      message:"some error occured while fetching all the links"
    })
  }
}

export const getUniqueCode = async (req, res) => {
  try {
    const { redirectUrl } = req.body;

    if (!redirectUrl)
      return res.status(400).send({
        success: false,
        message: "redirectUrl is required",
      });
    const uniqueCode = nanoid(8);
    const result = await Url.create({
      uniqueCode,
      redirectUrl,
    });

    res.status(200).send({
      success: true,
      message: "Short URL created successfully",
      data: {
        uniqueCode,
        shortUrl: `${process.env.BASE_URL}/${uniqueCode}`,
      },
    });
  } catch (error) {
    console.error("error while shorten the url:", error.message);

    res.status(500).send({
      success: false,
      message: "some error occured while shorten the url",
    });
  }
};
export const redirectHandler = async (req, res) => {
  try {
    const { code } = req.params;
    const urlDoc = await Url.findOne({ uniqueCode: code });

    if (!urlDoc) {
      return res.status(404).send("Short URL not found");
    }

    urlDoc.analytics += 1;
    urlDoc.lastClicked = new Date();
    await urlDoc.save();

    return res.redirect(urlDoc.redirectUrl);
  } catch (err) {
    console.log("error occured while redirecting", err);
    res.status(500).send("Internal Server Error");
  }
};



export const getAnalytics = async (req, res) => {
  try {
    const { code } = req.params;
    const doc = await Url.findOne({ uniqueCode: code });

    if (!doc) {
      return res.status(404).send({
        success: false,
        message: "short url not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "analytics fetched successfully",
      analytics: {
        totalClicked: doc.analytics,
        lastClickedTime: doc.lastClicked,
      },
    });
  } catch (error) {
    console.log("error occured while fetching getAnalytics:", error);
    res.status(500).send({
      success: false,
      message: "Error while fetching analytics",
    });
  }
};
