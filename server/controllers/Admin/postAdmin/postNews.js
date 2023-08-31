const News = require("../../../models/News");

const postNews = async (req, res) => {
  try {
    console.log(req.body);
    const { Author, Date, Title, Content, Image } = req.body;
    const migratedImage = `<img src="${Image}" alt="Related picture to the topic">`;

    if (!Author || !Date || !Title || !Image || Content === "<p><br></p>")
      return res.status(400).json({ err: "Please fill the inputs." });

    const message = new News({
      Author,
      Date,
      Title,
      Content,
      Image: migratedImage,
    });
    await message.save();

    return res.status(200).json({ msg: "News was uploaded succesfully." });
  } catch (error) {
    console.log(error);
  }
};

module.exports = postNews;
