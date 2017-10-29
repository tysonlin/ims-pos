module.exports = (sequelize, DataTypes) => {
  const Product_Ingredient = sequelize.define('Product_Ingredient', {});

  Product_Ingredient.associate = (models) => {
    Product_Ingredient.belongsTo(models.Product, { foreignKey: 'Product_id' });
    Product_Ingredient.belongsTo(models.Ingredient, { foreignKey: 'Ingredient_id' });
  };

  return Product_Ingredient;
};