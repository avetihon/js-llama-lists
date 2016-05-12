var fs           = require("fs");

/**
 * load user potential interests
 */
exports.getInterestsList = function(req, res) {
  fs.readFile("config/interests.json", (err, data) => {

    if (err) throw err;
    var parsedData = JSON.parse(data);
    var interests = Object.keys(parsedData).map((k) => parsedData[k] );


    res.json({ interests: interests });
  });
};
