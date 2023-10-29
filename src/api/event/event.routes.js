const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const { getAgency } = require('../agency/agency.service');
const { createEvent } = require('./event.service');

const router = express.Router();

router.post('/create', isAuthenticated, async (req, res, next) => {
  const { title, description, startDate, endDate, address, documents } =
    req.body;

  const { id: userId } = req.payload;

  try {
    const agency = await getAgency(userId);

    if (!agency) {
      return res.status(400).json({
        message: 'Agency not found',
      });
    }

    const event = await createEvent(agency.id, {
      title,
      description,
      startDate,
      endDate,
      address,
      documents,
    });

    res.status(201).json({
      event,
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
