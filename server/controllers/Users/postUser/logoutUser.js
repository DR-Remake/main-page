const logoutUser = async (req, res, next) => {
  try {
    return res.status(200).json({ msg: "Succesfully logout." });
  } catch (error) {
    console.log(error);
  }
};

module.exports = logoutUser;
