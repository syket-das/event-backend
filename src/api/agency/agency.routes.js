const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const { getAgency } = require('./agency.service');

const router = express.Router();

router.get('/getProfile', isAuthenticated, async (req, res, next) => {
  const { id: userId } = req.payload;

  try {
    const agency = await getAgency(userId);

    if (!agency) {
      return res.status(404).json({ message: 'Agency not found' });
    }

    res.status(200).json({
      agency,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/create', isAuthenticated, async (req, res) => {
  const { id: userId } = req.payload;
});

module.exports = router;
