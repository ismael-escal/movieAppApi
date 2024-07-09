// [SECTION] Dependencies and Modules
const express = require('express');
const userController = require('../controllers/user');

// [SECTION] Routing Component
const router = express.Router();



// [SECTION] Routes

// Route for user registration
router.post("/register", userController.registerUser);

// Route for user authentication
router.post('/login', userController.loginUser);



// [SECTION] Export Route System
// allows us to export the "router" object and use it in other files within the project
module.exports = router;