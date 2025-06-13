const connection = require("../config/db");

class IndexControllers {
  renderHome = (req, res) => {
    let sql = "SELECT * FROM owner WHERE owner_is_deleted = 0";

    connection.query(sql, (err, result) => {
      if (err){
        throw err;
      }
      else {
        res.render('index', {result});
      }
    });
  }

  renderAbout = (req, res) => {
    let sql = "SELECT * FROM owner WHERE owner_is_deleted = 0";

    connection.query(sql, (err, result) => {
      if (err){
        throw err;
      }
      else {
        res.render('about', {result});
      }
    });
  }
}

module.exports = new IndexControllers();