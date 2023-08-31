const Users = require("../../../models/Users");

const getUsers = async (req, res) => {

  try {
    const findEmail = await Users.find({ });

    return res.status(200).json(findEmail);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getUsers;
