var express = require('express');
var router = express.Router();
const petsControllers = require('../controllers/petsControllers');
const uploadImage = require('../middlewares/uploadImage');

router.get('/allPets', petsControllers.allPets);

router.get('/newPet/:id', petsControllers.renderNewPet);

router.post('/newPet/:id', uploadImage("pets"), petsControllers.newPet);

router.get('/edit/:pet_id', petsControllers.renderEdit);

router.post('/edit/:pet_id/:owner_id', uploadImage("pets"), petsControllers.edit);

router.get('/deleteTotal/:pet_id/:owner_id', petsControllers.deleteTotal);

module.exports = router;