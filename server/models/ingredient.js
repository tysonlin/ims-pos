module.exports = (sequelize, DataTypes) => {
  var Ingredient = sequelize.define('Ingredient', {
    name: { type: DataTypes.STRING, allowNull: false },
    unitPrice: { type: DataTypes.FLOAT, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false }
  });

  Ingredient.associate = (models) => {
    Ingredient.hasMany(models.Product_Ingredient, { foreignKey: 'Ingredient_id' });
  }

  return Ingredient;
};