const News = require("../../../models/News");

const getNews = async (req, res) => {
  try {
    const messages = await News.find({});
    if (!messages) return res.status(404).json({ err: "No News created." });
    return res.status(200).json({ messages });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getNews;
