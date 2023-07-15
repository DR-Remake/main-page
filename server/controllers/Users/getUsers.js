const Users = require('../../models/Users');

const getUsers = async (req, res) => {
  try {
    const getUsers = await Users.find({});
    return res.status(200).json(getUsers);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getUsers;
