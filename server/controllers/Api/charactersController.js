require("dotenv").config();

const charactersController = async (req, res) => {
  const { Name, Type, Description, Rarity, Price } = req.body;
  try {
    if (!Name || !Type || !Description || !Rarity || !Price) {
      return res.status(400).json({ err: "Please fill all inputs." });
    }
  } catch (error) {}
};

module.exports = charactersController;
