const express = require('express');
const router = express.Router();
const userPost = require('../controllers/userPostController');


router.get('/user-post/:id', userPost.getPosts);



module.exports = router;