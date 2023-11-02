const bcrypt = require('bcrypt');
const { db } = require('../../utils/db');

function findUserByEmail(email) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

function createUser(user) {
  user.password = bcrypt.hashSync(user.password, 12);
  return db.user.create({
    data: user,
  });
}

function findUserById(id) {
  return db.user.findUnique({
    where: {
      id,
    },
    include: {
      agency: true,
    },
  });
}

const updateUser = (id, body) => {
  return db.user.update({
    where: { id },
    data: {
      ...body,
    },
  });
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  updateUser,
};
