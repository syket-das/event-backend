const express = require('express');

const auth = require('./auth/auth.routes');
const users = require('./users/users.routes');
const agency = require('./agency/agency.routes');
const service = require('./service/service.routes');
const review = require('./review/review.routes');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/auth', auth);
router.use('/users', users);
router.use('/agency', agency);
router.use('/service', service);
router.use('/review', review);

module.exports = router;
