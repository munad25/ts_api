'use strict';

const bcrypt = require("bcrypt")

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('users', [{
        email_address: 'mumunad25@gmail.com',
        first_name:"Muhamad",
        last_name: "Nadi",
        birth_date: "1997-04-25",
        password: bcrypt.hashSync('password', 10),
        ic_number: "123456789",
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
