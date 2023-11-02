const express = require('express');
const router = express.Router();
const userPost = require('../controllers/userPostController');


router.get('/:id', userPost.getPosts);

// router.post('/:id', );


module.exports = router;