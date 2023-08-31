const Notification = require("../../../models/Notifications");

const getNews = async (req, res) => {
  try {
    const messages = await Notification.find({});
    if (!messages) return res.status(404).json({ err: "No Notifications created." });
    return res.status(200).json({ messages });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getNews;
