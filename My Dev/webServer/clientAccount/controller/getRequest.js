const getIndex = (req,res) => {
  res.sendFile(__dirname + "/pages/index.html");
};

module.exports = getIndex;
