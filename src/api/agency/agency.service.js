const { db } = require('../../utils/db');

const getAgency = (id) => {
  return db.agency.findUnique({
    where: {
      userId: id,
    },
  });
};

module.exports = {
  getAgency,
};
