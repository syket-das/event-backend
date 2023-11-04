const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const {
  allServiceRequests,
  createServiceRequest,
  updateServiceRequest,
} = require('./serviceRequest.service');

const router = express.Router();

router.get('/all', isAuthenticated, async (req, res, next) => {
  try {
    const serviceRequests = await allServiceRequests();

    res.status(200).json({ serviceRequests });
  } catch (error) {
    next(error);
  }
});

router.post('/create', isAuthenticated, async (req, res, next) => {
  const { id: userId } = req.payload;

  const {
    categoryId,
    title,
    brief,
    address,
    startDate,
    endDate,
    lowestBudget,
    highestBudget,
    manPowerNeeded,
  } = req.body;

  try {
    const serviceRequest = await createServiceRequest(userId, {
      categoryId,
      title,
      brief,
      address,
      startDate,
      endDate,
      lowestBudget,
      highestBudget,
      manPowerNeeded,
    });

    res.status(200).json({ serviceRequest });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put('/:id/update', async (req, res) => {
  try {
    const { id } = req.params;
    const { requestApproval } = req.body;
    if (!id) {
      return res.status(400).json({ message: 'Id is required' });
    }
    if (!requestApproval) {
      return res.status(400).json({ message: 'RequestApproval is required' });
    }
    const serviceRequest = await updateServiceRequest(req.body);

    res.status(200).json({ serviceRequest });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
