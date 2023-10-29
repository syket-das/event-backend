const { db } = require('../../utils/db');

const createEvent = (agencyId, body) => {
  return db.event.create({
    data: {
      ...body,
      agencyId,
    },
  });
};

module.exports = {
  createEvent,
};
