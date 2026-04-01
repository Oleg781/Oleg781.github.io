const express = require('express');
const router = express.Router();
const { getGigs, addGig } = require('../controllers/gigsController');
const { authenticateToken } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.get('/', getGigs);  
router.post('/', authenticateToken, upload.single('poster'), addGig);  

module.exports = router;
