const bcrypt = require('bcryptjs');
// const config = require('../config');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      username: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true }
    }
  });

  User.addUser = (values) => {
    return new Promise( resolve => {
        const username = values[0];
        const rawPassword = values[1];
        const name = values[2];
        const email = values[3];

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(rawPassword, salt, (err, hash) => {
            if(err) throw err;
            resolve(User.create({
                username: username,
                password: hash,
                name: name,
                email: email
            }));
          })
        });
    });
  };

  User.comparePassword = (candidatePwd, hash) => {
    return new Promise( resolve => {
      bcrypt.compare(candidatePwd, hash, (err, isMatch) => {
        if(err) throw err;
        resolve(isMatch);
      });
    });
  };

  return User;
};