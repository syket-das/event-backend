const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const {
  allBidsForServiceRequest,
  updateBid,
  createBid,
} = require('./bid.service');

const router = express.Router();

router.post('/create', isAuthenticated, async (req, res, next) => {
  const { serviceRequestId, agencyId, price, message } = req.body;

  try {
    const bid = await createBid({
      serviceRequestId,
      agencyId,
      price,
      message,
    });

    res.status(200).json({ bid });
  } catch (error) {
    next(error);
  }
  get;
});

router.put('/:id/update', isAuthenticated, async (req, res, next) => {
  const { accepted } = req.body;

  try {
    const bid = await updateBid(req.params.id, { accepted });

    res.status(200).json({ bid });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
