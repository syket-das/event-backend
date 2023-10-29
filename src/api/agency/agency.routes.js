const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const { getAgency, createAgency, updateAgency } = require('./agency.service');

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

router.post('/create', isAuthenticated, async (req, res, next) => {
  const { id: userId } = req.payload;

  const { name, description } = req.body;

  try {
    const agency = await getAgency(userId);

    if (agency) {
      return res
        .status(405)
        .json({ message: 'User can not create multiple agencies' });
    }

    const newAgency = await createAgency(userId, { name, description });

    res.status(201).json({
      agency: newAgency,
    });
  } catch (error) {
    next(error);
  }
});

router.put('/update', isAuthenticated, async (req, res, next) => {
  const { id: userId } = req.payload;

  const { name, description, documents } = req.body;

  try {
    const agency = await updateAgency(userId, { name, description, documents });
    res.status(200).json({
      agency,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
