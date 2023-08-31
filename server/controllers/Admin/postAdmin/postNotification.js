const Notifications = require("../../../models/Notifications");

const postNotification = async (req, res) => {
  try {
    console.log(req.body);
    const { Author, Date, Content } = req.body;

    if (!Author || !Date || Content === "<p><br></p>")
      return res.status(400).json({ err: "Please fill the inputs." });

    const message = new Notifications({
      Author,
      Date,
      Content,
    });
    await message.save();

    return res.status(200).json({ msg: "Notification was uploaded succesfully." });
  } catch (error) {
    console.log(error);
  }
};

module.exports = postNotification;
