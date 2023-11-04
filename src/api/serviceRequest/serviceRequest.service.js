const { db } = require('../../utils/db');

const createServiceRequest = (userId, body) => {
  return db.serviceRequest.create({
    data: {
      userId,
      ...body,
    },
  });
};

const allServiceRequests = () => {
  return db.serviceRequest.findMany();
};

const serviceRequestDetails = (serviceRequestId) => {
  return db.serviceRequest.findUnique({
    where: {
      id: serviceRequestId,
    },
    include: {
      bids: {
        include: {
          agency: true,
        },
      },
      user: true,
    },
  });
};

const updateServiceRequest = (body) => {
  return db.serviceRequest.update({
    where: {
      id: body.id,
    },
    data: {
      requestApproval: body.requestApproval,
    },
  });
};

module.exports = {
  createServiceRequest,
  allServiceRequests,
  serviceRequestDetails,
  updateServiceRequest,
};
