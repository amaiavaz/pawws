const connection = require("../config/db");
const bcrypt = require('bcrypt');

class OwnersControllers {
  renderSignup = (req, res) => {
    res.render('ownerSignup');
  }

  signup = (req, res) => {
    console.log(req.body);
    const { first_name, last_name, owner_description, phone_number, email, password } = req.body;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{9,}$/;

    if (!first_name || !last_name || !owner_description || !phone_number || !email || !password) {
      res.render("ownerSignup", { message: "Todos los campos deben completarse" });
    }
    else if (!regex.test(password)){
      res.render("ownerSignup", { message: "La contraseña debe incluir una mayúscula, un número y un caracter especial" });
    }
    else {
      let sql = "INSERT INTO owner (first_name, last_name, owner_description, phone_number, email, password) VALUES (?, ?, ?, ?, ?, ?)";

      bcrypt.hash(password.trim(), 10, (errHash, hash) => {
        if (errHash){
          throw errHash;
        }
        else {
          let values = [first_name.trim(), last_name.trim(), owner_description.trim(), phone_number.trim(), email.trim(), hash];

          connection.query(sql, values, (err, result) => {
            if (err){
              if (err.errno == 1062) {
                res.render("ownerSignup", { message: "Email duplicado" });
              }
              else {
                throw err;
              }
            }
            else {
              res.send('registro ok');
            }
          });
        }
      });
    }
  }

  renderLogin = (req, res) => {
    res.render('login');
  }

  login = (req, res) => {
    const { email, password} = req.body;
    const { id } = req.params;

    if (!email || !password){
      res.render('login', {message: "Falta por completar uno de los dos campos."});
    }
    else{
      let sql = 'SELECT * FROM owner WHERE email=? AND owner_is_deleted = 0';

      connection.query(sql, [email], (errQuery, result)=>{
        console.log(result);
        
        if (errQuery){
          throw errQuery;
        }
        else{
          if (result.length == 0){
            res.render('login', {message: "Email no válido"})
          }
          else {
            let hash = result[0].password;

            bcrypt.compare(password, hash, (errCompare, resultCompare)=>{
              if (errCompare){
                throw errCompare;
              }
              else {
                if (resultCompare){
                  //console.log(resultCompare);
                  
                  res.redirect(`/owners/oneOwnerLogin/${result[0].owner_id}`);
                }
                else{
                  res.render("login", {message:"Contraseña incorrecta"});
                }
              }
            });
          }
        }
      });
    }
  }

  oneOwnerLogin = (req, res) => {
    const { id } = req.params;
    let sql = 'SELECT o.owner_id, o.first_name, o.last_name, o.owner_description, o.phone_number, o.email, o.owner_img, p.pet_id, p.pet_name, p.pet_description, p.adoption_year, p.species, p.pet_img FROM owner o LEFT JOIN pet p ON o.owner_id = p.owner_id WHERE o.owner_is_deleted = 0 AND o.owner_id = ?';

    connection.query(sql, [id], (err, result) => {
      if (err){
        throw err;
      }
      else {
        let pets = [];
        let pet = {};

        result.forEach((elem) => {
          if (elem.pet_id) {
            pet = {
              pet_id: elem.pet_id,
              pet_name: elem.pet_name,
              pet_description: elem.pet_description,
              adoption_year: elem.adoption_year,
              species: elem.species,
              pet_img: elem.pet_img
            };
            pets.push(pet);
          }

          let resultFinal = {
            owner_id: result[0].owner_id,
            first_name: result[0].first_name,
            last_name: result[0].last_name,
            owner_description: result[0].owner_description,
            phone_number: result[0].phone_number,
            email: result[0].email,
            owner_img: result[0].owner_img
          };
          console.log(resultFinal);
          
          res.render('ownerProfileLogin', {resultFinal});
        });
      }
    });
  }

  oneOwner = (req, res) => {
    const { id } = req.params;
    let sql = 'SELECT o.owner_id, o.first_name, o.last_name, o.owner_description, o.phone_number, o.email, o.owner_img, p.pet_id, p.pet_name, p.pet_description, p.adoption_year, p.species, p.pet_img FROM owner o LEFT JOIN pet p ON o.owner_id = p.owner_id WHERE o.owner_is_deleted = 0 AND o.owner_id = ?';

    connection.query(sql, [id], (err, result) => {
      if (err){
        throw err;
      }
      else {
        let pets = [];
        let pet = {};

        result.forEach((elem) => {
          if (elem.pet_id) {
            pet = {
              pet_id: elem.pet_id,
              pet_name: elem.pet_name,
              pet_description: elem.pet_description,
              adoption_year: elem.adoption_year,
              species: elem.species,
              pet_img: elem.pet_img
            };
            pets.push(pet);
          }

          let resultFinal = {
            owner_id: result[0].owner_id,
            first_name: result[0].first_name,
            last_name: result[0].last_name,
            owner_description: result[0].owner_description,
            phone_number: result[0].phone_number,
            email: result[0].email,
            owner_img: result[0].owner_img
          };
          console.log(resultFinal);
          
          res.render('ownerProfile', {resultFinal});
        });
      }
    });
  }

  renderEdit = (req, res) => {
    const { id } = req.params;
    let sql = "SELECT * FROM owner WHERE owner_id =? AND owner_is_deleted = 0";

    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      }
      else {
        res.render('editOwner', {result: result[0]});
      }
    });
  }

  edit = (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const { id } = req.params;
    const { first_name, last_name, owner_description, phone_number } = req.body;

    let sql = "UPDATE owner SET first_name=?, last_name=?, owner_description=?, phone_number=? WHERE owner_id =? AND owner_is_deleted = 0";
    let values = [first_name, last_name, owner_description, phone_number, id];

    if (req.file){
      let {filename} = req.file;
      sql = "UPDATE owner SET first_name=?, last_name=?, owner_description=?, phone_number=?, owner_img=? WHERE owner_id =? AND owner_is_deleted = 0";
      values = [first_name, last_name, owner_description, phone_number, filename, id];
    }
    
    connection.query(sql, values, (err, result) => {
      if (err){
        throw err;
      }
      else {
        res.redirect(`/owners/oneOwnerLogin/${id}`);
      }
    });
  }
}

module.exports = new OwnersControllers();