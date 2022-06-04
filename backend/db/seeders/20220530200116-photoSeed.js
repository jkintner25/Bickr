'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Photos', [{
     picSrc: 'https://alanmajchrowicz.com/wp-content/uploads/2019/01/glacier_peak_image_lake_58240.jpg',
     description: 'This is an image of the great outdoors.',
     userId: 1,
     createdAt: new Date(),
     updatedAt: new Date()
   }], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Photos', null, {});
  }
};
