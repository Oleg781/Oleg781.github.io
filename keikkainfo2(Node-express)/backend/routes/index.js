const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const gigRoutes = require('./gigs');

// ✅ määrittele reittien "etuliitteet"
router.use('/auth', authRoutes);
router.use('/gigs', gigRoutes);

module.exports = router;
