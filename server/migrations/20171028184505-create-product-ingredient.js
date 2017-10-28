module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Product_Ingredients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Ingredient_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Ingredients',
          key: 'id'
        }
      },
      Product_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Product_Ingredients');
  }
};