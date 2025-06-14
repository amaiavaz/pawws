const connection = require("../config/db");

class PetsControllers {
  allPets = (req, res) => {
    let sql = "SELECT * FROM pet WHERE pet_is_deleted = 0";
  
    connection.query(sql, (err, result) => {
      if (err){
        throw err;
      }
      else {
        res.render('allPets');
      }
    });
  }

  renderNewPet = (req, res) => {
    const { id } = req.params;
    res.render('newPet', {id});
  }

  newPet = (req, res) => {
    console.log(req.body);
    const { pet_name, pet_description, adoption_year, species } = req.body;
    const { id } = req.params;
    const regex = /^(19[5-9][0-9]|20[0-9]{2}|2100)$/;

    if (!pet_name || !pet_description || !adoption_year || !species){
      res.redirect(`/pets/newPet/${id}`);
    }
    else if (!regex.test(adoption_year)){
      res.redirect(`/pets/newPet/${id}`);
    }
    else {
      let sql = "INSERT INTO pet (pet_name, pet_description, adoption_year, species, owner_id) VALUES (?, ?, ?, ?, ?)";
      let values = [pet_name, pet_description, adoption_year, species, id];
  
      if (req.file){
        const {filename} = req.file;
        sql = "INSERT INTO pet (pet_name, pet_description, adoption_year, species, owner_id, pet_img) VALUES (?, ?, ?, ?, ?, ?)";
        values = [pet_name, pet_description, adoption_year, species, id, filename];
      }
  
      connection.query(sql, values, (err, result) => {
        if (err) {
          throw err;
        }
        else {
          res.redirect(`/owners/oneOwnerLogin/${id}`);
        }
      });
    }
  }

  renderEdit = (req, res) => {
    const { pet_id } = req.params;
    let sql = "SELECT * FROM pet WHERE pet_id=?";

    connection.query(sql, [pet_id], (err, result) => {
      if (err){
        throw err;
      }
      else {
        res.render('editPet', {result: result[0]});
      }
    });
  }

  edit = (req, res) => {
    const { owner_id, pet_id } = req.params;
    //console.log(req.body);
    const { pet_name, pet_description, species, adoption_year} = req.body;
    const regex = /^(19[5-9][0-9]|20[0-9]{2}|2100)$/;

    if (!pet_name || !pet_description || !adoption_year || !species){
      res.redirect(`/pets/edit/${pet_id}`);
    }
    else if (!regex.test(adoption_year)){
      res.redirect(`/pets/edit/${pet_id}`);
    }
    else {
      let sql = "UPDATE pet SET pet_name=?, pet_description=?, species=?, adoption_year=? WHERE pet_id=?";
      let values = [pet_name, pet_description, species, adoption_year, pet_id];

      if(req.file) {
        sql = "UPDATE pet SET pet_name=?, pet_description=?, species=?, adoption_year=?, pet_img=? WHERE pet_id=?";
        values = [pet_name, pet_description, species, adoption_year, req.file.filename, pet_id];
      }

      connection.query(sql, values, (err, result) => {
        if (err){
          throw err;
        }
        else {
          res.redirect(`/owners/oneOwnerLogin/${owner_id}`);
        }
      });
    }
  }

  deleteTotal = (req, res) => {
    const { pet_id, owner_id } = req.params;
    let sql = "DELETE FROM pet WHERE pet_id=?";

    connection.query(sql, [pet_id], (err, result) => {
      if (err){
        throw err;
      }
      else {
        res.redirect(`/owners/oneOwnerLogin/${owner_id}`);
      }
    });
  }
}

module.exports = new PetsControllers();